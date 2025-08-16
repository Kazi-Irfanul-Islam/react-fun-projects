function FinishedScreen({ points, sumOfAllPoints, highscore, dispatch }) {
  const percentage = (points / sumOfAllPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "😍";
  if (percentage >= 80 && percentage < 100) emoji = "👌";
  if (percentage >= 50 && percentage < 80) emoji = "🥹";
  if (percentage > 0 && percentage < 50) emoji = "😒";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji}
        Your Score is <strong>{points}</strong> out of {sumOfAllPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore"> (HighScore : {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
