import "./Toggle.css";

import {useState} from "react";

const Toggle = () => {

    const [backGroundColor,setbackGroundColor] = useState("white");
    const [textColor, settextColor] = useState("#1b1b1b");
    const [buttonStyle, setbuttonStyle] = useState("white");


    const handleClick = () => {
        setbackGroundColor(backGroundColor == "white" ? "#1b1b1b" : "white");
        settextColor(textColor == "#1b1b1b" ? "#ffa31a" : "#1b1b1b");
        setbuttonStyle(buttonStyle == "white" ? "#1b1b1b" : "white");
    }

    return (
        <div style = {{backGroundColor, color: textColor}}> 
            <button
            onClick = {handleClick}
            style = {{buttonStyle, color: textColor, border: `2px solid ${textColor}`}}
            >
                {backGroundColor == "#1b1b1b" ? "Light Mode" : "Dark Mode"}
            </button>


            <section>
                <h1>This is a Toggle Background Component</h1>
            </section>
        </div>
    );
};

export default Toggle;