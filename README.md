# SEG3125 Assignment 5 — NORTHSTAR Dashboard

## Overview

**NORTHSTAR** is a bilingual interactive dashboard created for **SEG3125 Assignment 5**. It explores a clearly disclosed synthetic dataset about early-career technology salaries and opportunity trends across six Canadian cities and four technology role families.

The project applies concepts from Module 8, including:

* Visualization and chart selection
* The 3Cs: Context, Clutter-free design, and Contrast
* Internationalization and localization
* Bilingual interface design
* Visual and verbal communication
* Usability heuristics
* Accessible interaction design

## View the dashboard

The dashboard is accessible through my SEG3125 portfolio:

**Portfolio:** https://famous-beijinho-ce4718.netlify.app/

To open it:

1. Visit the portfolio using the link above.
2. Scroll to the **Selected work** section.
3. Find **NORTHSTAR Dashboard — Assignment 5**.
4. Select **View dashboard**.

## Dashboard goal

The dashboard helps users compare early-career technology opportunities across Canadian cities. It supports exploration by role, year, city, language, and currency.

The data is **synthetic educational data** created for this assignment. It is not official labour-market data.

## Visualizations

### 1. Median salary by city

A horizontal bar chart compares the selected technology role across six Canadian cities.

Users can:

* Choose a technology role
* Choose a year from 2022 to 2026
* Sort cities by salary or alphabetically
* Select a bar to inspect a city
* Switch between CAD and USD

### 2. Opportunity index trend

A line chart compares opportunity growth between two cities from 2022 to 2026.

Users can:

* Choose a technology role
* Select two cities for comparison
* Compare their five-year trends
* Read a localized summary of the result

## Technology roles

* AI / Machine Learning
* Software Engineering
* Cloud Engineering
* Cybersecurity

## Cities included

* Montréal
* Toronto
* Ottawa
* Vancouver
* Calgary
* Halifax

## Bilingual localization

The interface is available in:

* English
* French

The language control updates:

* Page titles and descriptions
* Chart titles and labels
* Form controls
* Tooltips and summaries
* Data-table headings
* Currency and number formatting
* Accessibility messages

The language selector remains visible in the top-right area and does not use national flags.

## The 3Cs

### Context

Each chart explains the question it answers and includes a plain-language takeaway.

### Clutter-free

The charts use quiet gridlines, direct labels, limited ticks, and no unnecessary decorative elements.

### Contrast

Teal identifies the main data, while gold highlights selections and comparisons.

## Accessibility

The project includes:

* Keyboard-accessible controls
* Visible focus indicators
* A skip link
* Semantic form labels
* ARIA live status feedback
* SVG chart descriptions
* An accessible data table
* Reduced-motion support
* Responsive desktop and mobile layouts

## Technologies used

* HTML5
* CSS3
* JavaScript
* React
* ReactDOM
* SVG
* `Intl.NumberFormat`

## Project structure

```text
├── index.html
├── README.md
├── TEST_RESULTS.md
├── assets/
├── css/
├── evidence/
├── js/
└── vendor/
```

## Author

**Arsany Dematry**
Student number: **300297626**
Course: **SEG3125 — Analysis and Design of User Interfaces**

