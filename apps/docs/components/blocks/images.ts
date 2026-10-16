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

/** Soft sky with clouds — for the mindfulness player art frame. */
export function skyScene() {
  return svg(
    `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ec5ea"/><stop offset="0.55" stop-color="#c5daf0"/><stop offset="1" stop-color="#e8eef5"/></linearGradient></defs><rect width="240" height="240" fill="url(#sky)"/><ellipse cx="70" cy="90" rx="48" ry="22" fill="#fff" opacity="0.9"/><ellipse cx="100" cy="90" rx="36" ry="18" fill="#fff" opacity="0.85"/><ellipse cx="160" cy="130" rx="56" ry="24" fill="#fff" opacity="0.88"/><ellipse cx="195" cy="128" rx="32" ry="16" fill="#fff" opacity="0.8"/><ellipse cx="50" cy="170" rx="40" ry="16" fill="#fff" opacity="0.7"/>`,
    "0 0 240 240"
  );
}

/** Square scenic thumb for recommended / course cards. */
export function scenicThumb(hue: number) {
  return svg(
    `<defs><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${hue} 55% 68%)"/><stop offset="1" stop-color="hsl(${(hue + 30) % 360} 40% 42%)"/></linearGradient></defs><rect width="120" height="120" fill="url(#t)"/><ellipse cx="40" cy="38" rx="28" ry="12" fill="#fff" opacity="0.55"/><ellipse cx="58" cy="38" rx="18" ry="9" fill="#fff" opacity="0.45"/><path d="M0 88 Q30 70 60 88 T120 78 L120 120 L0 120Z" fill="hsl(${(hue + 80) % 360} 35% 32%)" opacity="0.55"/>`,
    "0 0 120 120"
  );
}

/** Stylised glass of juice for the meeting status well. */
export function juiceGlass() {
  return svg(
    `<defs><linearGradient id="j" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd08a"/><stop offset="1" stop-color="#f08a3a"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="0.4" stop-color="#fff" stop-opacity="0.08"/><stop offset="1" stop-color="#fff" stop-opacity="0.2"/></linearGradient></defs><ellipse cx="60" cy="108" rx="36" ry="8" fill="#c8d0dc" opacity="0.55"/><path d="M32 28 L38 100 Q60 112 82 100 L88 28 Z" fill="url(#j)"/><path d="M36 32 L40 96 Q60 106 80 96 L84 32 Z" fill="url(#g)"/><rect x="70" y="8" width="6" height="52" rx="3" fill="#f4f6f9" stroke="#d0d6e0" stroke-width="1"/><ellipse cx="73" cy="8" rx="5" ry="3" fill="#fff"/>`,
    "0 0 120 120"
  );
}
