import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  function handleSetBill(value) {
    if (isNaN(value) && value !== "") {
      alert("Invalid input! Please enter a number.");
      handleReset();
      return;
    }
    setBill(Number(value));
  }

  return (
    <div className="TipCalculator">
      <h2 className="main-title">BILL CALCULATOR</h2>
      <BillInput bill={bill} onSetBill={handleSetBill} />

      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the Service
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the Service?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div className="form-control">
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(e.target.value)}
      ></input>
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div className="form-control">
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied(0%)</option>
        <option value="5">It was Okay(5%)</option>
        <option value="10">It was good(10%)</option>
        <option value="20">Absolutely Amazing!(20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <div className="output-box">
      <div className="output-title">Total Payment Summary</div>
      <div className="output-text">
        <p>
          You pay : <strong>${(bill + tip).toFixed(2)}</strong>
        </p>
        <hr className="divider" />
        <p>
          Bill: <strong>${bill.toFixed(2)}</strong>
          <span className="plus">+</span>
          Tip: <strong>${tip.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
