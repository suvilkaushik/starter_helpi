import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import ToBasicButton from "./ToBasicButton";
// import ToHomeButton from "./ToHomeButton";
// import ToDetailedButton from "./ToDetailedButton";
import { useNavigate } from "react-router-dom";

interface toNavBarProps {
  isHomeButtonClicked: boolean;
  setIsHomeButtonClicked: (isHomeButtonClicked: boolean) => void;
  isQuizButtonClicked: boolean;
  setIsQuizButtonClicked: (isQuizButtonClicked: boolean) => void;
  keyData: string;
}

function ToNavBar({
  isQuizButtonClicked,
  setIsQuizButtonClicked,
  isHomeButtonClicked,
  setIsHomeButtonClicked,
  keyData,
}: toNavBarProps) {
  const [isHovered, setIsHovered] = useState(false);
  let navigate = useNavigate();
  const routeChange = (targetPage: string) => {
    let path = targetPage;
    navigate(path);
  };

  function handleQuizButtonClick(targetPage: string) {
    if (keyData !== "") {
      setIsHomeButtonClicked(false);
      setIsQuizButtonClicked(true);
      routeChange(targetPage);
    }
  }

  function handleHomeButtonClick(targetPage: string) {
    if (keyData !== "") {
      setIsHomeButtonClicked(true);
      setIsQuizButtonClicked(false);
      routeChange(targetPage);
    }
  }

  return (
    <div>
      <Navbar className="Navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              fontFamily: "Papyrus, sans-serif",
            }}
            onClick={() => handleHomeButtonClick("./starter_helpi")}
          >
            Job Journey
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleHomeButtonClick("/starter_helpi")}>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => handleQuizButtonClick("/Basic")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Basic Questions
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
            </Nav.Link>
            <Nav.Link
              onClick={() => handleQuizButtonClick("/Detailed")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Detailed Questions
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
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default ToNavBar;
