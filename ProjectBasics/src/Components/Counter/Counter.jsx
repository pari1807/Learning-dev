import  './index.css';
import {useState} from "react";

const Counter = () => {

    const [count,setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }

    const reset = () => {
        setCount(0);
    }

    return (
        <div className = "counter">
            <div>
                <h1 className = "number">{count}</h1>
            </div>

            <div className="btns-container">
                <button onClick ={decrement} className = "btn">-</button>
                <button onClick ={reset} className = "btn reset">Reset</button>
                <button onClick ={increment} className = "btn">+</button>
            </div>
        </div>  
    );
}

export default Counter;

