import { useState } from "react";
import "../styles/sizeGuide.scss";

const sizes = ["S", "M", "L", "XL", "XXL"];
const charts = {
  "T-shirts": { columns: ["Chest", "Shoulder", "Length", "Sleeve"], rows: [[52, 44, 68, 21], [54, 46, 70, 22], [56, 48, 72, 23], [58, 50, 74, 24], [60, 52, 76, 25]] },
  Hoodies: { columns: ["Chest", "Shoulder", "Length", "Sleeve"], rows: [[56, 48, 68, 62], [58, 50, 70, 63], [60, 52, 72, 64], [62, 54, 74, 65], [64, 56, 76, 66]] },
  Jackets: { columns: ["Chest", "Shoulder", "Length", "Sleeve"], rows: [[56, 46, 70, 63], [58, 48, 72, 64], [60, 50, 74, 65], [62, 52, 76, 66], [64, 54, 78, 67]] },
  Pants: { columns: ["Waist", "Hip", "Length", "Inseam"], rows: [[38, 49, 100, 75], [40, 51, 102, 76], [42, 53, 104, 77], [44, 55, 106, 78], [46, 57, 108, 79]] },
};
const instructions = {
  Chest: "Lay a garment flat and measure across the chest, from one underarm to the other.",
  Shoulder: "Measure from one shoulder seam to the other across the back.",
  Length: "Measure from the highest point of the shoulder to the bottom hem.",
  Sleeve: "Measure from the shoulder seam to the end of the sleeve.",
  Waist: "Lay pants flat and measure straight across the waistband without stretching it.",
  Hip: "With pants laid flat, measure across the widest part of the hip area.",
  "Pants length": "Measure from the top of the waistband to the bottom hem along the outside leg.",
  Inseam: "Measure along the inside leg, from the crotch seam to the bottom hem.",
};

function SizeGuide() {
  const [category, setCategory] = useState("T-shirts");
  const [unit, setUnit] = useState("cm");
  const chart = charts[category];

  return (
    <article className="size-guide">
      <header className="size-guide__intro">
        <h1>Size guide</h1>
        <p>Find the right size for a comfortable fit. Use the measurements below to choose your size.</p>
      </header>

      <nav className="size-guide__categories" aria-label="Size chart category">
        {Object.keys(charts).map((name) => (
          <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>
        ))}
      </nav>

      <section className="size-guide__chart" aria-labelledby="size-chart-heading">
        <div className="size-guide__chart-header">
          <h2 id="size-chart-heading">{category} size chart</h2>
          <div className="size-guide__units" role="group" aria-label="Measurement unit">
            {["cm", "in"].map((value) => <button key={value} type="button" aria-pressed={unit === value} onClick={() => setUnit(value)}>{value}</button>)}
          </div>
        </div>
        <div className="size-guide__table-scroll" tabIndex={0} role="region" aria-label={`${category} measurements in ${unit === "cm" ? "centimetres" : "inches"}`}>
          <table>
            <thead><tr><th scope="col">Size</th>{chart.columns.map((name) => <th scope="col" key={name}>{name}</th>)}</tr></thead>
            <tbody>
              {chart.rows.map((row, index) => (
                <tr key={sizes[index]}><th scope="row">{sizes[index]}</th>{row.map((value, column) => <td key={chart.columns[column]}>{unit === "cm" ? value : (value / 2.54).toFixed(1)} {unit}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="size-guide__note">General sizing reference. Measurements are taken with garments laid flat; chest, waist and hip values are widths, not circumferences. Individual fits may vary — check the product details before choosing.</p>
      </section>

      <section className="size-guide__advice" aria-label="Measuring and fit advice">
        <div>
          <h2>How to measure</h2>
          <dl>
            {chart.columns.map((name) => <div key={name}><dt>{name}</dt><dd>{instructions[category === "Pants" && name === "Length" ? "Pants length" : name]}</dd></div>)}
          </dl>
        </div>
        <div>
          <h2>In between sizes?</h2>
          <p>If you’re between two sizes, consider the larger one for a more relaxed and comfortable fit.</p>
          <p>Compare the chart with a similar garment you already enjoy wearing. Think about the fit you prefer and leave room for any layers you plan to wear underneath.</p>
        </div>
      </section>
    </article>
  );
}

export default SizeGuide;
