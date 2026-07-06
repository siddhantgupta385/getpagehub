"use client";

import { useEffect } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { serviceCoverageMap } from "@/lib/site";
import { applyCalloutBadgeStyles, layoutCallouts } from "@/lib/callout-position";

type CalloutLocation = Extract<
  (typeof serviceCoverageMap.locations)[number],
  { kind: "callout" }
>;

function createMultiCalloutOverlay(
  locations: CalloutLocation[],
): google.maps.OverlayView {
  class MultiCalloutOverlay extends google.maps.OverlayView {
    private divs = new Map<string, HTMLDivElement>();

    onAdd() {
      const pane = this.getPanes()?.overlayLayer;
      if (!pane) return;

      for (const location of locations) {
        const div = document.createElement("div");
        div.textContent = location.label;
        applyCalloutBadgeStyles(div);
        pane.appendChild(div);
        this.divs.set(location.id, div);
      }
    }

    draw() {
      const projection = this.getProjection();
      const map = this.getMap();
      if (!projection || !map || !("getDiv" in map)) return;

      const mapDiv = map.getDiv();
      const mapWidth = mapDiv.offsetWidth;
      const mapHeight = mapDiv.offsetHeight;
      if (mapWidth === 0 || mapHeight === 0) return;

      const items: {
        id: string;
        anchorX: number;
        anchorY: number;
        width: number;
        height: number;
        offset: { x: number; y: number };
      }[] = [];
      for (const location of locations) {
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
          offset: location.calloutOffset,
        });
      }

      if (items.length !== locations.length) return;

      const positioned = layoutCallouts(items, mapWidth, mapHeight);
      for (const box of positioned) {
        const div = this.divs.get(box.id);
        if (!div) continue;
        div.style.left = `${box.left}px`;
        div.style.top = `${box.top}px`;
      }
    }

    onRemove() {
      this.divs.forEach((div) => div.remove());
      this.divs.clear();
    }
  }

  return new MultiCalloutOverlay();
}

export function ClampedTravelTimeCallouts({
  locations,
}: {
  locations: CalloutLocation[];
}) {
  const map = useGoogleMap();

  useEffect(() => {
    if (!map) return;

    const overlay = createMultiCalloutOverlay(locations);
    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, locations]);

  return null;
}
