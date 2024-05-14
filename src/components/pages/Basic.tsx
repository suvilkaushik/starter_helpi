import { Button, Form, Spinner } from "react-bootstrap";
import "../../App.css";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ProgressBar } from "react-bootstrap";
import { generateCareer } from "../../gpt";
import { useNavigate } from "react-router-dom";
// import { generateCareer } from "../../gpt";

function Basic({
  returnValue,
  setReturnValue,
}: {
  returnValue: string;
  setReturnValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const questionData = [
    {
      questionName: "Question 1",
      question: "When faced with a problem, I am most excited about:",
      choices: [
        "Analyzing data and finding patterns",
        "Working with my hands to create solutions",
        "Collaborating with others to brainstorm ideas",
        "Developing new strategies and plans",
      ],
    },
    {
      questionName: "Question 2",
      question: "What gets you out of bed in the morning?",
      choices: [
        "Having a sense of purpose and meaning in my work",
        "The desire to make a positive impact on the world",
        "Spending time with loved ones and pursuing hobbies",
        "The idea of achieving financial security, professional growth, and advancing my career",
      ],
    },
    {
      questionName: "Question 3",
      question: "What type of tasks do you enjoy most?",
      choices: [
        "Solving complex problems and puzzles",
        "Creating art or designing visual elements",
        "Communicating and persuading others",
        "Organizing and managing projects or events",
      ],
    },
    {
      questionName: "Question 4",
      question: "Which subject do you find most interesting or engaging?",
      choices: [
        "Science and technology",
        "Art and design",
        "Social sciences and humanities",
        "Business and management",
      ],
    },
    {
      questionName: "Question 5",
      question: "When working on a team project, you tend to:",
      choices: [
        "Focus on your specific role and responsibilities",
        "Contribute creative ideas and innovative solutions",
        "Foster good communication and cooperation among team members",
        "Take a leadership role and coordinate tasks and timelines",
      ],
    },
    {
      questionName: "Question 6",
      question: "What motivates you the most in your work?",
      choices: [
        "Solving challenging problems and overcoming obstacles",
        "Expressing creativity and making something unique",
        "Helping others and making a positive impact on society",
        "Achieving goals and advancing in your career",
      ],
    },
    {
      questionName: "Question 7",
      question: "Your ideal work-life balance would involve:",
      choices: [
        "Immersing yourself fully in your work, even outside regular hours",
        "Having flexibility to pursue personal interests alongside work",
        "Ensuring time for socializing and spending time with loved ones",
        "Striving for a balanced schedule with dedicated time for work and relaxation",
      ],
    },
  ];

  const numberOfQuestions = questionData.length;
  const [currentQuestionState, setCurrentQuestion] = useState(0);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<(string | null)[]>(
    Array(numberOfQuestions).fill(null)
  );
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  // const [returnValue, setReturnValue] = useState("");

  let navigate = useNavigate();
  async function onSubmission() {
    setIsLoadingAnswer(true);
    const result = generateCareer(
      questionData.map((question) => question.question),
      selectedChoices.filter((choice) => choice !== null) as string[]
    );
    setReturnValue(await result);
    
    let path = "/Results";
    navigate(path);
  }

  function showResults() {
    setQuizFinished(!quizFinished);
  }

  function checkboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newChoices = [...selectedChoices];
    const selectedLabel = e.target.labels
      ? e.target.labels[0].textContent
      : null;

    if (newChoices[currentQuestionState] === selectedLabel) {
      newChoices[currentQuestionState] = null;
      setQuestionProgress(questionProgress - 1);
    } else {
      if (newChoices[currentQuestionState] === null) {
        setQuestionProgress(questionProgress + 1);
      }
      newChoices[currentQuestionState] = selectedLabel;
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
      <h2>{questionInfo.questionName}</h2>
      <h1>{questionInfo.question}</h1>
      <div className="custom-checkbox">
        {questionInfo.choices.map((choice, choiceIndex) => (
          <Form.Check
            key={choiceIndex}
            type="checkbox"
            name="Choices"
            onChange={checkboxChange}
            id={`choice-${choiceIndex}`}
            label={choice}
            checked={selectedChoices[currentQuestionState] === choice}
          />
        ))}
      </div>
    </div>
  ));

  return (
    <div className="questionContainer">
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
      {!quizFinished && questions[currentQuestionState]}
      <br></br>
      {!quizFinished && (
        <>
          <Button
            onClick={() => {
              setCurrentQuestion(currentQuestionState - 1);
            }}
            disabled={currentQuestionState === 0}
            variant="success"
          >
            Previous Question
          </Button>
          <Button
            onClick={() => {
              setCurrentQuestion(currentQuestionState + 1);
            }}
            disabled={currentQuestionState === questions.length - 1}
            variant="success"
          >
            Next Question
          </Button>
        </>
      )}
      {quizFinished &&
        questionData.map((question, index) => (
          <div key={index}>
            {question.questionName}: {question.question}
            <br />
            {"Answer: "}
            {selectedChoices[index] ? selectedChoices[index] : "Not answered"}
          </div>
        ))}
      {/* selectedChoices.map((choice, index) => (
        <div key={index}>{choice ? choice : "Not answered"}</div>
      )) */}
      <br />
      <div>
        <Button onClick={showResults} variant="success">
          {!quizFinished ? "Show Results" : "Go Back to Questions"}
        </Button>
        {quizFinished && (
          <>
            <Button
              onClick={onSubmission}
              disabled={questionProgress === 0}
              variant="success"
            >
              {!isLoadingAnswer ? (
                "Submit"
              ) : (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  // role="status"
                  // aria-hidden="true"
                />
              )}
            </Button>
            {/* <p> {isLoadingAnswer && <Spinner animation="border" />} </p> */}
          </>
        )}
        {/* <p>{returnValue}</p> */}
      </div>
      {!quizFinished &&
        "Questions answered " + questionProgress + "/" + numberOfQuestions}
      <br />
      <div className="progressBar">
        {" "}
        {!quizFinished && (
          <ProgressBar
            now={questionProgress}
            max={numberOfQuestions}
            variant="success"
          />
        )}
      </div>
    </div>
  );
}
export default Basic;
