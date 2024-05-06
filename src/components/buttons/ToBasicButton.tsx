import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface toBasicButtonProps {
  isHomeButtonClicked: boolean;
  setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
  isQuizButtonClicked: boolean;
  setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
}

function ToBasicButton ({ isQuizButtonClicked, setIsQuizButtonClicked, isHomeButtonClicked, setIsHomeButtonClicked }: toBasicButtonProps) {
  let navigate = useNavigate();
  const routeChange = () => {
      let path = '/Basic';
      navigate(path);
  }

  function handleQuizButtonClick() {
    setIsHomeButtonClicked(!isHomeButtonClicked);
    setIsQuizButtonClicked(!isQuizButtonClicked);
  routeChange();
  };

  return (
    <Button 
    variant="success" 
    onClick={handleQuizButtonClick} 
    style={{ 
      padding: '20px', 
      fontSize: '20px',
      // backgroundColor: "#8ABAE0",
      borderColor: "#514242",
      borderWidth: "3px",
      margin: "20px",
    }}
  >
    Basic Quiz
  </Button>

  );
};

export default ToBasicButton;