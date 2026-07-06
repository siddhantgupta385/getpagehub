export const CALLOUT_EDGE_PADDING = 20;

const ANCHOR_GAP = 10;

/** Conservative estimate before DOM measurement is available. */
export const ESTIMATED_CALLOUT_SIZE = { width: 148, height: 28 } as const;

function getPreferredCalloutBox(
  anchorX: number,
  anchorY: number,
  labelWidth: number,
  labelHeight: number,
  preferredOffset: { x: number; y: number },
) {
  const left = anchorX - labelWidth / 2 + preferredOffset.x;
  const top = anchorY - labelHeight - ANCHOR_GAP + preferredOffset.y;

  return {
    left,
    top,
    right: left + labelWidth,
    bottom: top + labelHeight,
  };
}

export function calloutFitsInMap(
  anchorX: number,
  anchorY: number,
  labelWidth: number,
  labelHeight: number,
  mapWidth: number,
  mapHeight: number,
  preferredOffset: { x: number; y: number },
) {
  const box = getPreferredCalloutBox(
    anchorX,
    anchorY,
    labelWidth,
    labelHeight,
    preferredOffset,
  );

  return (
    box.left >= CALLOUT_EDGE_PADDING &&
    box.top >= CALLOUT_EDGE_PADDING &&
    box.right <= mapWidth - CALLOUT_EDGE_PADDING &&
    box.bottom <= mapHeight - CALLOUT_EDGE_PADDING
  );
}

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

  const MAX_SEPARATION_PASSES = 8;
  for (let pass = 0; pass < MAX_SEPARATION_PASSES; pass++) {
    let moved = false;

    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        if (!boxesOverlap(a, b)) continue;

        moved = true;
        const overlapX =
          Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
        const overlapY =
          Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);

        if (overlapX < overlapY) {
          const shift = overlapX / 2 + 1;
          if (a.left <= b.left) {
            a.left -= shift;
            b.left += shift;
          } else {
            a.left += shift;
            b.left -= shift;
          }
        } else {
          const shift = overlapY / 2 + 1;
          if (a.top <= b.top) {
            a.top -= shift;
            b.top += shift;
          } else {
            a.top += shift;
            b.top -= shift;
          }
        }

        clampBox(a, mapWidth, mapHeight);
        clampBox(b, mapWidth, mapHeight);
      }
    }

    if (!moved) break;
  }

  return boxes;
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
