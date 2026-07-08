(function () {
  "use strict";

  const h = React.createElement;
  const { useMemo, useState, useEffect } = React;

  const YEARS = [2022, 2023, 2024, 2025, 2026];
  const CITY_IDS = ["montreal", "toronto", "ottawa", "vancouver", "calgary", "halifax"];
  const ROLE_IDS = ["ai", "software", "cloud", "cyber"];
  const USD_RATE = 0.73;

  const cityMeta = {
    montreal: { salary: 1.00, demand: 1.00, growth: 0.044 },
    toronto: { salary: 1.13, demand: 1.15, growth: 0.053 },
    ottawa: { salary: 1.06, demand: 1.05, growth: 0.047 },
    vancouver: { salary: 1.10, demand: 1.08, growth: 0.050 },
    calgary: { salary: 1.04, demand: 0.96, growth: 0.058 },
    halifax: { salary: 0.91, demand: 0.82, growth: 0.041 }
  };

  const roleMeta = {
    ai: { salary: 84000, demand: 1.12, salaryGrowth: 0.054 },
    software: { salary: 76000, demand: 1.00, salaryGrowth: 0.041 },
    cloud: { salary: 81000, demand: 1.06, salaryGrowth: 0.048 },
    cyber: { salary: 79500, demand: 1.09, salaryGrowth: 0.051 }
  };

  const copy = {
    en: {
      languageName: "Français",
      htmlLang: "en-CA",
      skip: "Skip to dashboard",
      brandSub: "Bilingual interactive dashboard",
      heroEyebrow: "Synthetic Canadian technology data · 2022–2026",
      heroTitle: "Read the market. Choose your direction.",
      heroLead: "NORTHSTAR explores how early-career technology salaries and opportunity signals vary across six Canadian cities and four role families.",
      syntheticNotice: "Synthetic educational data — not official labour-market statistics. Values are intentionally plausible and are used only to demonstrate visualization and internationalization design.",
      heroMetric1: "6 cities",
      heroMetric1Sub: "regional comparison",
      heroMetric2: "4 roles",
      heroMetric2Sub: "career pathways",
      heroMetric3: "2 charts",
      heroMetric3Sub: "interactive views",
      dashboardTitle: "Canadian tech career outlook",
      dashboardIntro: "Use the controls to compare cities, roles, years, and currencies. Every number and chart label updates in the selected language.",
      updated: "Current view",
      medianSalary: "Average median salary",
      highestCity: "Highest salary city",
      fastestGrowth: "Fastest opportunity growth",
      selectedRole: "Selected role",
      acrossCities: "across six cities",
      selectedYear: "selected year",
      from2022: "from 2022 to 2026",
      chart1Kicker: "Chart 01 · comparison",
      chart1Title: "Median salary by city",
      chart1Description: "A horizontal bar chart compares one role across cities. Bar length supports accurate magnitude comparison; direct labels remove the need for a legend.",
      chart2Kicker: "Chart 02 · change over time",
      chart2Title: "Opportunity index trend",
      chart2Description: "A line chart shows direction and rate of change. The index starts at 100 in 2022, making growth patterns comparable despite different city sizes.",
      role: "Role",
      year: "Year",
      currency: "Currency",
      sort: "Sort",
      highToLow: "High to low",
      alphabetical: "Alphabetical",
      firstCity: "First city",
      secondCity: "Second city",
      chartValue: "Median annual salary",
      opportunityIndex: "Opportunity index (2022 = 100)",
      salaryAxis: "Annual salary",
      cityAxis: "City",
      yearAxis: "Year",
      chart1InsightLead: "Takeaway:",
      chart1Insight: ({ city, value, role, year }) => `${city} leads the selected ${role} view in ${year} at ${value}. Select any bar to inspect that city.`,
      chart2InsightLead: "Takeaway:",
      chart2Insight: ({ cityA, cityB, growthA, growthB }) => `${cityA} grows ${growthA}, compared with ${growthB} for ${cityB} over the five-year period.`,
      fixedRate: "USD uses a fixed demonstration rate",
      sourceLabel: "Data source",
      source: "Synthetic dataset generated for SEG3125 Assignment 5",
      tableTitle: "Accessible data table",
      showTable: "Show table",
      hideTable: "Hide table",
      tableCity: "City",
      tableSalary: "Median salary",
      tableIndex: "Opportunity index",
      methodContext: "Context",
      methodContextText: "Each chart states the question it answers and includes a plain-language takeaway.",
      methodClutter: "Clutter-free",
      methodClutterText: "Quiet gridlines, direct labels, limited ticks, and no decorative chartjunk keep the data dominant.",
      methodContrast: "Contrast",
      methodContrastText: "Teal carries the primary series; gold is reserved for selection and comparison.",
      footerCourse: "SEG3125 · Assignment 5",
      footerPortfolio: "Return to portfolio",
      footerData: "Synthetic data disclosure",
      dashboardScope: "Dashboard scope",
      summaryMetrics: "Summary metrics",
      methodLabel: "Three Cs visualization rationale",
      announce: ({ role, year }) => `Dashboard updated for ${role}, ${year}.`,
      roles: { ai: "AI / Machine Learning", software: "Software Engineering", cloud: "Cloud Engineering", cyber: "Cybersecurity" },
      cities: { montreal: "Montréal", toronto: "Toronto", ottawa: "Ottawa", vancouver: "Vancouver", calgary: "Calgary", halifax: "Halifax" }
    },
    fr: {
      languageName: "English",
      htmlLang: "fr-CA",
      skip: "Aller au tableau de bord",
      brandSub: "Tableau de bord interactif bilingue",
      heroEyebrow: "Données technologiques canadiennes synthétiques · 2022–2026",
      heroTitle: "Comprendre le marché. Choisir sa direction.",
      heroLead: "NORTHSTAR explore la variation des salaires en début de carrière et des signaux d’occasions technologiques dans six villes canadiennes et quatre familles de rôles.",
      syntheticNotice: "Données synthétiques à des fins pédagogiques — il ne s’agit pas de statistiques officielles du marché du travail. Les valeurs sont plausibles et servent uniquement à démontrer la visualisation et l’internationalisation.",
      heroMetric1: "6 villes",
      heroMetric1Sub: "comparaison régionale",
      heroMetric2: "4 rôles",
      heroMetric2Sub: "parcours professionnels",
      heroMetric3: "2 graphiques",
      heroMetric3Sub: "vues interactives",
      dashboardTitle: "Perspectives des carrières technologiques au Canada",
      dashboardIntro: "Utilisez les contrôles pour comparer les villes, les rôles, les années et les devises. Chaque nombre et chaque étiquette se met à jour dans la langue choisie.",
      updated: "Vue actuelle",
      medianSalary: "Salaire médian moyen",
      highestCity: "Ville au salaire le plus élevé",
      fastestGrowth: "Croissance la plus rapide",
      selectedRole: "Rôle sélectionné",
      acrossCities: "dans six villes",
      selectedYear: "année sélectionnée",
      from2022: "de 2022 à 2026",
      chart1Kicker: "Graphique 01 · comparaison",
      chart1Title: "Salaire médian par ville",
      chart1Description: "Un graphique à barres horizontales compare un rôle entre les villes. La longueur des barres facilite la comparaison des valeurs; les étiquettes directes éliminent la légende.",
      chart2Kicker: "Graphique 02 · évolution",
      chart2Title: "Tendance de l’indice d’occasions",
      chart2Description: "Un graphique linéaire montre la direction et le rythme du changement. L’indice commence à 100 en 2022 afin de comparer la croissance malgré les différences de taille des villes.",
      role: "Rôle",
      year: "Année",
      currency: "Devise",
      sort: "Tri",
      highToLow: "Du plus élevé au plus faible",
      alphabetical: "Alphabétique",
      firstCity: "Première ville",
      secondCity: "Deuxième ville",
      chartValue: "Salaire annuel médian",
      opportunityIndex: "Indice d’occasions (2022 = 100)",
      salaryAxis: "Salaire annuel",
      cityAxis: "Ville",
      yearAxis: "Année",
      chart1InsightLead: "À retenir :",
      chart1Insight: ({ city, value, role, year }) => `${city} arrive en tête pour le rôle ${role} en ${year}, avec ${value}. Sélectionnez une barre pour examiner la ville.`,
      chart2InsightLead: "À retenir :",
      chart2Insight: ({ cityA, cityB, growthA, growthB }) => `${cityA} progresse de ${growthA}, comparativement à ${growthB} pour ${cityB} sur cinq ans.`,
      fixedRate: "Le dollar américain utilise un taux de démonstration fixe",
      sourceLabel: "Source des données",
      source: "Jeu de données synthétiques créé pour le devoir 5 de SEG3125",
      tableTitle: "Tableau de données accessible",
      showTable: "Afficher le tableau",
      hideTable: "Masquer le tableau",
      tableCity: "Ville",
      tableSalary: "Salaire médian",
      tableIndex: "Indice d’occasions",
      methodContext: "Contexte",
      methodContextText: "Chaque graphique précise la question traitée et fournit une conclusion en langage simple.",
      methodClutter: "Sans encombrement",
      methodClutterText: "Des lignes discrètes, des étiquettes directes, peu de graduations et aucun élément décoratif inutile donnent la priorité aux données.",
      methodContrast: "Contraste",
      methodContrastText: "Le sarcelle représente la série principale; l’or est réservé à la sélection et à la comparaison.",
      footerCourse: "SEG3125 · Devoir 5",
      footerPortfolio: "Retour au portfolio",
      footerData: "Divulgation des données synthétiques",
      dashboardScope: "Portée du tableau de bord",
      summaryMetrics: "Indicateurs sommaires",
      methodLabel: "Justification des trois C de la visualisation",
      announce: ({ role, year }) => `Tableau de bord mis à jour pour ${role}, ${year}.`,
      roles: { ai: "IA / Apprentissage automatique", software: "Génie logiciel", cloud: "Infonuagique", cyber: "Cybersécurité" },
      cities: { montreal: "Montréal", toronto: "Toronto", ottawa: "Ottawa", vancouver: "Vancouver", calgary: "Calgary", halifax: "Halifax" }
    }
  };

  function generateData() {
    const rows = [];
    ROLE_IDS.forEach((roleId, roleIndex) => {
      CITY_IDS.forEach((cityId, cityIndex) => {
        YEARS.forEach((year) => {
          const yearOffset = year - 2022;
          const role = roleMeta[roleId];
          const city = cityMeta[cityId];
          const variation = 1 + (((roleIndex + 2) * (cityIndex + 3)) % 5 - 2) * 0.004;
          const salary = Math.round((role.salary * city.salary * Math.pow(1 + role.salaryGrowth, yearOffset) * variation) / 100) * 100;
          const growthRate = city.growth + (role.demand - 1) * 0.08 + ((cityIndex + roleIndex) % 3 - 1) * 0.003;
          const opportunityIndex = Math.round(100 * Math.pow(1 + growthRate, yearOffset));
          rows.push({ roleId, cityId, year, salary, opportunityIndex });
        });
      });
    });
    return rows;
  }

  const DATA = generateData();

  function getRow(roleId, cityId, year) {
    return DATA.find((row) => row.roleId === roleId && row.cityId === cityId && row.year === year);
  }

  function formatCurrency(valueCad, currency, locale) {
    const value = currency === "USD" ? valueCad * USD_RATE : valueCad;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(value);
  }

  function formatPercent(value, locale) {
    return new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 }).format(value);
  }

  function SelectControl(props) {
    return h("div", { className: "control" },
      h("label", { htmlFor: props.id }, props.label),
      h("select", {
        id: props.id,
        value: props.value,
        onChange: (event) => props.onChange(event.target.value),
        "aria-label": props.label
      }, props.options.map((option) => h("option", { key: option.value, value: option.value }, option.label)))
    );
  }

  function BarChart(props) {
    const width = 620;
    const height = 370;
    const left = 112;
    const right = 80;
    const top = 28;
    const bottom = 46;
    const innerW = width - left - right;
    const innerH = height - top - bottom;
    const values = props.rows.map((row) => row.salary);
    const maxValue = Math.max.apply(null, values) * 1.08;
    const barH = 32;
    const gap = (innerH - props.rows.length * barH) / Math.max(1, props.rows.length - 1);
    const ticks = [0, .25, .5, .75, 1].map((ratio) => Math.round(maxValue * ratio / 5000) * 5000);

    const children = [];
    ticks.forEach((tick, i) => {
      const x = left + (tick / maxValue) * innerW;
      children.push(h("line", { key: `g${i}`, className: "gridline", x1: x, y1: top, x2: x, y2: height - bottom }));
      children.push(h("text", { key: `t${i}`, x, y: height - 16, textAnchor: "middle" }, props.compactCurrency(tick)));
    });

    props.rows.forEach((row, index) => {
      const y = top + index * (barH + gap);
      const w = (row.salary / maxValue) * innerW;
      const selected = row.cityId === props.selectedCity;
      children.push(h("text", { key: `city${row.cityId}`, className: "axis-label", x: left - 12, y: y + barH / 2 + 4, textAnchor: "end" }, props.cityName(row.cityId)));
      children.push(h("rect", {
        key: `bar${row.cityId}`,
        className: `bar${selected ? " selected" : ""}`,
        x: left,
        y,
        width: Math.max(3, w),
        height: barH,
        rx: 8,
        tabIndex: 0,
        role: "button",
        "aria-label": `${props.cityName(row.cityId)}: ${props.fullCurrency(row.salary)}`,
        onClick: () => props.onSelect(row.cityId),
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            props.onSelect(row.cityId);
          }
        }
      }, h("title", null, `${props.cityName(row.cityId)} — ${props.fullCurrency(row.salary)}`)));
      children.push(h("text", { key: `value${row.cityId}`, className: "axis-label", x: Math.min(width - 8, left + w + 8), y: y + barH / 2 + 4 }, props.fullCurrency(row.salary)));
    });

    children.push(h("text", { key: "axisTitle", className: "axis-label", x: left + innerW / 2, y: height - 1, textAnchor: "middle" }, props.axisLabel));

    return h("svg", {
      className: "chart-svg",
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": props.ariaLabel
    }, children);
  }

  function LineChart(props) {
    const width = 620;
    const height = 370;
    const left = 62;
    const right = 86;
    const top = 35;
    const bottom = 48;
    const innerW = width - left - right;
    const innerH = height - top - bottom;
    const all = props.seriesA.concat(props.seriesB).map((row) => row.opportunityIndex);
    const min = Math.floor((Math.min.apply(null, all) - 4) / 5) * 5;
    const max = Math.ceil((Math.max.apply(null, all) + 4) / 5) * 5;
    const xFor = (year) => left + ((year - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0])) * innerW;
    const yFor = (value) => top + (1 - (value - min) / Math.max(1, max - min)) * innerH;
    const points = (series) => series.map((row) => `${xFor(row.year)},${yFor(row.opportunityIndex)}`).join(" ");
    const ticks = [0, .25, .5, .75, 1].map((ratio) => Math.round(min + (max - min) * ratio));
    const children = [];

    ticks.forEach((tick, i) => {
      const y = yFor(tick);
      children.push(h("line", { key: `grid${i}`, className: "gridline", x1: left, y1: y, x2: width - right, y2: y }));
      children.push(h("text", { key: `tick${i}`, x: left - 10, y: y + 4, textAnchor: "end" }, String(tick)));
    });

    YEARS.forEach((year) => {
      children.push(h("text", { key: `year${year}`, x: xFor(year), y: height - 18, textAnchor: "middle" }, String(year)));
    });

    children.push(h("polyline", { className: "line-path line-a", points: points(props.seriesA) }));
    children.push(h("polyline", { className: "line-path line-b", points: points(props.seriesB) }));

    [
      { series: props.seriesA, cls: "point point-a", city: props.cityA },
      { series: props.seriesB, cls: "point point-b", city: props.cityB }
    ].forEach((group) => {
      group.series.forEach((row) => {
        children.push(h("circle", {
          key: `${group.city}${row.year}`,
          className: group.cls,
          cx: xFor(row.year),
          cy: yFor(row.opportunityIndex),
          r: 5,
          tabIndex: 0,
          "aria-label": `${props.cityName(group.city)}, ${row.year}: ${row.opportunityIndex}`
        }, h("title", null, `${props.cityName(group.city)} — ${row.year}: ${row.opportunityIndex}`)));
      });
    });

    const endA = props.seriesA[props.seriesA.length - 1];
    const endB = props.seriesB[props.seriesB.length - 1];
    children.push(h("text", { className: "direct-label-a", x: xFor(endA.year) + 10, y: yFor(endA.opportunityIndex) + 4 }, props.cityName(props.cityA)));
    children.push(h("text", { className: "direct-label-b", x: xFor(endB.year) + 10, y: yFor(endB.opportunityIndex) + 4 }, props.cityName(props.cityB)));
    children.push(h("text", { className: "axis-label", x: left + innerW / 2, y: height - 1, textAnchor: "middle" }, props.yearAxis));
    children.push(h("text", { className: "axis-label", transform: `translate(16 ${top + innerH / 2}) rotate(-90)`, textAnchor: "middle" }, props.valueAxis));

    return h("svg", { className: "chart-svg", viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": props.ariaLabel }, children);
  }

  class App extends React.Component {
    constructor(props) {
      super(props);
      let savedLanguage = "en";
      try { savedLanguage = localStorage.getItem("northstarLanguage") || "en"; } catch (_) {}
      this.state = {
        language: savedLanguage,
        currency: "CAD",
        barRole: "ai",
        barYear: 2026,
        sortMode: "value",
        selectedCity: "toronto",
        lineRole: "ai",
        cityA: "toronto",
        cityB: "montreal",
        tableOpen: false
      };
      this.switchLanguage = this.switchLanguage.bind(this);
      this.changeCityA = this.changeCityA.bind(this);
      this.changeCityB = this.changeCityB.bind(this);
    }

    componentDidMount() { this.applyLocale(); }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.language !== this.state.language) this.applyLocale();
    }
    applyLocale() {
      const t = copy[this.state.language];
      document.documentElement.lang = t.htmlLang;
      document.title = this.state.language === "fr" ? "NORTHSTAR — Perspectives des carrières technologiques" : "NORTHSTAR — Canadian Tech Career Outlook";
      try { localStorage.setItem("northstarLanguage", this.state.language); } catch (_) {}
    }
    switchLanguage() {
      this.setState((state) => ({ language: state.language === "en" ? "fr" : "en" }));
    }
    changeCityA(next) {
      this.setState((state) => ({
        cityA: next,
        cityB: next === state.cityB ? CITY_IDS.find((id) => id !== next) : state.cityB
      }));
    }
    changeCityB(next) {
      this.setState((state) => ({
        cityB: next,
        cityA: next === state.cityA ? CITY_IDS.find((id) => id !== next) : state.cityA
      }));
    }

    render() {
      const { language, currency, barRole, barYear, sortMode, selectedCity, lineRole, cityA, cityB, tableOpen } = this.state;
      const t = copy[language];
      const locale = t.htmlLang;

      let barRows = CITY_IDS.map((cityId) => getRow(barRole, cityId, Number(barYear)));
      if (sortMode === "alpha") {
        barRows = barRows.slice().sort((a, b) => t.cities[a.cityId].localeCompare(t.cities[b.cityId], locale));
      } else {
        barRows = barRows.slice().sort((a, b) => b.salary - a.salary);
      }

      const seriesA = YEARS.map((year) => getRow(lineRole, cityA, year));
      const seriesB = YEARS.map((year) => getRow(lineRole, cityB, year));
      const averageSalary = Math.round(barRows.reduce((sum, row) => sum + row.salary, 0) / barRows.length / 100) * 100;
      const topRow = barRows.reduce((best, row) => row.salary > best.salary ? row : best, barRows[0]);
      const growthRows = CITY_IDS.map((cityId) => {
        const start = getRow(lineRole, cityId, 2022).opportunityIndex;
        const finish = getRow(lineRole, cityId, 2026).opportunityIndex;
        return { cityId, growth: finish / start - 1 };
      });
      const fastest = growthRows.reduce((best, row) => row.growth > best.growth ? row : best, growthRows[0]);
      const safeSelectedCity = barRows.some((row) => row.cityId === selectedCity) ? selectedCity : barRows[0].cityId;
      const selectedRow = getRow(barRole, safeSelectedCity, Number(barYear));
      const growthA = seriesA[seriesA.length - 1].opportunityIndex / seriesA[0].opportunityIndex - 1;
      const growthB = seriesB[seriesB.length - 1].opportunityIndex / seriesB[0].opportunityIndex - 1;

      const roleOptions = ROLE_IDS.map((id) => ({ value: id, label: t.roles[id] }));
      const cityOptions = CITY_IDS.map((id) => ({ value: id, label: t.cities[id] }));
      const yearOptions = YEARS.map((year) => ({ value: year, label: String(year) }));
      const fullCurrency = (value) => formatCurrency(value, currency, locale);
      const compactCurrency = (value) => new Intl.NumberFormat(locale, {
        style: "currency", currency, notation: "compact", maximumFractionDigits: 0
      }).format(currency === "USD" ? value * USD_RATE : value);
      const tableRows = CITY_IDS.map((cityId) => ({
        cityId,
        salary: getRow(barRole, cityId, Number(barYear)).salary,
        index: getRow(lineRole, cityId, 2026).opportunityIndex
      }));

      return h("div", { className: "app-shell" },
        h("a", { className: "skip-link", href: "#dashboard-main" }, t.skip),
        h("header", { className: "topbar" },
          h("div", { className: "brand" },
            h("div", { className: "brand-mark", "aria-hidden": "true" }, "NS"),
            h("div", { className: "brand-copy" },
              h("div", { className: "brand-title" }, "NORTHSTAR"),
              h("div", { className: "brand-subtitle" }, t.brandSub)
            )
          ),
          h("div", { className: "top-actions" },
            h("button", { className: "pill-button", type: "button", onClick: () => this.setState({ currency: currency === "CAD" ? "USD" : "CAD" }), "aria-label": `${t.currency}: ${currency}` }, currency),
            h("button", { className: "pill-button primary", type: "button", onClick: this.switchLanguage, lang: language === "en" ? "fr" : "en" }, t.languageName)
          )
        ),

        h("section", { className: "hero", "aria-labelledby": "hero-title" },
          h("div", { className: "hero-inner" },
            h("div", null,
              h("p", { className: "eyebrow" }, t.heroEyebrow),
              h("h1", { id: "hero-title" }, t.heroTitle),
              h("p", { className: "hero-lead" }, t.heroLead),
              h("div", { className: "notice" }, h("span", { className: "notice-icon", "aria-hidden": "true" }, "◆"), h("span", null, t.syntheticNotice))
            ),
            h("div", { className: "hero-side", "aria-label": t.dashboardScope },
              h("div", { className: "hero-metric" }, h("strong", null, t.heroMetric1), h("span", null, t.heroMetric1Sub)),
              h("div", { className: "hero-metric" }, h("strong", null, t.heroMetric2), h("span", null, t.heroMetric2Sub)),
              h("div", { className: "hero-metric" }, h("strong", null, t.heroMetric3), h("span", null, t.heroMetric3Sub))
            )
          )
        ),

        h("main", { id: "dashboard-main", className: "dashboard" },
          h("div", { className: "section-intro" },
            h("div", null, h("h2", null, t.dashboardTitle), h("p", null, t.dashboardIntro)),
            h("div", { className: "status-line" }, `${t.updated}: ${t.roles[barRole]} · ${barYear} · ${currency}`)
          ),
          h("div", { className: "sr-only", role: "status", "aria-live": "polite" }, t.announce({ role: t.roles[barRole], year: barYear })),

          h("section", { className: "kpi-grid", "aria-label": t.summaryMetrics },
            h("article", { className: "kpi-card" }, h("div", { className: "kpi-label" }, t.medianSalary), h("div", { className: "kpi-value" }, fullCurrency(averageSalary)), h("div", { className: "kpi-note" }, t.acrossCities)),
            h("article", { className: "kpi-card" }, h("div", { className: "kpi-label" }, t.highestCity), h("div", { className: "kpi-value" }, t.cities[topRow.cityId]), h("div", { className: "kpi-note" }, `${t.selectedYear}: ${barYear}`)),
            h("article", { className: "kpi-card" }, h("div", { className: "kpi-label" }, t.fastestGrowth), h("div", { className: "kpi-value" }, formatPercent(fastest.growth, locale)), h("div", { className: "kpi-note" }, `${t.cities[fastest.cityId]} · ${t.from2022}`)),
            h("article", { className: "kpi-card" }, h("div", { className: "kpi-label" }, t.selectedRole), h("div", { className: "kpi-value" }, t.roles[barRole]), h("div", { className: "kpi-note" }, t.chartValue))
          ),

          h("section", { className: "chart-grid" },
            h("article", { className: "chart-card", "aria-labelledby": "bar-title" },
              h("div", { className: "chart-header" },
                h("div", { className: "chart-kicker" }, t.chart1Kicker),
                h("h3", { id: "bar-title", className: "chart-title" }, t.chart1Title),
                h("p", { className: "chart-description" }, t.chart1Description)
              ),
              h("div", { className: "controls" },
                h(SelectControl, { id: "bar-role", label: t.role, value: barRole, onChange: (value) => this.setState({ barRole: value }), options: roleOptions }),
                h(SelectControl, { id: "bar-year", label: t.year, value: barYear, onChange: (value) => this.setState({ barYear: Number(value) }), options: yearOptions }),
                h("div", { className: "control" },
                  h("label", null, t.sort),
                  h("div", { className: "segmented", role: "group", "aria-label": t.sort },
                    h("button", { type: "button", "aria-pressed": sortMode === "value", onClick: () => this.setState({ sortMode: "value" }) }, t.highToLow),
                    h("button", { type: "button", "aria-pressed": sortMode === "alpha", onClick: () => this.setState({ sortMode: "alpha" }) }, t.alphabetical)
                  )
                )
              ),
              h("div", { className: "chart-wrap" },
                h(BarChart, {
                  rows: barRows,
                  selectedCity: safeSelectedCity,
                  onSelect: (value) => this.setState({ selectedCity: value }),
                  cityName: (id) => t.cities[id],
                  fullCurrency,
                  compactCurrency,
                  axisLabel: `${t.salaryAxis} (${currency})`,
                  ariaLabel: `${t.chart1Title}: ${t.roles[barRole]}, ${barYear}`
                })
              ),
              h("div", { className: "insight" }, h("strong", null, `${t.chart1InsightLead} `), t.chart1Insight({ city: t.cities[selectedRow.cityId], value: fullCurrency(selectedRow.salary), role: t.roles[barRole], year: barYear })),
              h("div", { className: "chart-foot" }, h("span", null, `${t.sourceLabel}: ${t.source}`), h("span", null, `${t.fixedRate}: 1 CAD = ${USD_RATE} USD`))
            ),

            h("article", { className: "chart-card", "aria-labelledby": "line-title" },
              h("div", { className: "chart-header" },
                h("div", { className: "chart-kicker" }, t.chart2Kicker),
                h("h3", { id: "line-title", className: "chart-title" }, t.chart2Title),
                h("p", { className: "chart-description" }, t.chart2Description)
              ),
              h("div", { className: "controls" },
                h(SelectControl, { id: "line-role", label: t.role, value: lineRole, onChange: (value) => this.setState({ lineRole: value }), options: roleOptions }),
                h(SelectControl, { id: "city-a", label: t.firstCity, value: cityA, onChange: this.changeCityA, options: cityOptions }),
                h(SelectControl, { id: "city-b", label: t.secondCity, value: cityB, onChange: this.changeCityB, options: cityOptions })
              ),
              h("div", { className: "chart-wrap" },
                h(LineChart, {
                  seriesA,
                  seriesB,
                  cityA,
                  cityB,
                  cityName: (id) => t.cities[id],
                  yearAxis: t.yearAxis,
                  valueAxis: t.opportunityIndex,
                  ariaLabel: `${t.chart2Title}: ${t.cities[cityA]} and ${t.cities[cityB]}, ${t.roles[lineRole]}`
                })
              ),
              h("div", { className: "insight" }, h("strong", null, `${t.chart2InsightLead} `), t.chart2Insight({ cityA: t.cities[cityA], cityB: t.cities[cityB], growthA: formatPercent(growthA, locale), growthB: formatPercent(growthB, locale) })),
              h("div", { className: "chart-foot" }, h("span", null, `${t.sourceLabel}: ${t.source}`), h("span", null, t.opportunityIndex))
            )
          ),

          h("section", { className: "data-section" },
            h("div", { className: "data-head" },
              h("h3", null, t.tableTitle),
              h("button", { className: "pill-button", type: "button", onClick: () => this.setState({ tableOpen: !tableOpen }), "aria-expanded": tableOpen }, tableOpen ? t.hideTable : t.showTable)
            ),
            tableOpen ? h("div", { className: "table-scroll" },
              h("table", null,
                h("thead", null, h("tr", null, h("th", { scope: "col" }, t.tableCity), h("th", { scope: "col" }, `${t.tableSalary} (${currency})`), h("th", { scope: "col" }, `${t.tableIndex} · 2026`))),
                h("tbody", null, tableRows.map((row) => h("tr", { key: row.cityId }, h("td", null, t.cities[row.cityId]), h("td", null, fullCurrency(row.salary)), h("td", null, String(row.index)))))
              )
            ) : null
          ),

          h("section", { className: "method-strip", "aria-label": t.methodLabel },
            h("article", { className: "method-card" }, h("span", null, "01"), h("strong", null, t.methodContext), h("p", null, t.methodContextText)),
            h("article", { className: "method-card" }, h("span", null, "02"), h("strong", null, t.methodClutter), h("p", null, t.methodClutterText)),
            h("article", { className: "method-card" }, h("span", null, "03"), h("strong", null, t.methodContrast), h("p", null, t.methodContrastText))
          )
        ),

        h("footer", { className: "footer" },
          h("div", { className: "footer-inner" },
            h("span", null, `${t.footerCourse} · Arsany Dematry · 300297626`),
            h("span", null, h("a", { href: "https://famous-beijinho-ce4718.netlify.app/", target: "_blank", rel: "noopener" }, t.footerPortfolio), " · ", t.footerData)
          )
        )
      );
    }
  }

  ReactDOM.render(h(App), document.getElementById("root"));
})();
