import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

function Detailed(){
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
    
      useEffect(() => {
        const answeredQuestions = selectedChoices.filter(choice => choice !== null && choice !== '').length;
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
                value={selectedChoices[questionIndex] || ''} 
                onChange={handleInputChange} 
            />
        </div>
    ));
    
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

export default Detailed;