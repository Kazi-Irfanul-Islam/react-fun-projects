import { useEffect, useState } from "react";
import "./index.css";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  // ✅ FIX: Changed initial state to allow for an empty input
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("EUR");
  const [toCurr, setToCurr] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedAmount = useDebounce(amount, 500);

  function handleSwap() {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  }

  // ✅ FIX: A clearer, more robust handler for the amount change
  function handleAmountChange(e) {
    const value = e.target.value;
    // Allow the input to be empty, but only set the state to a valid number
    if (value === "") {
      setAmount("");
    } else {
      // Converting to a number automatically removes leading zeros (e.g., Number("05") becomes 5)
      setAmount(Number(value));
    }
  }

  useEffect(() => {
    if (!debouncedAmount || debouncedAmount <= 0) {
      setConverted("");
      return;
    }

    if (fromCurr === toCurr) {
      setConverted(debouncedAmount);
      return;
    }

    const controller = new AbortController();

    async function convert() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${debouncedAmount}&from=${fromCurr}&to=${toCurr}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Conversion failed.");

        const data = await res.json();
        if (data.rates && data.rates[toCurr]) {
          setConverted(data.rates[toCurr]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    convert();

    return () => {
      controller.abort();
    };
  }, [debouncedAmount, fromCurr, toCurr]);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Currency Converter</h1>

        <div className="converter-grid">
          {/* From Column */}
          <div className="converter-col">
            <select
              value={fromCurr}
              onChange={(e) => setFromCurr(e.target.value)}
              disabled={isLoading}
              className="dropdown"
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - US Dollar</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
            <input
              type="number"
              value={amount}
              // ✅ FIX: Use the new handler function
              onChange={handleAmountChange}
              disabled={isLoading}
              className="input"
              placeholder="Enter amount"
            />
          </div>

          {/* Swap Button */}
          <div className="swap-col">
            <button
              onClick={handleSwap}
              className="arrow-btn"
              aria-label="Swap currencies"
            >
              &#8646;
            </button>
          </div>

          {/* To Column */}
          <div className="converter-col">
            <select
              value={toCurr}
              onChange={(e) => setToCurr(e.target.value)}
              disabled={isLoading}
              className="dropdown"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
            <div className="result">
              {isLoading ? "..." : converted || "0.00"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
