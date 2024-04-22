import { useEffect, useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import Modal from "react-modal";

function Detailed() {
  const questionData = [
    {
      questionName: "Question 1",
    },
    {
      questionName: "Question 2",
    },
    {
      questionName: "Question 3",
    },
    {
      questionName: "Question 4",
    },
    {
      questionName: "Question 5",
    },
    {
      questionName: "Question 6",
    },
    {
      questionName: "Question 7",
    },
  ];
  const numberOfQuestions = questionData.length;
  const [currentQuestionState, setCurrentQuestion] = useState(0);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<(string | null)[]>(
    Array(numberOfQuestions).fill(null)
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (questionProgress === 7) {
      setIsOpen(true);
    }
  }, [questionProgress]);
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    const answeredQuestions = selectedChoices.filter(
      (choice) => choice !== null && choice !== ""
    ).length;
    setQuestionProgress(answeredQuestions);
  }, [selectedChoices]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChoices = [...selectedChoices];
    updatedChoices[currentQuestionState] = event.target.value;
    setSelectedChoices(updatedChoices);
  };
  const questions = questionData.map((questionInfo, questionIndex) => (
    <div key={questionIndex}>
      <h1>{questionInfo.questionName}</h1>
      <Form.Control
        type="text"
        value={selectedChoices[questionIndex] || ""}
        onChange={handleInputChange}
      />
    </div>
  ));
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Quiz Completion Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={false}
        shouldFocusAfterRender={false} // don't focus the modal after render
        shouldReturnFocusAfterClose={false} // don't return focus after close
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "30%", // adjust width
            height: "20%", // adjust height
          },
          overlay: {
            background: "transparent", // make overlay background transparent
          },
        }}
      >
        <h2>Quiz Complete</h2>
        <Button onClick={closeModal}>close</Button>
        <div>
          You have completed this quiz. Submit your answers to get your AI
          generated results!
        </div>
      </Modal>
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
      <ProgressBar now={questionProgress} max={numberOfQuestions} />
    </div>
  );
}

export default Detailed;
