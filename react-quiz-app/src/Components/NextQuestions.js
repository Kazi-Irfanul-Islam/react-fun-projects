function NextQuestions({ dispatch, answer, index, NumOfQuestions }) {
  if (answer === null) return null;
  if (index < NumOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestions" })}
      >
        Next
      </button>
    );

  if (index === NumOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        {index !== NumOfQuestions - 1 ? "Next" : "Finish"}
      </button>
    );
}

export default NextQuestions;
