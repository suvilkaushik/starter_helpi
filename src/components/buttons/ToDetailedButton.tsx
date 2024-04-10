import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Routes, useNavigate } from 'react-router-dom';


interface toDetailedButtonProps {
    isHomeButtonClicked: boolean;
    setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
    isQuizButtonClicked: boolean;
    setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
}

function ToDetailedButton({ isHomeButtonClicked, setIsHomeButtonClicked, isQuizButtonClicked, setIsQuizButtonClicked }: toDetailedButtonProps) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/Detailed';
        navigate(path);
    }

    function handleQuizButtonClick() {
        setIsQuizButtonClicked(!isQuizButtonClicked);
        setIsHomeButtonClicked(!isHomeButtonClicked);
        routeChange();
    };
  


    return (
        <div>
            <Button variant="secondary" onClick={handleQuizButtonClick}>Detailed Quiz</Button>
        </div>
    );
};

export default ToDetailedButton;