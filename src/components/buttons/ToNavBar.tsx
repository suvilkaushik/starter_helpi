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
}

function ToNavBar({
  isQuizButtonClicked,
  setIsQuizButtonClicked,
  isHomeButtonClicked,
  setIsHomeButtonClicked,
}: toNavBarProps) {
  let navigate = useNavigate();
  const routeChange = (targetPage: string) => {
    let path = targetPage;
    navigate(path);
  };

  function handleQuizButtonClick(targetPage: string) {
    setIsHomeButtonClicked(false);
    setIsQuizButtonClicked(true);
    routeChange(targetPage);
  }

  function handleHomeButtonClick(targetPage: string) {
    setIsHomeButtonClicked(true);
    setIsQuizButtonClicked(false);
    routeChange(targetPage);
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
            <Nav.Link onClick={() => handleQuizButtonClick("/Basic")}>
              Basic Questions
            </Nav.Link>
            <Nav.Link onClick={() => handleQuizButtonClick("/Detailed")}>
              Detailed Questions
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default ToNavBar;
