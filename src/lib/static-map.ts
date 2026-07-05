type MapCenter = { lat: number; lng: number };

export type StaticMapOptions = {
  center: MapCenter;
  zoom: number;
  width: number;
  height: number;
};

const GOOGLE_MAP_STYLES = [
  "feature:poi.business|visibility:off",
  "feature:transit|visibility:off",
];

function buildGoogleStaticMapUrl(
  { center, zoom, width, height }: StaticMapOptions,
  apiKey: string,
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
      url: buildGoogleStaticMapUrl(options, googleKey),
      attribution: "Map data © Google",
    };
  }

  return {
    mode: "google-embed" as const,
    url: buildGoogleMapsEmbedUrl(options.center, options.zoom),
    attribution: "Map data © Google",
  };
}
