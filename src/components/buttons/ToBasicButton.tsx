import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface toBasicButtonProps {
  isHomeButtonClicked: boolean;
  setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
  isQuizButtonClicked: boolean;
  setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
  keyData: string;
}

function ToBasicButton({
  isQuizButtonClicked,
  setIsQuizButtonClicked,
  isHomeButtonClicked,
  setIsHomeButtonClicked,
  keyData,
}: toBasicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/Basic";
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
      variant="success"
      onClick={handleQuizButtonClick}
      style={{
        padding: "20px",
        fontSize: "20px",
        // backgroundColor: "#8ABAE0",
        borderColor: "#514242",
        borderWidth: "3px",
        margin: "20px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // disabled={keyData === ""} // Add this line to disable the button if isHomeButtonClicked is false
    >
      Basic Quiz
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

export default ToBasicButton;
