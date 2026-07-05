const TILE_SIZE = 256;

function latLngToWorld(lat: number, lng: number, zoom: number) {
  const scale = TILE_SIZE * 2 ** zoom;
  const x = ((lng + 180) / 360) * scale;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
    scale;
  return { x, y };
}

export function latLngToPercent(
  lat: number,
  lng: number,
  center: { lat: number; lng: number },
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
