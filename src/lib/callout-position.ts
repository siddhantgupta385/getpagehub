export const CALLOUT_EDGE_PADDING = 20;

const ANCHOR_GAP = 10;

export function clampCalloutPosition(
  anchorX: number,
  anchorY: number,
  labelWidth: number,
  labelHeight: number,
  mapWidth: number,
  mapHeight: number,
  preferredOffset: { x: number; y: number },
) {
  let left = anchorX - labelWidth / 2 + preferredOffset.x;
  let top = anchorY - labelHeight - ANCHOR_GAP + preferredOffset.y;

  left = Math.max(
    CALLOUT_EDGE_PADDING,
    Math.min(left, mapWidth - labelWidth - CALLOUT_EDGE_PADDING),
  );
  top = Math.max(
    CALLOUT_EDGE_PADDING,
    Math.min(top, mapHeight - labelHeight - CALLOUT_EDGE_PADDING),
  );

  return { left, top };
}

type CalloutLayoutInput = {
  anchorX: number;
  anchorY: number;
  width: number;
  height: number;
  offset: { x: number; y: number };
  /** Fixed boxes (e.g. the Murfreesboro label) never move to resolve a
   * collision — the other, movable box is pushed fully clear of it instead. */
  fixed?: boolean;
};

type CalloutBox = { left: number; top: number; width: number; height: number };

function boxesOverlap(a: CalloutBox, b: CalloutBox) {
  return (
    a.left < b.left + b.width &&
    b.left < a.left + a.width &&
    a.top < b.top + b.height &&
    b.top < a.top + a.height
  );
}

function clampBox(box: CalloutBox, mapWidth: number, mapHeight: number) {
  box.left = Math.max(
    CALLOUT_EDGE_PADDING,
    Math.min(box.left, mapWidth - box.width - CALLOUT_EDGE_PADDING),
  );
  box.top = Math.max(
    CALLOUT_EDGE_PADDING,
    Math.min(box.top, mapHeight - box.height - CALLOUT_EDGE_PADDING),
  );
}

function overlapArea(a: CalloutBox, b: CalloutBox) {
  const overlapX = Math.max(
    0,
    Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left),
  );
  const overlapY = Math.max(
    0,
    Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top),
  );
  return overlapX * overlapY;
}

/** Sum of a candidate pair's overlap against every *other* box in the
 * layout, plus their overlap with each other — lets the resolver avoid
 * "fixing" one collision by creating a worse one elsewhere. */
function totalOverlapForCandidate(
  boxes: CalloutBox[],
  indexA: number,
  indexB: number,
  candidateA: CalloutBox,
  candidateB: CalloutBox,
) {
  let sum = overlapArea(candidateA, candidateB);
  for (let k = 0; k < boxes.length; k++) {
    if (k === indexA || k === indexB) continue;
    sum += overlapArea(candidateA, boxes[k]);
    sum += overlapArea(candidateB, boxes[k]);
  }
  return sum;
}

/**
 * Positions every callout badge relative to its highway anchor, clamped
 * inside the map, then iteratively separates any pair that still overlaps
 * (pushing each apart and re-clamping) so labels never collide even when a
 * small viewport forces several anchors into the same corner.
 */
export function layoutCallouts<T extends CalloutLayoutInput>(
  items: T[],
  mapWidth: number,
  mapHeight: number,
): (T & { left: number; top: number })[] {
  const boxes = items.map((item) => {
    const { left, top } = clampCalloutPosition(
      item.anchorX,
      item.anchorY,
      item.width,
      item.height,
      mapWidth,
      mapHeight,
      item.offset,
    );
    return { ...item, left, top };
  });

  const MAX_SEPARATION_PASSES = 24;
  for (let pass = 0; pass < MAX_SEPARATION_PASSES; pass++) {
    let moved = false;

    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        if (!boxesOverlap(a, b)) continue;

        // A fixed box (e.g. the always-central Murfreesboro label) never
        // moves; the movable sibling absorbs the entire separation instead
        // of the usual 50/50 split.
        const aFixed = a.fixed === true;
        const bFixed = b.fixed === true;
        if (aFixed && bFixed) continue;
        const aShare = aFixed ? 0 : bFixed ? 1 : 0.5;
        const bShare = bFixed ? 0 : aFixed ? 1 : 0.5;

        const overlapX =
          Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
        const overlapY =
          Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
        const amountX = overlapX + 2;
        const amountY = overlapY + 2;

        // A map edge can cancel out a shift in the "obvious" direction (the
        // side the box already leans toward). Try all four push directions
        // and keep whichever actually clears the most overlap, instead of
        // getting permanently stuck against a boundary.
        type Candidate = { aLeft: number; aTop: number; bLeft: number; bTop: number };
        const candidates: Candidate[] = [
          { aLeft: a.left - amountX * aShare, aTop: a.top, bLeft: b.left + amountX * bShare, bTop: b.top },
          { aLeft: a.left + amountX * aShare, aTop: a.top, bLeft: b.left - amountX * bShare, bTop: b.top },
          { aLeft: a.left, aTop: a.top - amountY * aShare, bLeft: b.left, bTop: b.top + amountY * bShare },
          { aLeft: a.left, aTop: a.top + amountY * aShare, bLeft: b.left, bTop: b.top - amountY * bShare },
        ];

        let best: (Candidate & { totalOverlap: number; moveDist: number }) | null = null;
        for (const candidate of candidates) {
          const clampedA = { left: candidate.aLeft, top: candidate.aTop, width: a.width, height: a.height };
          const clampedB = { left: candidate.bLeft, top: candidate.bTop, width: b.width, height: b.height };
          if (!aFixed) clampBox(clampedA, mapWidth, mapHeight);
          if (!bFixed) clampBox(clampedB, mapWidth, mapHeight);

          const totalOverlap = totalOverlapForCandidate(boxes, i, j, clampedA, clampedB);
          const moveDist =
            Math.abs(clampedA.left - a.left) +
            Math.abs(clampedA.top - a.top) +
            Math.abs(clampedB.left - b.left) +
            Math.abs(clampedB.top - b.top);

          if (
            !best ||
            totalOverlap < best.totalOverlap - 0.01 ||
            (Math.abs(totalOverlap - best.totalOverlap) <= 0.01 && moveDist < best.moveDist)
          ) {
            best = {
              aLeft: clampedA.left,
              aTop: clampedA.top,
              bLeft: clampedB.left,
              bTop: clampedB.top,
              totalOverlap,
              moveDist,
            };
          }
        }

        if (best && best.moveDist > 0.01) {
          a.left = best.aLeft;
          a.top = best.aTop;
          b.left = best.bLeft;
          b.top = best.bTop;
          moved = true;
        }
      }
    }

    if (!moved) break;
  }

  return boxes;
}

/** Closest point on a box's perimeter to an external point — used to anchor
 * the leader line at the badge edge nearest its highway anchor. */
export function nearestPointOnBox(
  x: number,
  y: number,
  box: { left: number; top: number; width: number; height: number },
) {
  return {
    x: Math.max(box.left, Math.min(x, box.left + box.width)),
    y: Math.max(box.top, Math.min(y, box.top + box.height)),
  };
}

export function applyCalloutBadgeStyles(element: HTMLDivElement) {
  element.style.pointerEvents = "none";
  element.style.whiteSpace = "nowrap";
  element.style.borderRadius = "11px";
  element.style.background = "#ffffff";
  element.style.padding = "4px 12px";
  element.style.fontSize = "13px";
  element.style.fontWeight = "500";
  element.style.lineHeight = "1.35";
  element.style.color = "#3c4043";
  element.style.fontFamily = "var(--font-geist-sans), Roboto, Arial, sans-serif";
  element.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.14)";
  element.style.position = "absolute";
}

/** Slightly bolder variant for the central Murfreesboro hub label, so it
 * reads as distinct from the three highway travel-time badges. */
export function applyPrimaryBadgeStyles(element: HTMLDivElement) {
  applyCalloutBadgeStyles(element);
  element.style.borderRadius = "10px";
  element.style.padding = "4px 10px";
  element.style.fontSize = "11px";
  element.style.fontWeight = "600";
  element.style.color = "#1f2937";
}
