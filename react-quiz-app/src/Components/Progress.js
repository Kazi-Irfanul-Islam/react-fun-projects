function Progress({ index, NumOfQuestions, points, sumOfAllPoints, answer }) {
  return (
    <header className="progress">
      <progress max={NumOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong> / {NumOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {sumOfAllPoints}
      </p>
    </header>
  );
}

export default Progress;
