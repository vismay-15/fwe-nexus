import React from "react";

// The five nexus sectors, in the fixed order used by every glyph.
export const SECTORS = [
  { key: "water", label: "Water", color: "#1f6fb2" },
  { key: "energy", label: "Energy", color: "#d9930f" },
  { key: "food", label: "Food", color: "#4e8a3a" },
  { key: "ecosystems", label: "Ecosystems", color: "#138a7e" },
  { key: "climate", label: "Climate", color: "#7a5ba6" },
];

export const TYPE_CODES = {
  University: "U",
  "Research institute": "R",
  "International organisation": "I",
  "Government agency": "G",
  "Think tank / NGO": "N",
  "Technology centre": "T",
  "Company / utility": "C",
};

const OFF = "#e4e1da";
const INK = "#1c2432";

function arc(cx, cy, r, a0, a1) {
  const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
  const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${p0[0].toFixed(2)} ${p0[1].toFixed(2)} A${r} ${r} 0 ${large} 1 ${p1[0].toFixed(2)} ${p1[1].toFixed(2)}`;
}

/**
 * Returns the SVG markup for a stakeholder glyph: a ring split into
 * the five sectors (coloured when the organisation works on that
 * sector) around an ink core carrying the organisation-type letter.
 */
export function glyphSVG({ sectors = [], type, size = 36, state = "idle" }) {
  const c = size / 2;
  const ringR = size * 0.38;
  const ringW = size * 0.15;
  const gap = 0.16;
  const step = (Math.PI * 2) / SECTORS.length;
  const start = -Math.PI / 2;
  const segs = SECTORS.map((s, i) => {
    const a0 = start + i * step + gap / 2;
    const a1 = start + (i + 1) * step - gap / 2;
    const on = sectors.includes(s.key);
    return `<path d="${arc(c, c, ringR, a0, a1)}" stroke="${on ? s.color : OFF}" stroke-width="${ringW}" fill="none" stroke-linecap="butt"/>`;
  }).join("");
  const coreR = size * 0.22;
  const letter = TYPE_CODES[type] || "•";
  const halo =
    state === "selected"
      ? `<circle cx="${c}" cy="${c}" r="${c - 1}" fill="#fff" stroke="${INK}" stroke-width="2"/>`
      : state === "hover"
      ? `<circle cx="${c}" cy="${c}" r="${c - 1}" fill="#fff" stroke="${INK}" stroke-width="1" stroke-dasharray="2 2"/>`
      : `<circle cx="${c}" cy="${c}" r="${c - 1}" fill="#fff" fill-opacity="0.92"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">${halo}${segs}<circle cx="${c}" cy="${c}" r="${coreR}" fill="${INK}"/><text x="${c}" y="${c}" dy="0.36em" text-anchor="middle" font-family="DM Sans, sans-serif" font-weight="700" font-size="${(size * 0.24).toFixed(1)}" fill="#fff">${letter}</text></svg>`;
}

export const NexusGlyph = ({ sectors, type, size = 36, state, title }) => (
  <span
    className="nexus-glyph"
    role={title ? "img" : undefined}
    aria-label={title}
    style={{ display: "inline-block", width: size, height: size, lineHeight: 0 }}
    dangerouslySetInnerHTML={{ __html: glyphSVG({ sectors, type, size, state }) }}
  />
);
