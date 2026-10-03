import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { challenges, hotspots, renewables, wei } from "../../data/challenges";
import { SECTORS } from "../../components/NexusGlyph";
import "./style.css";

const sectorColor = Object.fromEntries(SECTORS.map((s) => [s.key, s.color]));

/* ------------------------------------------------------------------
   Shared chart pieces: one hover readout per chart, keyboard-reachable
   rows, and a table view so no value depends on hovering.
------------------------------------------------------------------- */

const ROW = 30;
const LABEL_W = 112;
const RIGHT_PAD = 56;
const TOP = 34;
const VB_W = 640;

function useHover() {
  const [hover, setHover] = useState(null);
  return [hover, setHover];
}

const Readout = ({ hover, children }) =>
  hover ? (
    <div
      className="chart-tip"
      style={{ left: `${(hover.x / VB_W) * 100}%`, top: `${hover.yPct}%` }}
      role="status"
    >
      {children}
    </div>
  ) : null;

const TableToggle = ({ open, onToggle, id }) => (
  <button className="link-btn chart-table-btn" aria-expanded={open} aria-controls={id} onClick={onToggle}>
    {open ? "Hide data table" : "Show data table"}
  </button>
);

/* Renewables: 2013 → 2024 per country (dumbbell) */
const RenewablesChart = () => {
  const rows = useMemo(() => [...renewables].sort((a, b) => b.y2024 - a.y2024), []);
  const [hover, setHover] = useHover();
  const [table, setTable] = useState(false);
  const max = 90;
  const plotW = VB_W - LABEL_W - RIGHT_PAD;
  const x = (v) => LABEL_W + (v / max) * plotW;
  const H = TOP + rows.length * ROW + 26;
  const ticks = [0, 20, 40, 60, 80];
  const light = "#e3a73a";
  const dark = "#9a6400";

  return (
    <figure className="chart">
      <figcaption>
        <h3>Renewable share of energy use, 2013 and 2024</h3>
        <p>
          Every country rose, but at very different speeds. The EU-27 went from 16.7% to 25.2%; Norway and Sweden
          already lead, while the Netherlands, Ireland and Poland started lowest.
        </p>
      </figcaption>
      <div className="chart__legend" aria-hidden="true">
        <span>
          <i style={{ background: light }} /> 2013
        </span>
        <span>
          <i style={{ background: dark }} /> 2024
        </span>
      </div>
      <div className="chart__plot" onPointerLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${VB_W} ${H}`} role="img" aria-label="Dot chart of renewable energy share by country, 2013 and 2024. Values are in the data table.">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={TOP - 8} y2={H - 22} className="chart__grid" />
              <text x={x(t)} y={H - 6} textAnchor="middle" className="chart__axis">
                {t}%
              </text>
            </g>
          ))}
          {rows.map((r, i) => {
            const y = TOP + i * ROW + ROW / 2;
            const isEU = r.code === "EU27_2020";
            const on = hover?.code === r.code;
            const show = () => setHover({ code: r.code, x: x(r.y2024), yPct: (y / H) * 100, r });
            return (
              <g
                key={r.code}
                tabIndex={0}
                onPointerEnter={show}
                onFocus={show}
                onBlur={() => setHover(null)}
                className={`chart__row ${on ? "is-on" : ""}`}
              >
                <rect x={0} y={y - ROW / 2} width={VB_W} height={ROW} fill="transparent" />
                <text x={LABEL_W - 10} y={y} dy="0.35em" textAnchor="end" className={`chart__label ${isEU ? "is-eu" : ""}`}>
                  {r.name}
                </text>
                <line x1={x(r.y2013)} x2={x(r.y2024)} y1={y} y2={y} className="chart__span" />
                <circle cx={x(r.y2013)} cy={y} r={6} fill={light} stroke="#fff" strokeWidth={2} />
                <circle cx={x(r.y2024)} cy={y} r={7} fill={dark} stroke="#fff" strokeWidth={2} />
                <text x={x(r.y2024) + 12} y={y} dy="0.35em" className="chart__value">
                  {r.y2024.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
        <Readout hover={hover}>
          {hover && (
            <>
              <strong>{hover.r.name}</strong>
              <span>
                <i style={{ background: dark }} /> <b>{hover.r.y2024.toFixed(1)}%</b> in 2024
              </span>
              <span>
                <i style={{ background: light }} /> <b>{hover.r.y2013.toFixed(1)}%</b> in 2013
              </span>
              <span className="muted">+{(hover.r.y2024 - hover.r.y2013).toFixed(1)} points</span>
            </>
          )}
        </Readout>
      </div>
      <p className="chart__source">
        Source:{" "}
        <a href="https://doi.org/10.2908/NRG_IND_REN" target="_blank" rel="noreferrer">
          Eurostat, nrg_ind_ren
        </a>{" "}
        (share of energy from renewable sources), data updated 15 September 2026. The UK and Switzerland are not covered.
        Chart drawn by the author; values rounded to one decimal place.
      </p>
      <TableToggle id="ren-table" open={table} onToggle={() => setTable((v) => !v)} />
      {table && (
        <div className="chart__table" id="ren-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">2013 (%)</th>
                <th scope="col">2024 (%)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code}>
                  <th scope="row">{r.name}</th>
                  <td>{r.y2013.toFixed(1)}</td>
                  <td>{r.y2024.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
};

/* Water exploitation index plus: 2023 bars with 2022 marker */
const WeiChart = () => {
  const rows = useMemo(() => [...wei].sort((a, b) => b.y2023 - a.y2023), []);
  const [hover, setHover] = useHover();
  const [table, setTable] = useState(false);
  const max = 16;
  const plotW = VB_W - LABEL_W - RIGHT_PAD;
  const x = (v) => LABEL_W + (v / max) * plotW;
  const H = TOP + rows.length * ROW + 26;
  const ticks = [0, 4, 8, 12, 16];
  const bar = "#1f5f99";
  const prior = "#5aa0e0";

  return (
    <figure className="chart">
      <figcaption>
        <h3>Water exploitation index plus (WEI+), 2023</h3>
        <p>
          The share of renewable freshwater used each year. Greece, Italy and Spain are highest, and most countries were
          higher in the 2022 drought year. Annual national averages hide summer and local scarcity: in 2023 water scarcity
          still affected 28% of EU land.
        </p>
      </figcaption>
      <div className="chart__legend" aria-hidden="true">
        <span>
          <i style={{ background: bar }} /> 2023
        </span>
        <span>
          <i className="tick" style={{ background: prior }} /> 2022 (drought year)
        </span>
      </div>
      <div className="chart__plot" onPointerLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${VB_W} ${H}`} role="img" aria-label="Bar chart of water exploitation index plus by country for 2023, with 2022 markers. Values are in the data table.">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={TOP - 8} y2={H - 22} className="chart__grid" />
              <text x={x(t)} y={H - 6} textAnchor="middle" className="chart__axis">
                {t}%
              </text>
            </g>
          ))}
          {rows.map((r, i) => {
            const y = TOP + i * ROW + ROW / 2;
            const isEU = r.code === "EU27_2020";
            const on = hover?.code === r.code;
            const w = Math.max(x(r.y2023) - LABEL_W, 2);
            const show = () => setHover({ code: r.code, x: x(Math.max(r.y2023, r.y2022)), yPct: (y / H) * 100, r });
            return (
              <g
                key={r.code}
                tabIndex={0}
                onPointerEnter={show}
                onFocus={show}
                onBlur={() => setHover(null)}
                className={`chart__row ${on ? "is-on" : ""}`}
              >
                <rect x={0} y={y - ROW / 2} width={VB_W} height={ROW} fill="transparent" />
                <text x={LABEL_W - 10} y={y} dy="0.35em" textAnchor="end" className={`chart__label ${isEU ? "is-eu" : ""}`}>
                  {r.name}
                  {r.estimated ? "*" : ""}
                </text>
                <path
                  d={`M${LABEL_W} ${y - 8} h${w - 4} a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h${-(w - 4)} z`}
                  fill={bar}
                  opacity={on ? 0.85 : 1}
                />
                <line x1={x(r.y2022)} x2={x(r.y2022)} y1={y - 11} y2={y + 11} stroke={prior} strokeWidth={3} strokeLinecap="round" />
                <text x={x(Math.max(r.y2023, r.y2022)) + 10} y={y} dy="0.35em" className="chart__value">
                  {r.y2023.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
        <Readout hover={hover}>
          {hover && (
            <>
              <strong>
                {hover.r.name}
                {hover.r.estimated ? " (estimated)" : ""}
              </strong>
              <span>
                <i style={{ background: bar }} /> <b>{hover.r.y2023.toFixed(1)}%</b> in 2023
              </span>
              <span>
                <i style={{ background: prior }} /> <b>{hover.r.y2022.toFixed(1)}%</b> in 2022
              </span>
            </>
          )}
        </Readout>
      </div>
      <p className="chart__source">
        Source:{" "}
        <a href="https://doi.org/10.2908/SDG_06_60" target="_blank" rel="noreferrer">
          Eurostat, sdg_06_60
        </a>{" "}
        (water exploitation index plus), produced by the European Environment Agency; data updated 28 April 2026. *Switzerland's
        values are estimates; the UK is not covered. Chart drawn by the author; values rounded to one decimal place.
      </p>
      <TableToggle id="wei-table" open={table} onToggle={() => setTable((v) => !v)} />
      {table && (
        <div className="chart__table" id="wei-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">2022 (%)</th>
                <th scope="col">2023 (%)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code}>
                  <th scope="row">
                    {r.name}
                    {r.estimated ? " (estimated)" : ""}
                  </th>
                  <td>{r.y2022.toFixed(1)}</td>
                  <td>{r.y2023.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
};

export const Challenges = () => (
  <div className="challenges-page">
    <section className="section ch-intro">
      <div className="wrap measure">
        <h1>Challenges and evidence</h1>
        <p className="lede">
          The pressures on Europe's water, energy and food systems, the figures behind them, and the places where they
          have turned into open conflict.
        </p>
      </div>
    </section>

    <section className="section section--paper">
      <div className="wrap">
        <h2>Key challenges</h2>
        <div className="ch-cards">
          {challenges.map((c) => (
            <article key={c.id} className="ch-card" style={{ "--accent": sectorColor[c.sector] }}>
              <h3>{c.title}</h3>
              <p className="ch-card__figure">{c.figure}</p>
              <p className="ch-card__label">{c.figureLabel}</p>
              <p>{c.text}</p>
              <p className="ch-card__source">
                <a href={c.url} target="_blank" rel="noreferrer">
                  {c.source}
                </a>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <h2>What the data shows</h2>
        <p className="measure">
          Two indicators from official EU statistics for the countries on the stakeholder map. Hover over or tab to a row
          for its values, or open the data table.
        </p>
        <div className="ch-charts">
          <RenewablesChart />
          <WeiChart />
        </div>
      </div>
    </section>

    <section className="section section--paper">
      <div className="wrap">
        <h2>Conflict hotspots</h2>
        <p className="measure">
          Places where water, energy and food interests have collided and the dispute ended up in the courts, in
          parliament or on the streets. Each shows a governance gap the research examines. They also appear on the
          stakeholder map.
        </p>
        <div className="hotspot-list">
          {hotspots.map((h) => (
            <article key={h.id} className="hotspot-item">
              <h3>{h.name}</h3>
              <p className="muted hotspot-item__meta">
                {h.place} · {h.years}
              </p>
              <p>{h.summary}</p>
              <p className="hotspot-item__gap">
                <b>Governance gap:</b> {h.gap}
              </p>
              <p className="hotspot-item__links">
                <Link to={`/stakeholders?hotspot=${h.id}`}>Show on the map</Link>
                {" · Sources: "}
                {h.sources.map((s, i) => (
                  <React.Fragment key={s.url}>
                    {i > 0 && ", "}
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </React.Fragment>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
);
