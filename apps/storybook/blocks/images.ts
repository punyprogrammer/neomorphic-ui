// Stand-ins for photos, so blocks render without a network.

const svg = (body: string, viewBox: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`
  )}`;

/** A landscape: sky fading into sand, with hills in the foreground. */
export function landscape(sky: string, sand: string, hills: string) {
  return svg(
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky}"/><stop offset="0.65" stop-color="${sand}"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/><circle cx="250" cy="52" r="18" fill="#fff6d8" opacity="0.85"/><path d="M0 150 L70 95 L130 140 L210 70 L320 150 L320 180 L0 180Z" fill="${hills}"/>`,
    "0 0 320 180"
  );
}

/** A head-and-shoulders silhouette on a tinted ground. */
export function portrait(hue: number) {
  return svg(
    `<rect width="80" height="80" fill="hsl(${hue} 45% 72%)"/><circle cx="40" cy="31" r="15" fill="hsl(${hue} 30% 40%)"/><path d="M12 80c4-18 16-26 28-26s24 8 28 26z" fill="hsl(${hue} 30% 40%)"/>`,
    "0 0 80 80"
  );
}

/** Square album art: concentric rings over a two-tone gradient. */
export function albumArt(hue: number) {
  return svg(
    `<defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 70% 62%)"/><stop offset="1" stop-color="hsl(${(hue + 50) % 360} 60% 38%)"/></linearGradient></defs><rect width="200" height="200" fill="url(#a)"/><g fill="none" stroke="#fff" stroke-opacity="0.35"><circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="55"/><circle cx="100" cy="100" r="80"/></g><circle cx="100" cy="100" r="8" fill="#fff" fill-opacity="0.8"/>`,
    "0 0 200 200"
  );
}
