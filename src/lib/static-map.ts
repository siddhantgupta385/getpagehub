type MapCenter = { lat: number; lng: number };
type LatLng = MapCenter;

export type StaticMapOptions = {
  center: MapCenter;
  zoom: number;
  width: number;
  height: number;
  paths?: LatLng[][];
};

const GOOGLE_MAP_STYLES = [
  "feature:poi|visibility:off",
  "feature:transit|visibility:off",
  "feature:road.local|element:geometry|color:0xf8fafc",
  "feature:road.arterial|element:geometry|color:0xffffff",
  "feature:road.highway|element:geometry.fill|color:0xfde68a",
  "feature:road.highway|element:geometry.stroke|color:0xf59e0b|weight:1.5",
  "feature:road.highway|element:labels.text.fill|color:0x1e3a8a",
  "feature:road.highway|element:labels.text.stroke|color:0xffffff|weight:3",
  "feature:road.highway|element:labels.icon|visibility:on",
  "feature:administrative.locality|element:labels|visibility:simplified",
];

function buildGoogleStaticMapUrl(
  { center, zoom, width, height }: StaticMapOptions,
  apiKey: string,
  paths?: LatLng[][],
) {
  const params = new URLSearchParams({
    center: `${center.lat},${center.lng}`,
    zoom: String(zoom),
    size: `${width}x${height}`,
    scale: "2",
    maptype: "roadmap",
    key: apiKey,
  });

  let url = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;
  for (const style of GOOGLE_MAP_STYLES) {
    url += `&style=${encodeURIComponent(style)}`;
  }
  if (paths) {
    for (const path of paths) {
      const coords = path.map((p) => `${p.lat},${p.lng}`).join("|");
      url += `&path=color:0x2563eb|weight:5|${coords}`;
    }
  }
  return url;
}

/** Real Google Maps embed — no API key required. Shows labeled roads and interstates. */
export function buildGoogleMapsEmbedUrl(
  center: MapCenter,
  zoom: number,
) {
  const query = `${center.lat},${center.lng}`;
  const params = new URLSearchParams({
    q: query,
    z: String(zoom),
    hl: "en",
    output: "embed",
  });
  return `https://maps.google.com/maps?${params.toString()}`;
}

export function getServiceMapSource(options: StaticMapOptions) {
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (googleKey) {
    return {
      mode: "static-image" as const,
      url: buildGoogleStaticMapUrl(options, googleKey, options.paths),
      attribution: "Map data © Google",
    };
  }

  return {
    mode: "google-embed" as const,
    url: buildGoogleMapsEmbedUrl(options.center, options.zoom),
    attribution: "Map data © Google",
  };
}
