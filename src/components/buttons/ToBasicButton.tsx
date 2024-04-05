import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Basic from '../pages/Basic.tsx';

interface toBasicButtonProps {
  isQuizButtonClicked: boolean;
  setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
}

function ToBasicButton ({ isQuizButtonClicked, setIsQuizButtonClicked }: toBasicButtonProps) {
  let navigate = useNavigate();
  const routeChange = () => {
      let path = '/Basic';
      navigate(path);
  }

  function handleQuizButtonClick() {
      setIsQuizButtonClicked(true);
      routeChange();
  };

  return (
      <Button variant = "secondary" onClick = { handleQuizButtonClick } > Basic Quiz</Button >

  );
};

export default ToBasicButton;