import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(() =>data))
  },[])

  const questionsLoop = questions.map((elem) => {
    return(
      <QuestionItem key={elem.id} id={elem.id} prompt={elem.prompt} answers={elem.answers} correctIndex={elem.correctIndex} onAnswerChange={handleAnswerChange} onDelete={handleDelete} />
    )
  });

  function handleAnswerChange(id,correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctIndex})
    })
      .then((response) => response.json())
      .then((updatedAnswer) => {
        const updatedAns = questions.map((ans) => {
          if(ans.id === updatedAnswer.id) return updatedAnswer
          return ans
        });
        setQuestions(updatedAns) 
      })
  }

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updateDelete = questions.filter((questionDelete) => questionDelete.id !==id);
        setQuestions(updateDelete)
      })
  }

  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsLoop}</ul>
    </section>
  );
}

export default QuestionList;
