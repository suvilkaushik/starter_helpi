import { Button, Form } from "react-bootstrap";
import "../../App.css";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

function Basic() {
  const questionData = [
    {
      questionName: "Question 1",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      questionName: "Question 2",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      questionName: "Question 3",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      questionName: "Question 4",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      questionName: "Question 5",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      questionName: "Question 6",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      questionName: "Question 7",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
  ];

  const numberOfQuestions = questionData.length;
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
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (questionProgress === 7) {
      setIsOpen(true);
    }
  }, [questionProgress]);

  function closeModal() {
    setIsOpen(false);
  }

  const questions = questionData.map((questionInfo, questionIndex) => (
    <div key={questionIndex}>
      <h1>{questionInfo.questionName}</h1>
      <div className="custom-checkbox">
        {questionInfo.choices.map((choice, choiceIndex) => (
          <Form.Check
            key={choiceIndex}
            type="checkbox"
            name="Choices"
            onChange={checkboxChange}
            id={`choice-${choiceIndex}`}
            label={choice}
            checked={
              selectedChoices[currentQuestionState] === `choice-${choiceIndex}`
            }
          />
        ))}
      </div>
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
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%', // adjust width
            height: '20%', // adjust height
          },
          overlay: {
            background: 'transparent', // make overlay background transparent
          },
        }}
    >
  <h2>Quiz Complete</h2>
  <Button onClick={closeModal}>close</Button>
  <div>You have completed this quiz. Submit your answers to get your AI generated results!</div>
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
    </div>
  );
}
export default Basic;
