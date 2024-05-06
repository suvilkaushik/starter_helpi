import { useEffect, useState } from "react";
import { Button, Form, ProgressBar, Spinner } from "react-bootstrap";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { generateCareer } from "../../gpt";

function Detailed({
  returnValue,
  setReturnValue,
}: {
  returnValue: string;
  setReturnValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const questionData = [
    {
      questionName: "Question 1",
      question:
        "What aspects of your current studies or extracurricular activities excite you the most and why?",
    },
    {
      questionName: "Question 2",
      question:
        "Can you describe a project or activity you've been involved in that you feel particularly proud of and how it relates to your future career aspirations?",
    },
    {
      questionName: "Question 3",
      question:
        "What impact do you envision making in your chosen career path, and why is that important to you?",
    },
    {
      questionName: "Question 4",
      question:
        "How do you see yourself contributing to society through your future career, and what motivates you to pursue that path?",
    },
    {
      questionName: "Question 5",
      question:
        "Can you share a person or experience that has influenced your career aspirations and how it impacted your goals?",
    },
    {
      questionName: "Question 6",
      question:
        "What skills or knowledge do you believe are essential for success in your desired career, and how are you developing those skills?",
    },
    {
      questionName: "Question 7",
      question:
        "How do you anticipate your future career evolving or changing over time, and how do you plan to adapt?",
    },
  ];
  const numberOfQuestions = questionData.length;
  const [currentQuestionState, setCurrentQuestion] = useState(0);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<(string | null)[]>(
    Array(numberOfQuestions).fill(null)
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

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
  const [quizFinished, setQuizFinished] = useState(false);
  function showResults() {
    setQuizFinished(!quizFinished);
  }

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
      <h2>{questionInfo.question}</h2> {/* Display the question here */}
      <Form.Control
        type="text"
        value={selectedChoices[questionIndex] || ""}
        onChange={handleInputChange}
      />
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
      <div>
        {quizFinished &&
          questionData.map((question, index) => (
            <div key={index}>
              {question.questionName}: {question.question}
              <br />
              {"Answer: "}
              {selectedChoices[index] ? selectedChoices[index] : "Not answered"}
            </div>
          ))}

        <Button onClick={showResults} variant="success">
          {!quizFinished ? "Show Results" : "Go Back to Questions"}
        </Button>
        {quizFinished && (
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
        )}

        {/* <p>{returnValue}</p> */}
      </div>
      <br />
      <br /> Questions answered {questionProgress}/{numberOfQuestions}
      <ProgressBar
        now={questionProgress}
        max={numberOfQuestions}
        variant="success"
      />
    </div>
  );
}

export default Detailed;
