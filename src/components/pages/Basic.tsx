import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function Basic() {
  const [currentQuestionState, setCurrentQuestion] = useState(0);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  function checkboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (selectedChoice === e.target.id) {
      setSelectedChoice(null);
      setQuestionProgress(questionProgress - 1);
    } else {
      setSelectedChoice(e.target.id);
      if (selectedChoice === null) {
        setQuestionProgress(questionProgress + 1);
      }
    }
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
          checked={selectedChoice === "choice-1"}
        />
        <Form.Check
          type="checkbox"
          name="Choices"
          onChange={checkboxChange}
          id="choice-2"
          label="Choice 2"
          checked={selectedChoice === "choice-2"}
        />
        <Form.Check
          type="checkbox"
          name="Choices"
          onChange={checkboxChange}
          id="choice-3"
          label="Choice 3"
          checked={selectedChoice === "choice-3"}
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
        checked={selectedChoice === "choice-1"}
      />
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-2"
        label="Choice 2"
        checked={selectedChoice === "choice-2"}
      />
      <Form.Check
        type="checkbox"
        name="Choices"
        onChange={checkboxChange}
        id="choice-3"
        label="Choice 3"
        checked={selectedChoice === "choice-3"}
      />
    </div>,

    <div>Question 3 </div>,
  ];
  const answers = [
    <div>Answer 1</div>,
    <div>Answer 2</div>,
    <div>Answer 3</div>,
  ];

  return (
    <div>
      {questions[currentQuestionState]}
      <Button
        onClick={() => {
          setCurrentQuestion((currentQuestionState - 1) % questions.length);
        }}
      >
        Previous Question
      </Button>
      <Button
        onClick={() => {
          setCurrentQuestion((currentQuestionState + 1) % questions.length);
        }}
      >
        Next Question
      </Button>
      {questionProgress}
    </div>
  );
}

export default Basic;
