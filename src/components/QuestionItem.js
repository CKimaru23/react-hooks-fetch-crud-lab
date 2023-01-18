import React from "react";


function QuestionItem({  id, prompt, answers, correctIndex, onAnswerChange, onDelete }) {
  // const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleAnswerChange(event) {
    onAnswerChange(id, parseInt(event.target.value));
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
