import { ScrollTheme } from "./ScrollTheme";

type Stop = { h: number; s: number; l: number };

const PALETTES: Record<string, { palette: Stop[]; accent?: string }> = {
  landing: {
    // cream → darker cream → deep warm red (laptop focus) → warm cream → cream
    // No peach in-between: stays in the cream / red family only.
    palette: [
      { h: 36, s: 50, l: 88 },
      { h: 32, s: 48, l: 78 },
      { h: 14, s: 45, l: 42 },
      { h: 30, s: 50, l: 76 },
      { h: 36, s: 50, l: 86 },
    ],
    accent: "#6B1E1E", // deep maroon glow to emphasise laptop area
  },
  services: {
    // cream → maroon-tinged → warm gold
    palette: [
      { h: 34, s: 50, l: 84 },
      { h: 8, s: 45, l: 72 },
      { h: 38, s: 65, l: 70 },
    ],
    accent: "#7A2E2E",
  },
  reviews: {
    palette: [
      { h: 34, s: 50, l: 86 },
      { h: 14, s: 55, l: 78 },
      { h: 30, s: 60, l: 74 },
    ],
    accent: "#C97A5A",
  },
  about: {
    palette: [
      { h: 36, s: 45, l: 86 },
      { h: 26, s: 40, l: 76 },
      { h: 20, s: 45, l: 68 },
    ],
    accent: "#8B5A3A",
  },
  contact: {
    palette: [
      { h: 32, s: 55, l: 82 },
      { h: 22, s: 55, l: 70 },
      { h: 18, s: 60, l: 60 },
    ],
    accent: "#5C2A1E",
  },
  journal: {
    palette: [
      { h: 38, s: 45, l: 88 },
      { h: 32, s: 50, l: 82 },
      { h: 26, s: 50, l: 76 },
    ],
    accent: "#8B3A3A",
  },
};

export function PageBackdrop({ variant }: { variant: keyof typeof PALETTES }) {
  const cfg = PALETTES[variant] ?? PALETTES.landing;
  return <ScrollTheme palette={cfg.palette} accent={cfg.accent} />;
}
