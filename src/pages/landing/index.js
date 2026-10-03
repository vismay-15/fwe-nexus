import React from "react";
import { Link } from "react-router-dom";
import { SECTORS } from "../../components/NexusGlyph";
import { stakeholders, projects } from "../../data/stakeholders";
import "./style.css";

// Large labelled version of the map glyph: the five sectors around governance.
const NexusWheel = () => {
  const size = 420;
  const c = size / 2;
  const r = 150;
  const w = 46;
  const gap = 0.07;
  const step = (Math.PI * 2) / SECTORS.length;
  const start = -Math.PI / 2;
  const pt = (rad, a) => [c + rad * Math.cos(a), c + rad * Math.sin(a)];
  return (
    <svg viewBox={`-70 -30 ${size + 140} ${size + 60}`} className="wheel" role="img" aria-label="The five parts of the nexus around governance: water, energy, food, ecosystems and climate">
      {SECTORS.map((s, i) => {
        const a0 = start + i * step + gap / 2;
        const a1 = start + (i + 1) * step - gap / 2;
        const [x0, y0] = pt(r, a0);
        const [x1, y1] = pt(r, a1);
        const mid = (a0 + a1) / 2;
        const [lx, ly] = pt(r + 40, mid);
        const cos = Math.cos(mid);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        return (
          <g key={s.key}>
            <path d={`M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`} stroke={s.color} strokeWidth={w} fill="none" />
            <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" className="wheel__label">
              {s.label}
            </text>
          </g>
        );
      })}
      <circle cx={c} cy={c} r={92} fill="#14273a" />
      <text x={c} y={c - 8} textAnchor="middle" className="wheel__core">
        Governance
      </text>
      <text x={c} y={c + 20} textAnchor="middle" className="wheel__core-sub">
        who decides,
      </text>
      <text x={c} y={c + 37} textAnchor="middle" className="wheel__core-sub">
        with what evidence
      </text>
    </svg>
  );
};

const DRIVERS = [
  {
    title: "Climate change and drought",
    text: "In August 2022, 47% of Europe was under drought warning and 17% under alert. The same drought cut crop yields, hydropower and power-plant cooling at once.",
    accent: "#7a5ba6",
  },
  {
    title: "The energy transition",
    text: "Solar, wind, grids and new industry compete for land and water. Energy prices pass straight into food through fertiliser, heating and transport.",
    accent: "#d9930f",
  },
  {
    title: "Food security and input prices",
    text: "Irrigation, fertiliser and processing tie food production to both water availability and energy costs.",
    accent: "#4e8a3a",
  },
  {
    title: "Digitalisation",
    text: "Sensors, metering and models make cross-sector effects visible, but data only helps when it is linked to who decides.",
    accent: "#1f6fb2",
  },
  {
    title: "Changing EU policy",
    text: "The Water Framework Directive, the Green Deal, the CAP and the 2025 European Water Resilience Strategy overlap, creating both openings and conflicting mandates.",
    accent: "#14273a",
  },
];

const FINDINGS = [
  {
    title: "The gaps are between levels, not only between sectors",
    text: "In Spain, regional farming decisions around Doñana and the Mar Menor clashed with basin and EU water rules. In Germany, a water permit for the Grünheide gigafactory was ruled unlawful for lack of public involvement.",
  },
  {
    title: "Efficiency is not the same as using less",
    text: "More efficient irrigation can raise total water use when saved water irrigates new land. Funding for efficiency should be tied to basin-level limits.",
  },
  {
    title: "Participation works best before decisions are fixed",
    text: "Where affected groups were brought in late, ecosystem interests were defended through courts rather than through planning.",
  },
];

export const Landing = () => {
  const countries = new Set(stakeholders.map((s) => s.countryCode)).size;
  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div>
            <h1 className="hero__title">Water, energy and food are one system. Their governance is not.</h1>
            <p className="lede measure">
              A research project on the drivers and institutions that shape how Europe manages the links between water,
              energy and food, and on what it would take to manage them together.
            </p>
            <div className="hero__actions">
              <Link to="/stakeholders" className="btn-ink">
                Explore the stakeholder map
              </Link>
              <Link to="/research" className="btn-line">
                Read about the research
              </Link>
            </div>
          </div>
          <NexusWheel />
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <h2>Why the nexus matters now</h2>
          <p className="measure">
            No single resource is running out. The pressure comes from several changes hitting the same coupled
            systems at once, so a fix in one sector can shift cost or risk into another.
          </p>
          <div className="drivers">
            {DRIVERS.map((d) => (
              <div key={d.title} className="driver" style={{ "--accent": d.accent }}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
          <p className="muted small mt-3 mb-0">
            Drought figures: Toreti et al. (2022), <i>Drought in Europe – August 2022</i>, European Commission Joint
            Research Centre.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2>What the research asks</h2>
            <p className="measure">
              The study compares how Spain and Germany govern the nexus. Spain faces chronic water scarcity and depends
              on irrigation; Germany is managing emerging drought alongside a fast energy transition in a federal
              system. Scotland, the Netherlands and Finland add three further approaches: a public water utility acting
              as an energy player, circular greenhouse horticulture and a national bioeconomy strategy.
            </p>
            <Link to="/research" className="btn-line">
              See the framework and case studies
            </Link>
          </div>
          <ol className="rq-list">
            <li>
              <b>Drivers.</b> What is reshaping how water, energy and food interact in Europe?
            </li>
            <li>
              <b>Governance.</b> How do institutions and stakeholder relationships enable or block integrated
              decisions?
            </li>
            <li>
              <b>Comparison.</b> What can be learned from Spain and Germany, and from Scotland, the Netherlands and
              Finland?
            </li>
            <li>
              <b>Evidence.</b> Which indicators and data arrangements are needed to put the nexus into practice?
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <h2>Emerging findings</h2>
          <div className="findings">
            {FINDINGS.map((f) => (
              <div key={f.title} className="finding">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap map-teaser">
          <div>
            <h2>Map the people and organisations behind the nexus</h2>
            <p className="measure">
              The stakeholder map profiles {stakeholders.length} organisations in {countries} countries: what each one
              works on, the projects it leads or joins, where its work is heading, and which of the others it works
              with through {projects.length} shared EU-funded projects.
            </p>
          </div>
          <Link to="/stakeholders" className="btn-ink">
            Open the stakeholder map
          </Link>
        </div>
      </section>
    </>
  );
};
