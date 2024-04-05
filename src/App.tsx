import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import { Routes, Route} from "react-router-dom";
import Basic from './components/pages/Basic.tsx';
import Detailed from './components/pages/Detailed.tsx';
import ToDetailedButton from './components/buttons/ToDetailedButton.tsx';
import ToBasicButton from './components/buttons/ToBasicButton.tsx';


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [isQuizButtonClicked, setIsQuizButtonClicked] = useState<boolean>(false);

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


  return (

    <div className="App">
    <Routes>
      <Route path="/Basic" element={<Basic />} />
      <Route path="/Detailed" element={<Detailed />} />

    </Routes>
      
      <div>
      {!isQuizButtonClicked && <ToDetailedButton isQuizButtonClicked={isQuizButtonClicked} setIsQuizButtonClicked={setIsQuizButtonClicked} ></ToDetailedButton>}
      {!isQuizButtonClicked && <ToBasicButton  isQuizButtonClicked={isQuizButtonClicked} setIsQuizButtonClicked={setIsQuizButtonClicked} ></ToBasicButton>}
      {/* {isQuizButtonClicked && <toHomeButton></toHomeButton>} */}
      </div>
      
      



    <Form>
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
