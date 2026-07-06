import type { LatLng } from "@/lib/map-projection";
import { serviceCoverageMap } from "@/lib/site";

export const COVERAGE_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  {
    featureType: "administrative.neighborhood",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#f8fafc" }],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [{ visibility: "simplified" }],
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
];

export const ROUTE_UNDERLAY_OPTIONS: google.maps.PolylineOptions = {
  strokeColor: "#ffffff",
  strokeOpacity: 0.95,
  strokeWeight: 10,
  geodesic: true,
  zIndex: 10,
};

export const ROUTE_OVERLAY_OPTIONS: google.maps.PolylineOptions = {
  strokeColor: "#1d4ed8",
  strokeOpacity: 1,
  strokeWeight: 7,
  geodesic: true,
  zIndex: 11,
};

function catmullRomPoint(
  p0: LatLng,
  p1: LatLng,
  p2: LatLng,
  p3: LatLng,
  t: number,
): LatLng {
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    lat:
      0.5 *
      (2 * p1.lat +
        (-p0.lat + p2.lat) * t +
        (2 * p0.lat - 5 * p1.lat + 4 * p2.lat - p3.lat) * t2 +
        (-p0.lat + 3 * p1.lat - 3 * p2.lat + p3.lat) * t3),
    lng:
      0.5 *
      (2 * p1.lng +
        (-p0.lng + p2.lng) * t +
        (2 * p0.lng - 5 * p1.lng + 4 * p2.lng - p3.lng) * t2 +
        (-p0.lng + 3 * p1.lng - 3 * p2.lng + p3.lng) * t3),
  };
}

/** Interpolates a Catmull-Rom spline through the highway waypoints so the
 * polyline reads as a smooth road curve instead of jagged straight segments. */
function smoothPath(points: readonly LatLng[], segmentsPerPoint = 14): LatLng[] {
  if (points.length < 3) return points.map((point) => ({ ...point }));

  const smoothed: LatLng[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    for (let step = 0; step < segmentsPerPoint; step++) {
      smoothed.push(catmullRomPoint(p0, p1, p2, p3, step / segmentsPerPoint));
    }
  }
  smoothed.push({ ...points[points.length - 1] });
  return smoothed;
}

/** Precomputed once at module load — highway geometry never changes at runtime. */
export const SMOOTHED_HIGHWAYS = serviceCoverageMap.highways.map((route) => ({
  id: route.id,
  label: route.label,
  path: smoothPath(route.points),
}));

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

/** Uniform padding for the initial fitBounds pass. Combined with fractional
 * zoom this keeps the highway network at ~70-80% of the visible frame across
 * breakpoints instead of the coarse ~50/90% swings integer zoom produces. */
export const COVERAGE_FIT_PADDING = 44;

/** Max fractional zoom levels the map is allowed to back away from the
 * highway fitBounds result to make room for travel-time callouts. Beyond
 * this the badge clamp logic (never allow clipping) takes over. */
export const MAX_CALLOUT_ZOOM_OUT = 1.4;

/** Fractional zoom step used while searching for a zoom level where every
 * callout fits without clamping. */
export const CALLOUT_ZOOM_STEP = 0.1;
