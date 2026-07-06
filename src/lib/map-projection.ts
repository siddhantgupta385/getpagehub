const TILE_SIZE = 256;

export type LatLng = { lat: number; lng: number };

function latLngToWorld(lat: number, lng: number, zoom: number) {
  const scale = TILE_SIZE * 2 ** zoom;
  const x = ((lng + 180) / 360) * scale;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
    scale;
  return { x, y };
}

function latRad(lat: number) {
  const sin = Math.sin((lat * Math.PI) / 180);
  return Math.log((1 + sin) / (1 - sin)) / 2;
}

export function latLngToPercent(
  lat: number,
  lng: number,
  center: LatLng,
  zoom: number,
  width: number,
  height: number,
) {
  const centerWorld = latLngToWorld(center.lat, center.lng, zoom);
  const pointWorld = latLngToWorld(lat, lng, zoom);
  const x = width / 2 + (pointWorld.x - centerWorld.x);
  const y = height / 2 + (pointWorld.y - centerWorld.y);

  return {
    left: (x / width) * 100,
    top: (y / height) * 100,
  };
}

/** Fit viewport around a fixed center so all points fill ~85% of the map card. */
export function fitViewportAroundCenter(
  center: LatLng,
  points: LatLng[],
  width: number,
  height: number,
  options: {
    paddingFactor?: number;
    minZoom?: number;
    maxZoom?: number;
  } = {},
): { center: LatLng; zoom: number } {
  const paddingFactor = options.paddingFactor ?? 1.1;
  const minZoom = options.minZoom ?? 10;
  const maxZoom = options.maxZoom ?? 12;

  let maxLatDelta = 0;
  let maxLngDelta = 0;

  for (const point of points) {
    maxLatDelta = Math.max(maxLatDelta, Math.abs(point.lat - center.lat));
    maxLngDelta = Math.max(maxLngDelta, Math.abs(point.lng - center.lng));
  }

  const latSpan =
    Math.max(maxLatDelta * 2 * paddingFactor, 0.04);
  const lngSpan =
    Math.max(maxLngDelta * 2 * paddingFactor, 0.06);

  const latFraction =
    (latRad(center.lat + latSpan / 2) - latRad(center.lat - latSpan / 2)) /
    Math.PI;
  const lngFraction =
    lngSpan / (360 * Math.cos((center.lat * Math.PI) / 180));

  const zoomLat = Math.log2(height / TILE_SIZE / latFraction);
  const zoomLng = Math.log2(width / TILE_SIZE / lngFraction);
  const zoom = Math.min(
    maxZoom,
    Math.max(minZoom, Math.floor(Math.min(zoomLat, zoomLng))),
  );

  return { center, zoom };
}
