import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Basic from "./components/pages/Basic.tsx";
import Detailed from "./components/pages/Detailed.tsx";
import ToDetailedButton from "./components/buttons/ToDetailedButton.tsx";
import ToBasicButton from "./components/buttons/ToBasicButton.tsx";
import ToHomeButton from "./components/buttons/ToHomeButton.tsx";
import ToNavBar from "./components/buttons/ToNavBar";

import { generateCareer } from "./gpt.tsx";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [isQuizButtonClicked, setIsQuizButtonClicked] =
    useState<boolean>(false);
  const [isHomeButtonClicked, setIsHomeButtonClicked] = useState<boolean>(true);

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  React.useEffect(() => {
    async function fetchCareer() {
      const result = await generateCareer(["TEST"], ["TEST"]);
      console.log(result);
    }

    fetchCareer();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="App">
      <ToNavBar
        isQuizButtonClicked={isQuizButtonClicked}
        setIsQuizButtonClicked={setIsQuizButtonClicked}
        isHomeButtonClicked={isHomeButtonClicked}
        setIsHomeButtonClicked={setIsHomeButtonClicked}
      ></ToNavBar>
      <div className="quizButtonContainer">
        {!isHomeButtonClicked && (
          <ToHomeButton
            isQuizButtonClicked={isQuizButtonClicked}
            setIsQuizButtonClicked={setIsQuizButtonClicked}
            isHomeButtonClicked={isHomeButtonClicked}
            setIsHomeButtonClicked={setIsHomeButtonClicked}
          ></ToHomeButton>
        )}
        {!isQuizButtonClicked && (
          <div className="quizContainer">
            <h1 style={{ color: '#8ABAE0' }}>Go to Basic Questions</h1>
            <p>
              Designed to help you explore various career options based on your
              interests, skills, and personality traits. The quiz consists of
              multiple-choice questions with straightforward options related to
              different fields and professions. The goal is to provide you with
              a general idea of potential career paths that align with your
              preferences.
            </p>
            <ToBasicButton
              isQuizButtonClicked={isQuizButtonClicked}
              setIsQuizButtonClicked={setIsQuizButtonClicked}
              isHomeButtonClicked={isHomeButtonClicked}
              setIsHomeButtonClicked={setIsHomeButtonClicked}
            ></ToBasicButton>
          </div>
        )}
        {!isQuizButtonClicked && (
          <div className="quizContainer">
            <h1 style={{ color: '#C46967', fontWeight:"bolder" }}>Go to Detailed Questions</h1>
            <p>
              Evaluates your interests, strengths, values, skills, and career
              goals. It includes a combination of multiple-choice, open-ended,
              and situational questions to provide a thorough analysis of your
              suitability for various professions. The quiz also considers
              factors such as work-life balance, salary expectations, and career
              growth opportunities.
            </p>
            <ToDetailedButton
              isQuizButtonClicked={isQuizButtonClicked}
              setIsQuizButtonClicked={setIsQuizButtonClicked}
              isHomeButtonClicked={isHomeButtonClicked}
              setIsHomeButtonClicked={setIsHomeButtonClicked}
            ></ToDetailedButton>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/Basic" element={<Basic />} />
        <Route path="/Detailed" element={<Detailed />} />
      </Routes>
      <Form className="api_input">
        <Form.Label>API Key:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Insert API Key Here"
          onChange={changeKey}
        />
        <br />
        <Button className="Submit-Button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
