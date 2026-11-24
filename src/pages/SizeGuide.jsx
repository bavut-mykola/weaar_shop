import { useState } from "react";
import "../styles/sizeGuide.scss";
import { translations, translateDisplay } from "../locales/translations";

const sizes = ["S", "M", "L", "XL", "XXL"];
const charts = {
  "T-shirts": {
    columns: ["Chest", "Shoulder", "Length", "Sleeve"],
    rows: [
      [52, 44, 68, 21],
      [54, 46, 70, 22],
      [56, 48, 72, 23],
      [58, 50, 74, 24],
      [60, 52, 76, 25],
    ],
  },
  Hoodies: {
    columns: ["Chest", "Shoulder", "Length", "Sleeve"],
    rows: [
      [56, 48, 68, 62],
      [58, 50, 70, 63],
      [60, 52, 72, 64],
      [62, 54, 74, 65],
      [64, 56, 76, 66],
    ],
  },
  Jackets: {
    columns: ["Chest", "Shoulder", "Length", "Sleeve"],
    rows: [
      [56, 46, 70, 63],
      [58, 48, 72, 64],
      [60, 50, 74, 65],
      [62, 52, 76, 66],
      [64, 54, 78, 67],
    ],
  },
  Pants: {
    columns: ["Waist", "Hip", "Length", "Inseam"],
    rows: [
      [38, 49, 100, 75],
      [40, 51, 102, 76],
      [42, 53, 104, 77],
      [44, 55, 106, 78],
      [46, 57, 108, 79],
    ],
  },
};
const instructions = {
  Chest:
    "Lay a garment flat and measure across the chest, from one underarm to the other.",
  Shoulder: "Measure from one shoulder seam to the other across the back.",
  Length: "Measure from the highest point of the shoulder to the bottom hem.",
  Sleeve: "Measure from the shoulder seam to the end of the sleeve.",
  Waist:
    "Lay pants flat and measure straight across the waistband without stretching it.",
  Hip: "With pants laid flat, measure across the widest part of the hip area.",
  "Pants length":
    "Measure from the top of the waistband to the bottom hem along the outside leg.",
  Inseam:
    "Measure along the inside leg, from the crotch seam to the bottom hem.",
};

function SizeGuide({ language }) {
  const text = translations[language];

  const [category, setCategory] = useState("T-shirts");
  const [unit, setUnit] = useState("cm");
  const chart = charts[category];

  return (
    <article className="size-guide">
      <header className="size-guide__intro">
        <h1>{text.sizeGuide.title}</h1>
        <p>
          {text.sizeGuide.intro}
        </p>
      </header>

      <nav className="size-guide__categories" aria-label={text.sizeGuide.categoryLabel}>
        {Object.keys(charts).map((name) => (
          <button
            key={translateDisplay(name, language)}
            type="button"
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
          >
            {translateDisplay(name, language)}
          </button>
        ))}
      </nav>

      <section
        className="size-guide__chart"
        aria-labelledby="size-chart-heading"
      >
        <div className="size-guide__chart-header">
          <h2 id="size-chart-heading">{text.sizeGuide.chartTitle(translateDisplay(category, language))}</h2>
          <div
            className="size-guide__units"
            role="group"
            aria-label={text.sizeGuide.unitLabel}
          >
            {["cm", "in"].map((value) => (
              <button
                key={translateDisplay(value, language)}
                type="button"
                aria-pressed={unit === value}
                onClick={() => setUnit(value)}
              >
                {translateDisplay(value, language)}
              </button>
            ))}
          </div>
        </div>
        <div
          className="size-guide__table-scroll"
          tabIndex={0}
          role="region"
          aria-label={text.sizeGuide.measurements(
            translateDisplay(category, language),
            unit === "cm" ? text.sizeGuide.centimetres : text.sizeGuide.inches,
          )}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">{text.sizeGuide.size}</th>
                {chart.columns.map((name) => (
                  <th scope="col" key={translateDisplay(name, language)}>
                    {translateDisplay(name, language)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row, index) => (
                <tr key={sizes[index]}>
                  <th scope="row">{sizes[index]}</th>
                  {row.map((value, column) => (
                    <td key={chart.columns[column]}>
                      {unit === "cm" ? value : (value / 2.54).toFixed(1)} {text.sizeGuide[unit]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="size-guide__note">
          {text.sizeGuide.note}
        </p>
      </section>

      <section
        className="size-guide__advice"
        aria-label={text.sizeGuide.adviceLabel}
      >
        <div>
          <h2>{text.sizeGuide.howToMeasure}</h2>
          <dl>
            {chart.columns.map((name) => (
              <div key={translateDisplay(name, language)}>
                <dt>{translateDisplay(name, language)}</dt>
                <dd>
                  {
                    translateDisplay(instructions[
                      category === "Pants" && name === "Length"
                        ? "Pants length"
                        : name
                    ], language)
                  }
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>{text.sizeGuide.betweenSizes}</h2>
          <p>
            {text.sizeGuide.betweenSizesText}
          </p>
          <p>
            {text.sizeGuide.compareText}
          </p>
        </div>
      </section>
    </article>
  );
}

export default SizeGuide;
