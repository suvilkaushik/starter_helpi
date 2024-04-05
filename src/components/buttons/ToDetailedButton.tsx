import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Detailed from '../pages/Detailed.tsx';


interface toDetailedButtonProps {
    isQuizButtonClicked: boolean;
    setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
}

function ToDetailedButton({ isQuizButtonClicked, setIsQuizButtonClicked }: toDetailedButtonProps) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/Detailed';
        navigate(path);
    }

    function handleQuizButtonClick() {
        setIsQuizButtonClicked(true);
        routeChange();
    };

    return (
        <Button variant = "secondary" onClick = { handleQuizButtonClick } > Detailed Quiz</Button >

    );
};

export default ToDetailedButton;