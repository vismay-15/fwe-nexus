// Evidence for the Challenges page and the hotspot map layer.
// Facts checked against the linked sources, October 2026.

export const challenges = [
  {
    "id": "scarcity",
    "title": "Water scarcity",
    "figure": "28%",
    "figureLabel": "of EU land affected by water scarcity in 2023",
    "text": "Water scarcity also affected 32% of the EU population in 2023. Drought and heat put farming, power-plant cooling and river ecosystems under strain at the same time.",
    "source": "EEA, Water scarcity conditions in Europe (2025)",
    "url": "https://www.eea.europa.eu/en/analysis/indicators/use-of-freshwater-resources-in-europe-1",
    "sector": "water"
  },
  {
    "id": "status",
    "title": "Rivers and lakes in poor health",
    "figure": "37%",
    "figureLabel": "of surface waters in good ecological status (2021)",
    "text": "Only 29% reach good chemical status. Pollution from farming, energy and industry limits how much usable water every sector has.",
    "source": "EEA, Europe's state of water 2024",
    "url": "https://www.eea.europa.eu/en/analysis/publications/europes-state-of-water-2024",
    "sector": "ecosystems"
  },
  {
    "id": "competition",
    "title": "Energy and farming draw on the same water",
    "figure": "33% / 31%",
    "figureLabel": "of EU water abstraction for power-plant cooling / agriculture (2020–2023)",
    "text": "The two largest users of abstracted water are energy and food production, so drought and new demand in one sector affect the other.",
    "source": "EEA, Water abstraction by source and economic sector (2025)",
    "url": "https://www.eea.europa.eu/en/analysis/indicators/water-abstraction-by-source-and",
    "sector": "energy"
  },
  {
    "id": "prices",
    "title": "Energy price shocks reach food",
    "figure": "+87%",
    "figureLabel": "EU fertiliser prices, 2022 compared with 2021",
    "text": "Energy and lubricant prices for farms rose 59% over the same period, showing how quickly energy markets pass into food costs.",
    "source": "Eurostat, agricultural input prices, first estimates (12 Jan 2023)",
    "url": "https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20230112-1",
    "sector": "food"
  },
  {
    "id": "rebound",
    "title": "Efficiency is not the same as using less",
    "figure": "23% → 65%",
    "figureLabel": "Spain: irrigated share of cultivated land → its share of crop production value",
    "text": "Irrigation is very productive, so water saved by modern irrigation is often used to irrigate more land. Total use falls only if basin limits are set.",
    "source": "MAPA (Spanish Ministry of Agriculture), 9 Aug 2024",
    "url": "https://www.mapa.gob.es/es/prensa/ultimas-noticias/detalle_noticias/el-ministerio-de-agricultura--pesca-y-alimentaci-n-constata-un-nuevo-aumento-del-regad-o-eficiente-en-el-campo-espa-ol/97967b70-8385-470f-93ee-f2136e905f66",
    "sector": "food"
  },
  {
    "id": "fragmentation",
    "title": "Responsibility is split",
    "figure": "16",
    "figureLabel": "German Länder, each deciding its own water-abstraction charge",
    "text": "Each Land decides whether and how to charge for water abstraction; Bavaria introduced a charge only in 2026. Similar splits between regions, basins and ministries run through every case on this site.",
    "source": "Rödl & Partner, Bayerischer Wassercent beschlossen (30 Jan 2026)",
    "url": "https://www.roedl.com/insights/bayerischer-wassercent-beschlossen/",
    "sector": "climate"
  }
];

export const hotspots = [
  {
    "id": "donana",
    "name": "Doñana National Park",
    "place": "Andalusia, Spain",
    "coords": [
      37.0,
      -6.5
    ],
    "years": "2019–2023",
    "sectors": [
      "water",
      "food",
      "ecosystems"
    ],
    "summary": "Groundwater pumping, much of it from illegal wells serving intensive berry farming, together with supply to a coastal resort, has lowered the aquifer that feeds the Doñana wetlands. In June 2021 the EU Court of Justice found that Spain had breached EU water and habitats law (case C-559/19). In April 2023 the Andalusian parliament backed a bill to extend irrigation around the park, drawing warnings from the European Commission. In November 2023 the national and regional governments agreed a package of about €1.4 billion, including payments to farmers who give up irrigation, and the bill was withdrawn.",
    "gap": "Regional farming policy contradicted national and EU water and nature law, and illegal abstraction went largely unenforced.",
    "sources": [
      {
        "label": "CJEU press release No 113/21, C-559/19 Comisión/España (24 Jun 2021)",
        "url": "https://curia.europa.eu/jcms/upload/docs/application/pdf/2021-06/cp210113es.pdf"
      },
      {
        "label": "AP (via Prince George Citizen), 'Spanish PM, EU slam irrigation plan for drought-hit wetlands' (20 Apr 2023)",
        "url": "https://www.princegeorgecitizen.com/politics/spanish-pm-eu-slam-irrigation-plan-for-drought-hit-wetlands-6882078"
      },
      {
        "label": "The Local Spain, 'Explained: Spain's €1.4B plan to save endangered Doñana wetlands' (29 Nov 2023)",
        "url": "https://www.thelocal.es/20231129/explained-spains-e1-4b-plan-to-save-endangered-donana-wetlands"
      }
    ]
  },
  {
    "id": "mar-menor",
    "name": "Mar Menor lagoon",
    "place": "Murcia, Spain",
    "coords": [
      37.7167,
      -0.8
    ],
    "years": "2016–2024",
    "sectors": [
      "water",
      "food",
      "ecosystems"
    ],
    "summary": "Nutrient run-off from intensive irrigated farming in the Campo de Cartagena caused eutrophication and oxygen collapse in Europe's largest saltwater coastal lagoon, with mass fish die-offs in 2019 and 2021. After a citizens' legislative initiative, Spain passed Ley 19/2022, recognising the lagoon and its basin as a legal person. The Constitutional Court upheld the law in November 2024.",
    "gap": "Diffuse farm pollution and unlicensed irrigation went uncontrolled across split regional and basin responsibilities.",
    "sources": [
      {
        "label": "BOE, Ley 19/2022, de 30 de septiembre (BOE-A-2022-16019, published 3 Oct 2022)",
        "url": "https://www.boe.es/eli/es/l/2022/09/30/19"
      },
      {
        "label": "The Local Spain, 'Five stats to understand why Spain's Mar Menor is full of dead fish' (24 Aug 2021)",
        "url": "https://www.thelocal.es/20210824/five-stats-to-understand-why-spains-mar-menor-is-full-of-dead-fish"
      },
      {
        "label": "Ramsar RIS 706 (coordinates)",
        "url": "https://rsis.ramsar.org/ris/706"
      }
    ]
  },
  {
    "id": "grunheide",
    "name": "Grünheide gigafactory",
    "place": "Brandenburg, Germany",
    "coords": [
      52.417,
      13.817
    ],
    "years": "2020–2024",
    "sectors": [
      "water",
      "energy"
    ],
    "summary": "The Tesla electric-vehicle and battery plant at Grünheide draws on a regional water association in a drought-prone area, and parts of the site lie in drinking-water protection zones. In March 2022 the Administrative Court of Frankfurt (Oder) ruled that a permit increasing the association's groundwater abstraction was unlawful, because the public had not been involved. In 2023 the state environment agency said expansion plans had to be revised because of water protection zones.",
    "gap": "Fast-tracked permits for energy-transition industry outpaced public participation and groundwater planning.",
    "sources": [
      {
        "label": "beck-aktuell, 'Probleme für Teslas \"Gigafactory\" durch Wasser-Urteil?' (7 Mar 2022)",
        "url": "https://www.beck-aktuell.de/heute-im-recht/rechtsprechung/probleme-fuer-teslas-gigafactory-durch-wasser-urteil-2022-03-07"
      },
      {
        "label": "ZfK, 'Trinkwasser-Förderung: Gericht gibt Tesla-Kritikern teilweise Recht' (6 Mar 2022)",
        "url": "https://www.zfk.de/wasser-abwasser/wasser/trinkwasser-foerderung-gericht-gibt-tesla-kritikern-teilweise-recht"
      },
      {
        "label": "Clean Energy Wire, expansion setback over water protection (26 Jul 2023)",
        "url": "https://cleanenergywire.org/news/teslas-german-gigafactory-expansion-plans-face-setback-over-water-protection-concerns-media"
      }
    ]
  },
  {
    "id": "tagus-segura",
    "name": "Tagus–Segura water transfer",
    "place": "Aranjuez, Spain (Tagus flows)",
    "coords": [
      40.0333,
      -3.6028
    ],
    "years": "1979–2026",
    "sectors": [
      "water",
      "food",
      "ecosystems"
    ],
    "summary": "An aqueduct moves water from the headwaters of the Tagus to irrigated farming and towns in the Segura basin in the south-east. Basin plans approved in 2023 (Real Decreto 35/2023) set rising ecological flows for the Tagus, reaching 8.65 m³/s at Aranjuez by 2027, which may reduce the water available for transfer. Regions and irrigators appealed, and Spain's Supreme Court has dismissed the appeals, most recently in May 2026.",
    "gap": "Water is shared between basins through politics and the courts, setting river health in one basin against farming in another.",
    "sources": [
      {
        "label": "BOE, Real Decreto 35/2023, de 24 de enero",
        "url": "https://www.boe.es/eli/es/rd/2023/01/24/35"
      },
      {
        "label": "elDiario.es, Tajo ecological flow made official in BOE (10 Feb 2023)",
        "url": "https://www.eldiario.es/castilla-la-mancha/garantia-caudal-ecologico-tajo-oficial-dilatada-publicacion-boe_1_9941302.html"
      },
      {
        "label": "iAgua, Supreme Court rejects Murcia appeal and backs Tajo ecological flows (28 Oct 2025)",
        "url": "https://www.iagua.es/noticias/redaccion-iagua/supremo-desestima-recurso-murcia-y-respalda-caudales-ecologicos-tajo"
      },
      {
        "label": "Tribunal Supremo, STS 596/2026 (13 May 2026), SCRATS appeal dismissed (PDF via CMM)",
        "url": "https://www.cmmedia.es/uploads/files/2026/05/21/sentencia%20desestima%20recurso%20Sindicato%20Centrral%20Regantes%20Acueducto%20Tajo-Segura-1.pdf"
      }
    ]
  },
  {
    "id": "sainte-soline",
    "name": "Sainte-Soline reservoirs",
    "place": "Deux-Sèvres, France",
    "coords": [
      46.2472,
      0.0369
    ],
    "years": "2021–2024",
    "sectors": [
      "water",
      "food",
      "ecosystems"
    ],
    "summary": "A farmers' cooperative plans 16 large reservoirs, filled by pumping groundwater in winter for summer irrigation. Opponents see this as taking a shared resource; supporters see it as essential for farming. A protest in March 2023 led to serious injuries. In December 2024 the Bordeaux administrative court of appeal found the authorisation illegal for four reservoirs, including Sainte-Soline, because it lacked a derogation for a protected bird, the little bustard.",
    "gap": "Groundwater for irrigation was allocated without adequate environmental safeguards or local agreement, leaving courts and protests to settle it.",
    "sources": [
      {
        "label": "Euronews, 'Violent clashes between police and protesters at French anti-reservoir protest' (27 Mar 2023)",
        "url": "https://www.euronews.com/green/2023/03/27/violent-clashes-between-police-and-protesters-at-french-anti-reservoir-protest"
      },
      {
        "label": "Réussir, 'Sainte-Soline et trois réserves d'eau jugées illégales en l'absence de dérogation' (19 Dec 2024)",
        "url": "https://www.reussir.fr/irrigation-agricole-sainte-soline-et-trois-reserves-deau-jugees-illegales-en-labsence-de-derogation"
      },
      {
        "label": "Pleinchamp, 'Sainte-Soline et trois autres réserves jugées illégales'",
        "url": "https://www.pleinchamp.com/actualite/sainte-soline-et-trois-autres-reserves-jugees-illegales"
      }
    ]
  }
];

// Eurostat nrg_ind_ren (REN, %), data updated 15 Sep 2026. UK and Switzerland not covered.
export const renewables = [
  {
    "code": "EU27_2020",
    "name": "EU-27",
    "y2013": 16.7,
    "y2024": 25.2
  },
  {
    "code": "NL",
    "name": "Netherlands",
    "y2013": 4.7,
    "y2024": 20.2
  },
  {
    "code": "ES",
    "name": "Spain",
    "y2013": 15.1,
    "y2024": 25.4
  },
  {
    "code": "AT",
    "name": "Austria",
    "y2013": 32.7,
    "y2024": 43.0
  },
  {
    "code": "DE",
    "name": "Germany",
    "y2013": 13.8,
    "y2024": 22.5
  },
  {
    "code": "SE",
    "name": "Sweden",
    "y2013": 50.2,
    "y2024": 62.8
  },
  {
    "code": "IT",
    "name": "Italy",
    "y2013": 16.7,
    "y2024": 19.4
  },
  {
    "code": "NO",
    "name": "Norway",
    "y2013": 66.5,
    "y2024": 77.9
  },
  {
    "code": "EL",
    "name": "Greece",
    "y2013": 15.3,
    "y2024": 25.4
  },
  {
    "code": "IE",
    "name": "Ireland",
    "y2013": 7.5,
    "y2024": 16.1
  },
  {
    "code": "FI",
    "name": "Finland",
    "y2013": 36.6,
    "y2024": 52.1
  },
  {
    "code": "PL",
    "name": "Poland",
    "y2013": 11.5,
    "y2024": 17.8
  }
];

// Eurostat sdg_06_60, WEI+ annual (%), source EEA; data updated 28 Apr 2026. CH values estimated; UK not covered.
export const wei = [
  {
    "code": "EU27_2020",
    "name": "EU-27",
    "y2022": 6.8,
    "y2023": 5.2,
    "estimated": false
  },
  {
    "code": "NL",
    "name": "Netherlands",
    "y2022": 4.0,
    "y2023": 2.8,
    "estimated": false
  },
  {
    "code": "CH",
    "name": "Switzerland",
    "y2022": 0.8,
    "y2023": 0.7,
    "estimated": true
  },
  {
    "code": "ES",
    "name": "Spain",
    "y2022": 8.8,
    "y2023": 7.1,
    "estimated": false
  },
  {
    "code": "AT",
    "name": "Austria",
    "y2022": 2.3,
    "y2023": 1.7,
    "estimated": false
  },
  {
    "code": "DE",
    "name": "Germany",
    "y2022": 4.6,
    "y2023": 3.4,
    "estimated": false
  },
  {
    "code": "SE",
    "name": "Sweden",
    "y2022": 0.3,
    "y2023": 0.2,
    "estimated": false
  },
  {
    "code": "IT",
    "name": "Italy",
    "y2022": 15.6,
    "y2023": 10.0,
    "estimated": false
  },
  {
    "code": "NO",
    "name": "Norway",
    "y2022": 0.2,
    "y2023": 0.2,
    "estimated": false
  },
  {
    "code": "EL",
    "name": "Greece",
    "y2022": 14.0,
    "y2023": 13.2,
    "estimated": false
  },
  {
    "code": "IE",
    "name": "Ireland",
    "y2022": 1.1,
    "y2023": 1.0,
    "estimated": false
  },
  {
    "code": "FI",
    "name": "Finland",
    "y2022": 0.6,
    "y2023": 0.5,
    "estimated": false
  },
  {
    "code": "PL",
    "name": "Poland",
    "y2022": 6.3,
    "y2023": 5.2,
    "estimated": false
  }
];
