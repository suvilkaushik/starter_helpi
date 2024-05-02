import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface toDetailedButtonProps {
  isHomeButtonClicked: boolean;
  setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
  isQuizButtonClicked: boolean;
  setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
}

function ToDetailedButton({
  isQuizButtonClicked,
  setIsQuizButtonClicked,
  isHomeButtonClicked,
  setIsHomeButtonClicked,
}: toDetailedButtonProps) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/Detailed";
    navigate(path);
  };

  function handleQuizButtonClick() {
    setIsHomeButtonClicked(!isHomeButtonClicked);
    setIsQuizButtonClicked(!isQuizButtonClicked);
    routeChange();
  }

  return (
    <Button
      variant="secondary"
      onClick={handleQuizButtonClick}
      style={{
        padding: "20px",
        fontSize: "20px",
        backgroundColor: "#C46967",
        borderColor: "#514242",
        borderWidth: "3px",
        margin: "20px",
      }}
    >
      {" "}
      Detailed Quiz
    </Button>
  );
}

export default ToDetailedButton;
