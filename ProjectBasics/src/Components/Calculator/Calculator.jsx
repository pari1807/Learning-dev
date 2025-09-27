import {useState} from "react" ;
import "./index.css";

const Calculator = () => {

    const [inputValue, setInputValue] = useState("");

    const clear = () => {
        setInputValue("");
    };

    const display = (value) => {
        setInputValue(inputValue + value);
    };

    const calculate = () => {
        try {
            const result = Function('"use strict"; return (' + inputValue + ')')();
            setInputValue(result.toString());
        } catch (error) {
            setInputValue("Error");
        }
    };

    const deleteLast = () => {
        setInputValue(inputValue.slice(0, -1));
    };

    return(
        <div className="calculator">
            <input type="text" className="value" value={inputValue} readOnly />

            <span className="clear" onClick={() => clear()}>AC</span>
            <span className="delete" onClick={() => deleteLast()}>⌫</span>
            <span className="operator" onClick={() => display('/')}>/</span>
            <span className="operator" onClick={() => display('*')}>×</span>

            <span className="number" onClick={() => display('7')}>7</span>
            <span className="number" onClick={() => display('8')}>8</span>
            <span className="number" onClick={() => display('9')}>9</span>
            <span className="operator" onClick={() => display('-')}>-</span>

            <span className="number" onClick={() => display('4')}>4</span>
            <span className="number" onClick={() => display('5')}>5</span>
            <span className="number" onClick={() => display('6')}>6</span>
            <span className="operator plus" onClick={() => display('+')}>+</span>

            <span className="number" onClick={() => display('1')}>1</span>
            <span className="number" onClick={() => display('2')}>2</span>
            <span className="number" onClick={() => display('3')}>3</span>
            <span className="equals" onClick={() => calculate()} rowSpan="2">=</span>

            <span className="number zero" onClick={() => display('0')}>0</span>
            <span className="number" onClick={() => display('.')}>.</span>
            
        </div>
    );
};

export default Calculator;