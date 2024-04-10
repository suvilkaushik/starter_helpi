import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function Basic() {
  const numberOfQuestions = 3;
  const [currentQuestionState, setCurrentQuestion] = useState(0);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<(string | null)[]>(
    Array(numberOfQuestions).fill(null)
  );

  function checkboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newChoices = [...selectedChoices];

    if (newChoices[currentQuestionState] === e.target.id) {
      newChoices[currentQuestionState] = null;
      setQuestionProgress(questionProgress - 1);
    } else {
      if (newChoices[currentQuestionState] === null) {
        setQuestionProgress(questionProgress + 1);
      }
      newChoices[currentQuestionState] = e.target.id;
    }
    setSelectedChoices(newChoices);
  }

  function updateProgress(num: number) {
    setQuestionProgress(questionProgress + 1);
  }

  const questions = [
    <div>
      What is your favorite hobby{" "}
      <div>
        <Form.Check
          type="checkbox"
          name="Choices"
          onChange={checkboxChange}
          id="choice-1"
          label="Choice 1"
          checked={selectedChoices[currentQuestionState] === "choice-1"}
        />
        <Form.Check
          type="checkbox"
          name="Choices"
          onChange={checkboxChange}
          id="choice-2"
          label="Choice 2"
          checked={selectedChoices[currentQuestionState] === "choice-2"}
        />
        <Form.Check
          type="checkbox"
          name="Choices"
          onChange={checkboxChange}
          id="choice-3"
          label="Choice 3"
          checked={selectedChoices[currentQuestionState] === "choice-3"}
        />
      </div>
    </div>,
    <div>
      Question 2{" "}
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-1"
        label="Choice 1"
        checked={selectedChoices[currentQuestionState] === "choice-1"}
      />
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-2"
        label="Choice 2"
        checked={selectedChoices[currentQuestionState] === "choice-2"}
      />
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-3"
        label="Choice 3"
        checked={selectedChoices[currentQuestionState] === "choice-3"}
      />
    </div>,

    <div>
      Question 3{" "}
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-1"
        label="Choice 1"
        checked={selectedChoices[currentQuestionState] === "choice-1"}
      />
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-2"
        label="Choice 2"
        checked={selectedChoices[currentQuestionState] === "choice-2"}
      />
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-3"
        label="Choice 3"
        checked={selectedChoices[currentQuestionState] === "choice-3"}
      />
    </div>,
  ];

  return (
    <div>
      {questions[currentQuestionState]}
      <Button
        onClick={() => {
          setCurrentQuestion(currentQuestionState - 1);
        }}
        disabled={currentQuestionState === 0}
      >
        Previous Question
      </Button>
      <Button
        onClick={() => {
          setCurrentQuestion(currentQuestionState + 1);
        }}
        disabled={currentQuestionState === questions.length - 1}
      >
        Next Question
      </Button>
      <br />
      On Question {currentQuestionState + 1}
      <br /> Questions answered {questionProgress}/{numberOfQuestions}
    </div>
  );
}

export default Basic;
