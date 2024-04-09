import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ToDetailedButton from './ToDetailedButton';
import ToBasicButton from './ToBasicButton';


interface toHomeButtonProps {
    isHomeButtonClicked: boolean;
    setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
    children: React.ReactNode;
}

function ToHomeButton({ isHomeButtonClicked, setIsHomeButtonClicked }: toHomeButtonProps) {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/';
        navigate(path);
    }

    function handleHomeButtonClick() {
        setIsHomeButtonClicked(true);
        routeChange();
    };

    return (
        <Button variant = "secondary" onClick = { handleHomeButtonClick } > Home</Button >

    );
};

export default ToHomeButton;