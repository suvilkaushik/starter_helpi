import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


interface toHomeButtonProps {
    isHomeButtonClicked: boolean;
    setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
    isQuizButtonClicked: boolean;
    setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
}

function ToHomeButton({ isHomeButtonClicked, setIsHomeButtonClicked, isQuizButtonClicked, setIsQuizButtonClicked }: toHomeButtonProps) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/';
        navigate(path);
    }

    function handleHomeButtonClick() {
        setIsQuizButtonClicked(!isQuizButtonClicked);
        setIsHomeButtonClicked(!isHomeButtonClicked);
        routeChange();
    };

    return (
        <Button variant = "secondary" onClick = { handleHomeButtonClick}>Home</Button >

    );
};

export default ToHomeButton;