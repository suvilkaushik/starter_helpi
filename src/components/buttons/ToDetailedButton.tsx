import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface toDetailedButtonProps {
  isHomeButtonClicked: boolean;
  setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
  isQuizButtonClicked: boolean;
  setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
  keyData: string;
}

function ToDetailedButton({
  isQuizButtonClicked,
  setIsQuizButtonClicked,
  isHomeButtonClicked,
  setIsHomeButtonClicked,
  keyData,
}: toDetailedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/Detailed";
    navigate(path);
  };

  function handleQuizButtonClick() {
    if (keyData !== "") {
      setIsHomeButtonClicked(!isHomeButtonClicked);
      setIsQuizButtonClicked(!isQuizButtonClicked);
      routeChange();
    }
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {" "}
      Detailed Quiz
      {isHovered && !keyData && (
        <div
          style={{
            position: "absolute",
            top: "auto%",
            left: "auto",
            // transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            color: "black",
            fontSize: "17px",
          }}
        >
          Make sure to enter an AI API Key before starting!
          {keyData}
        </div>
      )}
    </Button>
  );
}

export default ToDetailedButton;
