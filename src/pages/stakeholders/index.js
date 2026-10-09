import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { stakeholders, projects } from "../../data/stakeholders";
import { hotspots } from "../../data/challenges";
import { useSearchParams } from "react-router-dom";
import { SECTORS, TYPE_CODES, glyphSVG, NexusGlyph } from "../../components/NexusGlyph";
import { EuropeBase } from "./EuropeBase";
import "./style.css";

const ROLES = [
  "Evidence & monitoring",
  "Modelling & decision support",
  "Innovation & technology",
  "Policy advice",
  "Participation & capacity building",
  "Implementation & operation",
];

const THEME_COLOR = {
  water: "#1f6fb2",
  energy: "#d9930f",
  food: "#4e8a3a",
  ecosystems: "#138a7e",
  climate: "#7a5ba6",
  governance: "#1c2432",
};

const TYPE_SHORT = {
  University: "university",
  "Research institute": "research institute",
  "International organisation": "international body",
  "Government agency": "government agency",
  "Think tank / NGO": "think tank or NGO",
  "Technology centre": "technology centre",
  "Company / utility": "company or utility",
};

const byId = Object.fromEntries(stakeholders.map((s) => [s.id, s]));
const sectorLabel = Object.fromEntries(SECTORS.map((s) => [s.key, s.label]));

function projectsFor(id) {
  return projects.filter((p) => p.members.includes(id));
}

function partnersFor(id) {
  const out = new Map();
  projectsFor(id).forEach((p) =>
    p.members.forEach((m) => {
      if (m === id) return;
      if (!out.has(m)) out.set(m, []);
      out.get(m).push(p.name);
    })
  );
  return [...out.entries()].map(([m, ps]) => ({ s: byId[m], projects: ps }));
}

// Curved arc between two points (quadratic Bézier in lat/lng space).
function arcPoints(a, b, bend = 0.18, n = 28) {
  const [la1, lo1] = a;
  const [la2, lo2] = b;
  const mx = (la1 + la2) / 2;
  const my = (lo1 + lo2) / 2;
  const dx = la2 - la1;
  const dy = lo2 - lo1;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    pts.push([u * u * la1 + 2 * u * t * cx + t * t * la2, u * u * lo1 + 2 * u * t * cy + t * t * lo2]);
  }
  return pts;
}

const iconCache = new Map();
function iconFor(s, state) {
  const key = `${s.id}-${state}`;
  if (!iconCache.has(key)) {
    const size = state === "idle" ? 34 : 42;
    iconCache.set(
      key,
      L.divIcon({
        className: "sh-marker",
        html: glyphSVG({ sectors: s.sectors, type: s.type, size, state }),
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        tooltipAnchor: [0, -size / 2],
      })
    );
  }
  return iconCache.get(key);
}

const FitTo = ({ points, trigger }) => {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return null;
};

// Page scrolling passes over the map until the visitor clicks it;
// then the mouse wheel zooms, until the pointer leaves the map.
const WheelOnClick = ({ onChange }) => {
  const map = useMapEvents({
    click: () => {
      map.scrollWheelZoom.enable();
      onChange(true);
    },
    mouseout: () => {
      map.scrollWheelZoom.disable();
      onChange(false);
    },
  });
  return null;
};

const FlyTo = ({ target }) => {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target.coords, Math.max(map.getZoom(), 5), { duration: 0.6 });
  }, [target, map]);
  return null;
};

/* ---------------------------------------------------------------- */

// One hover card for the whole map, positioned next to the hovered marker.
// Only one can exist, so cards can never pile up.
const FloatingCard = ({ map, coords, depKey, children }) => {
  const ref = useRef(null);
  const [, redraw] = useState(0);
  const [h, setH] = useState(400);
  useEffect(() => {
    if (!map) return undefined;
    const on = () => redraw((n) => n + 1);
    map.on("move zoom resize", on);
    return () => map.off("move zoom resize", on);
  }, [map]);
  useLayoutEffect(() => {
    if (ref.current) setH(ref.current.offsetHeight);
  }, [depKey]);
  if (!map || !coords) return null;
  const pt = map.latLngToContainerPoint(coords);
  const size = map.getSize();
  const W = Math.min(320, size.x - 16);
  const GAP = 22;
  let left;
  let top;
  if (pt.y - GAP - h >= 8) {
    top = pt.y - GAP - h;
    left = pt.x - W / 2;
  } else if (pt.y + GAP + h <= size.y - 8) {
    top = pt.y + GAP;
    left = pt.x - W / 2;
  } else {
    top = pt.y - h / 2;
    left = pt.x > size.x / 2 ? pt.x - GAP - W : pt.x + GAP;
  }
  left = Math.max(8, Math.min(left, size.x - W - 8));
  top = Math.max(8, Math.min(top, size.y - h - 8));
  return (
    <div className="hover-float" ref={ref} style={{ left, top, width: W }} role="tooltip">
      {children}
    </div>
  );
};

const HoverCard = ({ s }) => (
  <div className="hover-card">
    <div className="hover-card__head">
      <strong>{s.name}</strong>
      <span className="muted">
        {s.city}, {s.country} · {s.type}
      </span>
    </div>
    <div className="hover-card__chips">
      {s.sectors.map((k) => (
        <span key={k} className="sector-chip" data-sector={k}>
          {sectorLabel[k]}
        </span>
      ))}
    </div>
    <p className="hover-card__summary">{s.summary}</p>
    {s.nexusWork?.length > 0 && (
      <div className="hover-card__block">
        <span className="hover-card__label">Nexus work</span>
        <ul>
          {s.nexusWork.slice(0, 3).map((w) => (
            <li key={w.title}>
              <b>{w.title.split(" – ")[0]}</b>
              {w.years ? ` (${w.years})` : ""}
              {w.role ? `, ${w.role.split(" (")[0]}` : ""}
            </li>
          ))}
        </ul>
      </div>
    )}
    {s.futureScope?.[0] && (
      <div className="hover-card__block">
        <span className="hover-card__label">Future scope</span>
        <p>{s.futureScope[0]}</p>
      </div>
    )}
    <span className="hover-card__cta">Click the marker for the full profile</span>
  </div>
);

const DetailPanel = ({ s, onClose, onSelect }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, [s]);
  if (!s) return null;
  const partners = partnersFor(s.id);
  const shared = projectsFor(s.id);
  return (
    <aside className="detail" aria-label={`${s.name} profile`} ref={ref} tabIndex={-1}>
      <button className="detail__close" onClick={onClose} aria-label="Close profile">
        Close
      </button>
      <div className="detail__head">
        <NexusGlyph sectors={s.sectors} type={s.type} size={64} />
        <div>
          <h2>{s.name}</h2>
          <p className="muted mb-0">
            {s.city}, {s.country} · {s.type}
          </p>
          {s.website && (
            <a href={s.website} target="_blank" rel="noreferrer">
              {s.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </a>
          )}
        </div>
      </div>

      {s.identification?.confidence === "low" && (
        <p className="detail__flag">Identified from the map location; confirmation pending.</p>
      )}

      <p>{s.summary}</p>

      <div className="detail__chips">
        {s.sectors.map((k) => (
          <span key={k} className="sector-chip" data-sector={k}>
            {sectorLabel[k]}
          </span>
        ))}
      </div>

      <h3>Role in nexus governance</h3>
      <p className="mb-0">{(Array.isArray(s.governanceRole) ? s.governanceRole : [s.governanceRole]).join("; ")}</p>

      <h3>Work on the WEF nexus</h3>
      <ol className="work-list">
        {s.nexusWork.map((w) => (
          <li key={w.title}>
            <div className="work-list__title">
              {w.url ? (
                <a href={w.url} target="_blank" rel="noreferrer">
                  {w.title}
                </a>
              ) : (
                w.title
              )}
            </div>
            <div className="work-list__meta">
              {[w.years, w.role].filter(Boolean).join(" · ")}
            </div>
            <p>{w.detail}</p>
          </li>
        ))}
      </ol>

      <h3>Future scope</h3>
      <ul>
        {s.futureScope.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      {shared.length > 0 && (
        <>
          <h3>Connected through shared projects</h3>
          <ul className="partner-list">
            {partners.map(({ s: p, projects: ps }) => (
              <li key={p.id}>
                <button className="link-btn" onClick={() => onSelect(p.id)}>
                  {p.shortName || p.name}
                </button>
                <span className="muted"> via {ps.join(", ")}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <h3>Sources</h3>
      <ul className="source-list">
        {s.sources.map((src) => (
          <li key={src.url}>
            <a href={src.url} target="_blank" rel="noreferrer">
              {src.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="detail__suggest">
        <a href={`/?topic=correction&about=${encodeURIComponent(s.name)}#contact`}>Suggest a correction or addition to this profile</a>
      </p>
    </aside>
  );
};


const hotspotByIdMap = Object.fromEntries(hotspots.map((h) => [h.id, h]));
const hotspotIcons = {};
function hotspotIcon(selected) {
  const k = selected ? "sel" : "idle";
  if (!hotspotIcons[k]) {
    const size = selected ? 32 : 26;
    const c = size / 2;
    const r = c - 2;
    hotspotIcons[k] = L.divIcon({
      className: "hs-marker",
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><path d="M${c} 2 L${size - 2} ${c} L${c} ${size - 2} L2 ${c} Z" fill="#b3261e" stroke="#fff" stroke-width="2"${selected ? ' stroke-dasharray=""' : ""}/><text x="${c}" y="${c}" dy="0.36em" text-anchor="middle" font-family="Public Sans, sans-serif" font-weight="800" font-size="${(r * 0.95).toFixed(1)}" fill="#fff">!</text></svg>`,
      iconSize: [size, size],
      iconAnchor: [c, c],
    });
  }
  return hotspotIcons[k];
}

const HotspotHover = ({ h }) => (
  <div className="hover-card">
    <div className="hover-card__head">
      <strong>{h.name}</strong>
      <span className="muted">
        Conflict hotspot · {h.place} · {h.years}
      </span>
    </div>
    <p className="hover-card__summary">{h.summary}</p>
    <div className="hover-card__block">
      <span className="hover-card__label">Governance gap</span>
      <p>{h.gap}</p>
    </div>
    <span className="hover-card__cta">Click the marker for details and sources</span>
  </div>
);

const HotspotPanel = ({ h, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, [h]);
  if (!h) return null;
  return (
    <aside className="detail detail--hotspot" aria-label={`${h.name} conflict hotspot`} ref={ref} tabIndex={-1}>
      <button className="detail__close" onClick={onClose} aria-label="Close details">
        Close
      </button>
      <p className="detail__kicker">Conflict hotspot</p>
      <h2>{h.name}</h2>
      <p className="muted">
        {h.place} · {h.years}
      </p>
      <div className="detail__chips">
        {h.sectors.map((k) => (
          <span key={k} className="sector-chip" data-sector={k}>
            {sectorLabel[k]}
          </span>
        ))}
      </div>
      <h3>What happened</h3>
      <p>{h.summary}</p>
      <h3>Governance gap</h3>
      <p>{h.gap}</p>
      <h3>Sources</h3>
      <ul className="source-list">
        {h.sources.map((src) => (
          <li key={src.url}>
            <a href={src.url} target="_blank" rel="noreferrer">
              {src.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

/* ---------------------------------------------------------------- */

export const Stakeholders = () => {
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showNetwork, setShowNetwork] = useState(true);
  const [outlineMap, setOutlineMap] = useState(false);
  const [tilesFailed, setTilesFailed] = useState(false);
  const tileErrors = useRef(0);
  const [hover, setHover] = useState(null); // { id, from: "map" | "list" }
  const [map, setMap] = useState(null);
  const hovered = hover && hover.kind !== "hotspot" ? hover.id : null;
  const [selectedId, setSelectedId] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [wheelOn, setWheelOn] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [searchParams] = useSearchParams();
  const [hotspotId, setHotspotId] = useState(() => searchParams.get("hotspot"));
  const selectedHotspot = hotspotId ? hotspotByIdMap[hotspotId] : null;
  const [legendOpen, setLegendOpen] = useState(() => typeof window === "undefined" || window.innerWidth > 900);

  const selected = selectedId ? byId[selectedId] : null;

  const types = useMemo(() => [...new Set(stakeholders.map((s) => s.type))].sort(), []);
  const countries = useMemo(() => new Set(stakeholders.map((s) => s.countryCode)).size, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stakeholders.filter((s) => {
      if (sectorFilter.length && !sectorFilter.every((k) => s.sectors.includes(k))) return false;
      if (typeFilter && s.type !== typeFilter) return false;
      const roles = Array.isArray(s.governanceRole) ? s.governanceRole : [s.governanceRole];
      if (roleFilter && !roles.includes(roleFilter)) return false;
      if (q) {
        const hay = [s.name, s.shortName, s.city, s.country, ...(s.keyProjects || []), ...s.nexusWork.map((w) => w.title)]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, sectorFilter, typeFilter, roleFilter]);

  const visibleIds = useMemo(() => new Set(visible.map((s) => s.id)), [visible]);

  const links = useMemo(() => {
    const out = [];
    projects.forEach((p) => {
      for (let i = 0; i < p.members.length; i++)
        for (let j = i + 1; j < p.members.length; j++) {
          const a = byId[p.members[i]];
          const b = byId[p.members[j]];
          if (!a || !b) continue;
          out.push({ key: `${p.id}-${a.id}-${b.id}`, project: p, a, b, pts: arcPoints(a.coords, b.coords) });
        }
    });
    return out;
  }, []);

  const focusId = hovered ?? selectedId;

  const toggleSector = (k) =>
    setSectorFilter((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const clearFilters = () => {
    setQuery("");
    setSectorFilter([]);
    setTypeFilter("");
    setRoleFilter("");
    setActiveProject(null);
  };

  const select = (id) => {
    setSelectedId(id);
    setHotspotId(null);
    setHover(null);
  };

  const selectHotspot = (id) => {
    setHotspotId(id);
    setSelectedId(null);
    setHover(null);
  };

  useEffect(() => {
    if (searchParams.get("hotspot")) document.querySelector(".explorer")?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelectedId(null);
        setHotspotId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sectorCounts = SECTORS.map((sec) => ({
    ...sec,
    n: stakeholders.filter((s) => s.sectors.includes(sec.key)).length,
  }));

  const projectMembers = [...new Set(projects.flatMap((p) => p.members))]
    .map((id) => byId[id])
    .sort((a, b) => projectsFor(b.id).length - projectsFor(a.id).length || a.name.localeCompare(b.name));

  return (
    <div className="stakeholders-page">
      <section className="sh-intro">
        <div className="wrap">
          <p className="eyebrow">Stakeholder map</p>
          <h1>Who shapes the <em>water–energy–food nexus</em> in Europe</h1>
          <p className="sh-intro__lede">
            {stakeholders.length} organisations in {countries} countries. Hover over a marker for a summary, click it for
            the full profile. Lines join organisations that share EU-funded projects.
          </p>
        </div>
      </section>

      <section className="explorer" aria-label="Stakeholder explorer">
        <div className="explorer__side">
          <div className="filters">
            <label className="filters__label" htmlFor="sh-search">
              Search organisations or projects
            </label>
            <input
              id="sh-search"
              type="search"
              className="filters__input"
              placeholder="e.g. MAGIC, Leipzig, irrigation"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <fieldset>
              <legend className="filters__label">Works on</legend>
              <div className="filters__chips">
                {SECTORS.map((s) => (
                  <button
                    key={s.key}
                    className={`toggle-chip ${sectorFilter.includes(s.key) ? "is-on" : ""}`}
                    style={{ "--chip": s.color }}
                    aria-pressed={sectorFilter.includes(s.key)}
                    onClick={() => toggleSector(s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="filters__row">
              <div>
                <label className="filters__label" htmlFor="sh-type">
                  Type
                </label>
                <select id="sh-type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="">All types</option>
                  {types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="filters__label" htmlFor="sh-role">
                  Governance role
                </label>
                <select id="sh-role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option value="">All roles</option>
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filters__toggles">
              <label>
                <input type="checkbox" checked={showNetwork} onChange={(e) => setShowNetwork(e.target.checked)} /> Show
                project links
              </label>
              <label>
                <input type="checkbox" checked={showHotspots} onChange={(e) => setShowHotspots(e.target.checked)} /> Show
                conflict hotspots
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={outlineMap || tilesFailed}
                  disabled={tilesFailed}
                  onChange={(e) => setOutlineMap(e.target.checked)}
                />{" "}
                Simple outline map
              </label>
            </div>

            <div className="filters__status" aria-live="polite">
              Showing {visible.length} of {stakeholders.length}
              {(query || sectorFilter.length || typeFilter || roleFilter) && (
                <button className="link-btn" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <ul className="sh-list">
            {visible.map((s) => (
              <li key={s.id}>
                <button
                  className={`sh-list__item ${selectedId === s.id ? "is-selected" : ""}`}
                  onMouseEnter={() => setHover({ id: s.id, from: "list" })}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover({ id: s.id, from: "list" })}
                  onBlur={() => setHover(null)}
                  onClick={() => select(s.id)}
                >
                  <NexusGlyph sectors={s.sectors} type={s.type} size={30} />
                  <span>
                    <span className="sh-list__name">{s.shortName || s.name}</span>
                    <span className="sh-list__meta">
                      {s.city}, {s.country}
                    </span>
                  </span>
                </button>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="sh-list__empty">
                No organisation matches these filters. Remove a sector or clear the search to see more.
              </li>
            )}
          </ul>
        </div>

        <div className="explorer__map">
          <MapContainer
            ref={setMap}
            center={[51, 10]}
            zoom={4}
            minZoom={3}
            maxZoom={12}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={!L.Browser.mobile}
            worldCopyJump={false}
            maxBounds={[
              [18, -45],
              [78, 75],
            ]}
            maxBoundsViscosity={0.8}
            className="sh-map"
          >
            <ZoomControl position="topright" />
            <WheelOnClick onChange={setWheelOn} />
            <FitTo points={stakeholders.map((s) => s.coords)} trigger="init" />
            <FlyTo target={selected || selectedHotspot} />
            {outlineMap || tilesFailed ? (
              <EuropeBase />
            ) : (
              <TileLayer
                className="osm-tiles"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
                eventHandlers={{
                  tileerror: () => {
                    tileErrors.current += 1;
                    if (tileErrors.current > 6) setTilesFailed(true);
                  },
                }}
              />
            )}

            {showNetwork &&
              links.map((l) => {
                const touchesFocus = focusId && (l.a.id === focusId || l.b.id === focusId);
                const inProject = activeProject && l.project.id === activeProject;
                const bothVisible = visibleIds.has(l.a.id) && visibleIds.has(l.b.id);
                if (!bothVisible) return null;
                const strong = touchesFocus || inProject;
                const dim = (focusId || activeProject) && !strong;
                return (
                  <Polyline
                    key={l.key + (strong ? "-s" : dim ? "-d" : "")}
                    positions={l.pts}
                    pathOptions={{
                      color: strong ? THEME_COLOR[l.project.theme] : "#1c2432",
                      weight: strong ? 3 : 1.4,
                      opacity: strong ? 0.9 : dim ? 0.08 : 0.28,
                      dashArray: l.project.years.startsWith("2026") ? "4 6" : null,
                    }}
                  >
                    <Tooltip sticky className="link-tip">
                      <b>{l.project.name}</b> ({l.project.years}): {l.a.shortName} – {l.b.shortName}
                    </Tooltip>
                  </Polyline>
                );
              })}

            {visible.map((s) => {
              const state =
                selectedId === s.id ? "selected" : hover?.from === "list" && hover.id === s.id ? "hover" : "idle";
              return (
                <Marker
                  key={s.id}
                  position={s.coords}
                  icon={iconFor(s, state)}
                  zIndexOffset={state === "idle" ? 0 : 1000}
                  keyboard={true}
                  title={s.name}
                  alt={s.name}
                  eventHandlers={{
                    click: () => select(s.id),
                    mouseover: () => setHover({ id: s.id, from: "map" }),
                    mouseout: () => setHover(null),
                  }}
                >
                </Marker>
              );
            })}
            {showHotspots &&
              hotspots.map((h) => (
                <Marker
                  key={`hs-${h.id}`}
                  position={h.coords}
                  icon={hotspotIcon(hotspotId === h.id)}
                  zIndexOffset={hotspotId === h.id ? 1200 : 500}
                  keyboard={true}
                  title={`${h.name} (conflict hotspot)`}
                  alt={`${h.name} (conflict hotspot)`}
                  eventHandlers={{
                    click: () => selectHotspot(h.id),
                    mouseover: () => setHover({ id: h.id, from: "map", kind: "hotspot" }),
                    mouseout: () => setHover(null),
                  }}
                />
              ))}
          </MapContainer>

          {hover?.from === "map" && hover.kind !== "hotspot" && hover.id !== selectedId && (
            <FloatingCard map={map} coords={byId[hover.id]?.coords} depKey={hover.id}>
              <HoverCard s={byId[hover.id]} />
            </FloatingCard>
          )}
          {hover?.kind === "hotspot" && hover.id !== hotspotId && (
            <FloatingCard map={map} coords={hotspotByIdMap[hover.id]?.coords} depKey={hover.id}>
              <HotspotHover h={hotspotByIdMap[hover.id]} />
            </FloatingCard>
          )}

          <DetailPanel s={selected} onClose={() => setSelectedId(null)} onSelect={select} />
          <HotspotPanel h={selectedHotspot} onClose={() => setHotspotId(null)} />

          <details className="map-legend" open={legendOpen} onToggle={(e) => setLegendOpen(e.currentTarget.open)}>
            <summary>How to read a marker</summary>
            <div className="map-legend__body">
              <NexusGlyph sectors={["water", "energy", "food"]} type="University" size={44} />
              <div>
                <p className="mb-1">Ring: sectors the organisation works on</p>
                <div className="map-legend__chips">
                  {SECTORS.map((s) => (
                    <span key={s.key} className="sector-chip" data-sector={s.key}>
                      {s.label}
                    </span>
                  ))}
                </div>
                <p className="mb-0 mt-1">
                  Centre letter:{" "}
                  {Object.entries(TYPE_CODES)
                    .filter(([t]) => types.includes(t))
                    .map(([t, c]) => `${c} ${TYPE_SHORT[t] || t}`)
                    .join(", ")}
                </p>
                <p className="mb-0 mt-1 map-legend__hs">
                  <span className="map-legend__diamond" aria-hidden="true" /> Conflict hotspot (see the Challenges page)
                </p>
              </div>
            </div>
          </details>

          {!wheelOn && (
            <p className="map-hint" aria-hidden="true">
              {L.Browser.mobile ? "Pinch with two fingers to zoom and move the map" : "Click the map to zoom with your mouse wheel"}
            </p>
          )}
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <h2>Who works with whom</h2>
          <p className="measure">
            Each row is an EU-funded project that links two or more organisations on the map. Select a project to
            highlight its links on the map above. Memberships were checked against the project records on CORDIS or
            the partners' own pages.
          </p>
          <div className="matrix-scroll" role="region" aria-label="Project membership matrix" tabIndex={0}>
            <table className="matrix">
              <thead>
                <tr>
                  <th scope="col" className="matrix__proj">
                    Project
                  </th>
                  {projectMembers.map((s) => (
                    <th key={s.id} scope="col" className="matrix__org">
                      <span>{s.shortName}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className={activeProject === p.id ? "is-active" : ""}>
                    <th scope="row" className="matrix__proj">
                      <button
                        className="matrix__btn"
                        aria-pressed={activeProject === p.id}
                        onClick={() => {
                          setActiveProject(activeProject === p.id ? null : p.id);
                          setShowNetwork(true);
                          document.querySelector(".explorer")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <span className="matrix__dot" style={{ background: THEME_COLOR[p.theme] }} />
                        <span>
                          <b>{p.name}</b>
                          <span className="muted">
                            {" "}
                            {p.programme}, {p.years}
                          </span>
                        </span>
                      </button>
                      <span className="matrix__desc">
                        {p.desc}{" "}
                        <a href={p.url} target="_blank" rel="noreferrer">
                          Source
                        </a>
                      </span>
                    </th>
                    {projectMembers.map((s) => (
                      <td key={s.id}>
                        {p.members.includes(s.id) ? (
                          <span
                            className="matrix__cell"
                            style={{ background: THEME_COLOR[p.theme] }}
                            title={`${s.shortName} in ${p.name}`}
                          />
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {activeProject && (
            <p className="mt-3">
              <button className="link-btn" onClick={() => setActiveProject(null)}>
                Clear project highlight
              </button>
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Roles in nexus governance</h2>
          <p className="measure">
            The research classifies each organisation by the part it plays in governing the nexus. Most of the
            organisations here supply evidence and models; few operate infrastructure or hold decision rights. That gap
            between knowledge and authority is one of the study's central findings.
          </p>
          <div className="roles-grid">
            {ROLES.map((r) => {
              const members = stakeholders.filter((s) =>
                (Array.isArray(s.governanceRole) ? s.governanceRole : [s.governanceRole]).includes(r)
              );
              return (
                <div key={r} className="role-col">
                  <h3>
                    {r} <span className="muted">{members.length}</span>
                  </h3>
                  <ul>
                    {members.map((s) => (
                      <li key={s.id}>
                        <button
                          className="link-btn"
                          onClick={() => {
                            select(s.id);
                            document.querySelector(".explorer")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          {s.shortName || s.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap coverage">
          <div>
            <h2>Sector coverage</h2>
            <p className="measure">
              How many of the {stakeholders.length} organisations work on each part of the nexus. Every organisation
              here works on water and climate; ecosystems is where coverage is thinnest.
            </p>
          </div>
          <div className="bars" role="list">
            {sectorCounts.map((s) => (
              <div key={s.key} className="bar" role="listitem">
                <span className="bar__label">{s.label}</span>
                <span className="bar__track">
                  <span className="bar__fill" style={{ width: `${(s.n / stakeholders.length) * 100}%`, background: s.color }} />
                </span>
                <span className="bar__n">{s.n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap measure">
          <h2>How this map was built</h2>
          <p>
            Organisations were chosen for their research, policy or operational role in water, energy and food systems
            in Europe. Each profile draws on the organisation's own website and on project records in CORDIS, the EU's
            research database; every claim links to its source in the profile. Sector coverage and governance role are
            the author's classification, using the governance framework set out on the{" "}
            <a href="#/research">research page</a>.
          </p>
          <p className="muted mb-0">
            Profiles last reviewed October 2026. Know an organisation that should be here?{" "}
            <a href="/?topic=stakeholder#contact">Suggest it</a>.
          </p>
        </div>
      </section>
    </div>
  );
};
