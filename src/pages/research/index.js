import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const DIMENSIONS = [
  ["Policy coherence", "Do sector policies reinforce or undermine one another?"],
  ["Institutional coordination", "Are responsibilities and decision rights clear across sectors and levels?"],
  ["Data governance", "Can the people who decide get compatible, timely evidence?"],
  ["Participation", "Are affected groups involved before decisions are fixed?"],
  ["Finance and incentives", "Does funding reward integrated outcomes rather than single-sector gains?"],
  ["Monitoring and accountability", "Are outcomes measured across water, energy, food and ecosystems?"],
  ["Adaptive capacity", "Can policy respond to drought, price shocks and new evidence?"],
];

const PRIMARY_CASES = [
  {
    name: "Spain",
    tag: "Water scarcity and irrigation",
    pressure:
      "Irrigated land is about 23% of cultivated area but produces around 65% of final crop output (MAPA). Irrigation is still by far the largest water use.",
    mechanism:
      "Long-established river-basin authorities (Confederaciones Hidrográficas), and a programme to digitalise irrigation communities: €170.2 million for 375 projects covering about 1.25 million hectares, funded through NextGenerationEU.",
    tension:
      "Doñana: despite a 2021 EU Court of Justice ruling on over-abstraction, a 2023 regional bill sought to regularise irrigated land near the park, until a national–regional agreement in November 2023. Mar Menor: agricultural nutrient run-off drove mass die-offs in 2019 and 2021; in 2022 the lagoon was given legal personality.",
    lesson: "Farm-level efficiency must be tied to basin-level limits, or saved water simply irrigates more land.",
  },
  {
    name: "Germany",
    tag: "Energy transition in a federal system",
    pressure:
      "Repeated dry years since 2018 have raised concern about groundwater, low river flows and irrigation, while renewables, grids and new industry reshape land and water demand.",
    mechanism:
      "The National Water Strategy (Federal Cabinet, March 2023) treats water as a cross-sector resource, with 78 measures to 2030, including linking water, energy and material cycles.",
    tension:
      "Grünheide: as the Tesla gigafactory was being built, a court ruled in March 2022 that a permit letting the regional water association pump more groundwater was unlawful, because the public had not been properly involved. Water-abstraction charges are set by each Land and vary widely; Bavaria introduced one only in 2026.",
    lesson: "National strategy works only if Länder implementation, permitting and local participation follow it.",
  },
];

const ILLUSTRATIVE = [
  {
    name: "Scotland",
    tag: "A utility as a nexus player",
    text: "Under the Hydro Nation policy, publicly owned Scottish Water halved its operational emissions from 462,000 tCO2e (2006/07) to 231,000 tCO2e through energy efficiency, renewables and resource recovery. The latest annual cut was only 18,000 t, so further progress is getting harder.",
  },
  {
    name: "Netherlands",
    tag: "Circular greenhouse horticulture",
    text: "Greenhouses recirculate water and nutrients and are moving off natural gas. The sector and government have co-run the Kas als Energiebron programme since 2003, and greenhouse CO2 is governed through a sector agreement due to be replaced by individual pricing.",
  },
  {
    name: "Finland",
    tag: "Bioeconomy and resource recovery",
    text: "The Finnish Bioeconomy Strategy 2022–2035 treats wastewater and side streams as sources of nutrients, heat and biogas, and links municipalities, water, energy and waste actors.",
  },
];

const INDICATORS = [
  ["Water", "Water exploitation index and abstraction by sector; irrigation efficiency alongside total irrigation abstraction; reuse rate"],
  ["Ecosystems", "Share of water bodies in good ecological status; share of environmental flows met"],
  ["Energy", "Energy intensity of water services and irrigation; water used by the energy sector; renewable share in water and farm operations"],
  ["Land", "Area used for solar, wind and agrivoltaics"],
  ["Food", "Crop yield and its variability; irrigated area and crop water demand"],
  ["Cross-sector", "Greenhouse-gas emissions from water and food operations; energy and nutrients recovered from wastewater"],
  ["Social", "Household water and energy affordability"],
  ["Governance", "Cross-sector coordination and early participation, each scored 0–3; open-data coverage and update frequency"],
  ["Finance", "Investment in integrated projects, and the share conditional on system-level outcomes"],
];

const RECOMMENDATIONS = [
  ["Institutionalise cross-sector review", "Require major water, energy, farming and land-use strategies, and large permits, to assess cross-sector impacts, including water availability."],
  ["Tie efficiency funding to system outcomes", "Link irrigation-modernisation and digitalisation grants to basin-level caps on total abstraction."],
  ["Build shared indicators and interoperable data", "Agree a small common indicator set with clear definitions, scales, owners and metadata."],
  ["Link digital investment to decision rules", "State how new sensors and dashboards will change allocation, planning or operations."],
  ["Strengthen vertical coordination", "Formally connect basin planning with regional land-use, farming and energy decisions."],
  ["Move participation upstream", "Involve affected groups before options are fixed, with clear rules on influence and disputes."],
  ["Plan scenarios jointly and evaluate governance", "Test drought, price and climate scenarios together, and track whether coordination improves."],
];

const NEXT_STEPS = [
  ["Expert interviews", "Test the findings with people who manage water, energy and farming decisions in Spain and Germany."],
  ["Populate the indicator set", "Fill the indicators for both countries over a common period, from Eurostat, EEA and national statistics."],
  ["Live nexus dashboard", "Connect the stakeholder map to the indicators, so each organisation can be seen next to the outcomes it influences."],
  ["Basin-scale decision support", "Pilot a digital tool that combines drought, reservoir, irrigation, energy and crop data with agreed decision thresholds."],
];

export const Research = () => (
  <div className="research-page">
    <section className="section research-intro">
      <div className="wrap measure">
        <h1>Drivers and governance of the water–energy–food nexus in Europe</h1>
        <p className="lede">
          Technical solutions for managing water, energy and food together already exist. This research asks why they
          are so unevenly used, and argues that the main barrier is how responsibility is divided between sectors and
          between levels of government.
        </p>
        <p>
          The study is a qualitative comparative case study. Academic literature and EU and national policy documents
          are coded against seven governance dimensions, then compared across two primary cases (Spain and Germany) and
          three illustrative ones (Scotland, the Netherlands and Finland).
        </p>
        <nav className="toc" aria-label="On this page">
          {[
            ["framework", "Framework"],
            ["cases", "Case studies"],
            ["indicators", "Indicators"],
            ["recommendations", "Recommendations"],
            ["next", "Next steps"],
          ].map(([id, label]) => (
            <button key={id} className="link-btn" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </section>

    <section id="framework" className="section section--paper">
      <div className="wrap">
        <h2>Framework</h2>
        <figure className="fw" aria-label="Framework diagram">
          <div className="fw__cols">
            <div className="fw__col">
              <p className="fw__persp">1. Systems interdependence</p>
              <div className="fw__box">
                <h3>Drivers</h3>
                <p>Climate and drought · energy transition · markets and input prices · EU policy · digitalisation</p>
              </div>
              <span className="fw__arrow fw__arrow--down" aria-hidden="true" />
              <div className="fw__box">
                <h3>Coupled WEF systems</h3>
                <p>Water, energy and food, within ecosystem limits (ecosystems as a cross-cutting condition)</p>
              </div>
            </div>
            <span className="fw__link" aria-hidden="true">
              <svg viewBox="0 0 36 14" width="36" height="14">
                <line x1="6" y1="7" x2="30" y2="7" stroke="#66788a" strokeWidth="2" />
                <path d="M0 7 L8 2 L8 12 Z M36 7 L28 2 L28 12 Z" fill="#66788a" />
              </svg>
            </span>
            <div className="fw__col">
              <p className="fw__persp">2. Governance integration</p>
              <div className="fw__box fw__box--tall">
                <h3>Governance arrangements</h3>
                <p>Assessed on seven dimensions:</p>
                <ul>
                  {DIMENSIONS.map(([d]) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <span className="fw__link" aria-hidden="true">
              <svg viewBox="0 0 36 14" width="36" height="14">
                <line x1="6" y1="7" x2="30" y2="7" stroke="#66788a" strokeWidth="2" />
                <path d="M0 7 L8 2 L8 12 Z M36 7 L28 2 L28 12 Z" fill="#66788a" />
              </svg>
            </span>
            <div className="fw__col">
              <p className="fw__persp">3. Stakeholder influence</p>
              <div className="fw__box fw__box--tall">
                <h3>Actors and mandates</h3>
                <p>Who regulates, funds, operates, owns data, bears risk or is affected</p>
                <p>EU · national · regional · basin · utility · farm · community</p>
                <p>Influence comes from mandate, budget, data and veto power</p>
              </div>
            </div>
          </div>
          <div className="fw__merge" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="fw__result">
            <h3>Shared evidence and integrated decisions</h3>
            <p>Indicators, monitoring, open data and scenarios inform decisions on trade-offs, synergies, decision rules and accountability.</p>
          </div>
          <p className="fw__loop">
            <span aria-hidden="true">↻</span> Adaptive review: monitoring feeds back into the drivers, the systems and the rules.
          </p>
          <figcaption className="muted">
            Three perspectives — systems, governance and stakeholders — meet in shared evidence and integrated decisions.
          </figcaption>
        </figure>

        <h3 className="fw__dims-title">The seven governance dimensions</h3>
        <p className="muted">Adapted from the OECD Principles on Water Governance and Weitz et al. (2017).</p>
        <dl className="dims">
          {DIMENSIONS.map(([d, q]) => (
            <div key={d}>
              <dt>{d}</dt>
              <dd>{q}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    <section id="cases" className="section">
      <div className="wrap">
        <h2>Case studies</h2>
        <p className="measure">
          Spain and Germany were chosen because they differ in almost every respect, so any governance gap they share is
          likely to be a general European problem rather than a national quirk.
        </p>
        <div className="cases">
          {PRIMARY_CASES.map((c) => (
            <article key={c.name} className="case">
              <h3>
                {c.name} <span className="case__tag">{c.tag}</span>
              </h3>
              <dl>
                <dt>Pressure</dt>
                <dd>{c.pressure}</dd>
                <dt>Coordination mechanism</dt>
                <dd>{c.mechanism}</dd>
                <dt>Where it breaks down</dt>
                <dd>{c.tension}</dd>
                <dt>Lesson</dt>
                <dd className="case__lesson">{c.lesson}</dd>
              </dl>
            </article>
          ))}
        </div>
        <h3 className="mt-5">Illustrative cases</h3>
        <div className="illustrative">
          {ILLUSTRATIVE.map((c) => (
            <article key={c.name}>
              <h4>{c.name}</h4>
              <p className="case__tag">{c.tag}</p>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="indicators" className="section section--paper">
      <div className="wrap">
        <h2>Indicators</h2>
        <p className="measure">
          A dashboard-ready set that pairs efficiency with absolute resource use, ecosystem condition and governance
          quality, so that rebound effects show up instead of hiding behind efficiency gains.
        </p>
        <table className="indicator-table">
          <thead>
            <tr>
              <th scope="col">Domain</th>
              <th scope="col">Indicators</th>
            </tr>
          </thead>
          <tbody>
            {INDICATORS.map(([d, i]) => (
              <tr key={d}>
                <th scope="row">{d}</th>
                <td>{i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section id="recommendations" className="section">
      <div className="wrap">
        <h2>Recommendations</h2>
        <ol className="recs">
          {RECOMMENDATIONS.map(([t, d]) => (
            <li key={t}>
              <b>{t}.</b> {d}
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section id="next" className="section section--paper">
      <div className="wrap">
        <h2>Next steps</h2>
        <ol className="roadmap">
          {NEXT_STEPS.map(([t, d]) => (
            <li key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 mb-0">
          <Link to="/stakeholders" className="btn-ink">
            Explore the stakeholder map
          </Link>
        </p>
      </div>
    </section>

    <section className="section">
      <div className="wrap measure">
        <h2>Key sources</h2>
        <ul className="refs">
          <li>Pahl-Wostl, C. (2019) Governance of the water-energy-food security nexus: a multi-level coordination challenge. <i>Environmental Science &amp; Policy</i>, 92, 356–367. <a href="https://doi.org/10.1016/j.envsci.2017.07.017" target="_blank" rel="noreferrer">doi</a></li>
          <li>Weitz, N. et al. (2017) Closing the governance gaps in the water-energy-food nexus. <i>Global Environmental Change</i>, 45, 165–173. <a href="https://doi.org/10.1016/j.gloenvcha.2017.06.006" target="_blank" rel="noreferrer">doi</a></li>
          <li>Grafton, R.Q. et al. (2018) The paradox of irrigation efficiency. <i>Science</i>, 361(6404), 748–750. <a href="https://doi.org/10.1126/science.aat9314" target="_blank" rel="noreferrer">doi</a></li>
          <li>OECD (2018) <i>Implementing the OECD Principles on Water Governance: Indicator Framework and Evolving Practices</i>. <a href="https://doi.org/10.1787/9789264292659-en" target="_blank" rel="noreferrer">doi</a></li>
          <li>Toreti, A. et al. (2022) <i>Drought in Europe – August 2022</i>. JRC, EUR 31192 EN. <a href="https://doi.org/10.2760/264241" target="_blank" rel="noreferrer">doi</a></li>
          <li>BMUV (2023) <i>National Water Strategy</i>. <a href="https://www.bundesumweltministerium.de/fileadmin/Daten_BMU/Download_PDF/Binnengewaesser/nationale_wasserstrategie_2023_en_bf.pdf" target="_blank" rel="noreferrer">PDF</a></li>
          <li>MITECO (2025) Irrigation digitalisation grants, first and second calls. <a href="https://www.miteco.gob.es/es/prensa/ultimas-noticias/2025/noviembre/resueltas-la-primera-y-segunda-convocatoria-de-subvenciones-para.html" target="_blank" rel="noreferrer">Press release</a></li>
          <li>Scottish Government (2023) <i>Hydro Nation: Annual Report 2022</i>. <a href="https://www.gov.scot/publications/scotland-hydro-nation-annual-report-2022/" target="_blank" rel="noreferrer">gov.scot</a></li>
        </ul>
      </div>
    </section>
  </div>
);
