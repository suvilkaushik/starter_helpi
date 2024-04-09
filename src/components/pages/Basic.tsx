import { useState } from "react";
import ToHomeButton from "../buttons/ToHomeButton";

function Basic(){
    const [isHomeButtonClicked, setIsHomeButtonClicked] = useState<boolean>(false);

    return <p>
        <ToHomeButton isHomeButtonClicked={isHomeButtonClicked} setIsHomeButtonClicked={setIsHomeButtonClicked}>Home</ToHomeButton>
        detailed
    </p>
}

export default Basic;