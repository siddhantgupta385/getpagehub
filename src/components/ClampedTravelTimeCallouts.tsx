"use client";

import { useEffect } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { serviceCoverageMap } from "@/lib/site";
import { HIGHWAY_MIDPOINTS } from "@/lib/coverage-map";
import {
  applyCalloutBadgeStyles,
  applyPrimaryBadgeStyles,
  layoutCallouts,
  nearestPointOnBox,
} from "@/lib/callout-position";

type CalloutLocation = Extract<
  (typeof serviceCoverageMap.locations)[number],
  { kind: "callout" }
>;
type PrimaryLocation = Extract<
  (typeof serviceCoverageMap.locations)[number],
  { kind: "primary" }
>;

const SVG_NS = "http://www.w3.org/2000/svg";
const LEADER_COLOR = "#3c4043";
// Clears the pin glyph rendered by the paired <Marker> above its anchor.
const PRIMARY_LABEL_OFFSET = { x: 0, y: -26 };

function createMultiCalloutOverlay(
  locations: CalloutLocation[],
  primaryLocation: PrimaryLocation | undefined,
): google.maps.OverlayView {
  class MultiCalloutOverlay extends google.maps.OverlayView {
    private divs = new Map<string, HTMLDivElement>();
    private svg: SVGSVGElement | null = null;
    private leaders = new Map<string, SVGLineElement>();
    private dots = new Map<string, SVGCircleElement>();

    onAdd() {
      const pane = this.getPanes()?.overlayLayer;
      if (!pane) return;

      const svg = document.createElementNS(SVG_NS, "svg");
      svg.style.position = "absolute";
      svg.style.left = "0";
      svg.style.top = "0";
      svg.style.overflow = "visible";
      svg.style.pointerEvents = "none";
      pane.appendChild(svg);
      this.svg = svg;

      for (const location of locations) {
        // Leader line: connects the badge back to the exact point on the
        // highlighted route it describes, so the "this label belongs to
        // this highway" relationship holds even if the badge gets nudged.
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("stroke", LEADER_COLOR);
        line.setAttribute("stroke-width", "1.5");
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("opacity", "0.85");
        svg.appendChild(line);
        this.leaders.set(location.id, line);

        const dot = document.createElementNS(SVG_NS, "circle");
        dot.setAttribute("r", "3.5");
        dot.setAttribute("fill", LEADER_COLOR);
        dot.setAttribute("stroke", "#ffffff");
        dot.setAttribute("stroke-width", "1.5");
        svg.appendChild(dot);
        this.dots.set(location.id, dot);

        const div = document.createElement("div");
        div.textContent = location.label;
        applyCalloutBadgeStyles(div);
        pane.appendChild(div);
        this.divs.set(location.id, div);
      }

      if (primaryLocation) {
        const div = document.createElement("div");
        div.textContent = primaryLocation.label;
        applyPrimaryBadgeStyles(div);
        pane.appendChild(div);
        this.divs.set(primaryLocation.id, div);
      }
    }

    draw() {
      const projection = this.getProjection();
      const map = this.getMap();
      if (!projection || !map || !("getDiv" in map) || !this.svg) return;

      const mapDiv = map.getDiv();
      const mapWidth = mapDiv.offsetWidth;
      const mapHeight = mapDiv.offsetHeight;
      if (mapWidth === 0 || mapHeight === 0) return;

      this.svg.setAttribute("width", `${mapWidth}`);
      this.svg.setAttribute("height", `${mapHeight}`);

      const items: {
        id: string;
        anchorX: number;
        anchorY: number;
        width: number;
        height: number;
        offset: { x: number; y: number };
        fixed?: boolean;
      }[] = [];

      const allLocations: {
        id: string;
        lat: number;
        lng: number;
        offset: { x: number; y: number };
        fixed?: boolean;
      }[] = [
        // Every tooltip's anchor is a real LatLng on its highway's polyline
        // (the midpoint of the smoothed route) — never a hand-picked or
        // screen-relative coordinate.
        ...locations.map((location) => {
          const anchor = HIGHWAY_MIDPOINTS[location.routeId];
          return {
            id: location.id,
            lat: anchor.lat,
            lng: anchor.lng,
            offset: location.calloutOffset,
          };
        }),
        ...(primaryLocation
          ? [
              {
                id: primaryLocation.id,
                lat: primaryLocation.lat,
                lng: primaryLocation.lng,
                offset: PRIMARY_LABEL_OFFSET,
                fixed: true,
              },
            ]
          : []),
      ];

      for (const location of allLocations) {
        const div = this.divs.get(location.id);
        if (!div) continue;

        const pixel = projection.fromLatLngToDivPixel(
          new google.maps.LatLng(location.lat, location.lng),
        );
        if (!pixel) continue;

        const width = div.offsetWidth || div.scrollWidth;
        const height = div.offsetHeight || div.scrollHeight;
        if (width === 0 || height === 0) {
          requestAnimationFrame(() => this.draw());
          return;
        }

        items.push({
          id: location.id,
          anchorX: pixel.x,
          anchorY: pixel.y,
          width,
          height,
          offset: location.offset,
          fixed: location.fixed,
        });
      }

      if (items.length !== allLocations.length) return;

      const positioned = layoutCallouts(items, mapWidth, mapHeight);
      for (const box of positioned) {
        const div = this.divs.get(box.id);
        if (div) {
          div.style.left = `${box.left}px`;
          div.style.top = `${box.top}px`;
        }

        // Leader lines only apply to the three highway callouts.
        if (!this.leaders.has(box.id)) continue;

        const leaderEnd = nearestPointOnBox(box.anchorX, box.anchorY, box);

        const line = this.leaders.get(box.id);
        if (line) {
          line.setAttribute("x1", `${box.anchorX}`);
          line.setAttribute("y1", `${box.anchorY}`);
          line.setAttribute("x2", `${leaderEnd.x}`);
          line.setAttribute("y2", `${leaderEnd.y}`);
        }

        const dot = this.dots.get(box.id);
        if (dot) {
          dot.setAttribute("cx", `${box.anchorX}`);
          dot.setAttribute("cy", `${box.anchorY}`);
        }
      }
    }

    onRemove() {
      this.divs.forEach((div) => div.remove());
      this.divs.clear();
      this.svg?.remove();
      this.svg = null;
      this.leaders.clear();
      this.dots.clear();
    }
  }

  return new MultiCalloutOverlay();
}

export function ClampedTravelTimeCallouts({
  locations,
  primaryLocation,
}: {
  locations: CalloutLocation[];
  primaryLocation?: PrimaryLocation;
}) {
  const map = useGoogleMap();

  useEffect(() => {
    if (!map) return;

    const overlay = createMultiCalloutOverlay(locations, primaryLocation);
    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, locations, primaryLocation]);

  return null;
}
