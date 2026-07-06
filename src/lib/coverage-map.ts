import type { LatLng } from "@/lib/map-projection";
import { serviceCoverageMap } from "@/lib/site";

export const COVERAGE_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#f8fafc" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#fde68a" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#f59e0b" }, { weight: 1 }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1e3a8a" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [{ visibility: "simplified" }],
  },
];

export const ROUTE_UNDERLAY_OPTIONS: google.maps.PolylineOptions = {
  strokeColor: "#ffffff",
  strokeOpacity: 0.95,
  strokeWeight: 9,
  geodesic: true,
  zIndex: 10,
};

export const ROUTE_OVERLAY_OPTIONS: google.maps.PolylineOptions = {
  strokeColor: "#2563eb",
  strokeOpacity: 1,
  strokeWeight: 6,
  geodesic: true,
  zIndex: 11,
};

/** Points used for tight bounds fitting — highways and Murfreesboro only. */
export function getCoverageBoundsPoints(): LatLng[] {
  return [
    serviceCoverageMap.center,
    ...serviceCoverageMap.highways.flatMap((route) =>
      route.points.map((point) => ({ lat: point.lat, lng: point.lng })),
    ),
  ];
}

export function clampCoverageZoom(zoom: number): number {
  const { minZoom, maxZoom, zoomBump } = serviceCoverageMap;
  return Math.min(maxZoom, Math.max(minZoom, zoom + zoomBump));
}
