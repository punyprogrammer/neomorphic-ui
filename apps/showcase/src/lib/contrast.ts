// WCAG 2.2 contrast between two OKLCH colours, via OKLab and linear sRGB.

export interface Oklch {
  c: number;
  h: number;
  l: number;
}

function luminance({ l, c, h }: Oklch) {
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);

  const lp = (l + 0.396_337_777_4 * a + 0.215_803_757_3 * b) ** 3;
  const mp = (l - 0.105_561_345_8 * a - 0.063_854_172_8 * b) ** 3;
  const sp = (l - 0.089_484_177_5 * a - 1.291_485_548 * b) ** 3;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const r = clamp(
    4.076_741_662_1 * lp - 3.307_711_591_3 * mp + 0.230_969_929_2 * sp
  );
  const g = clamp(
    -1.268_438_004_6 * lp + 2.609_757_401_1 * mp - 0.341_319_396_5 * sp
  );
  const bl = clamp(
    -0.004_196_086_3 * lp - 0.703_418_614_7 * mp + 1.707_614_701 * sp
  );

  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

export function contrast(a: Oklch, b: Oklch) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
}

export const oklch = ({ l, c, h }: Oklch, alpha?: number) =>
  `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(0)}${alpha === undefined ? "" : ` / ${alpha.toFixed(2)}`})`;
