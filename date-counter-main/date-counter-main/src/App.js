import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function handleReset() {
    setStep(1);
    setCount(0);
  }
  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        ></input>
        <span> Step : {step}</span>
      </div>
      <div>
        <button onClick={() => setCount((c) => c - step)}> - </button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        ></input>
        <button onClick={() => setCount((c) => c + step)}> + </button>
      </div>
      <div>{count}</div>
      <p>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} ${Math.abs(count) === 1 ? "day" : "days"} from today is `
          : `${Math.abs(count)} ${
              Math.abs(count) === 1 ? "day" : "days"
            } ago was `}
        <span classname="date-display">
          <br />
          <strong>{date.toDateString()}</strong>
        </span>
      </p>
      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}
export default App;
