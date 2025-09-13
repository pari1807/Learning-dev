import "./index.css";
import {useState} from "react";


const Todo = () => {

    const [todos,setTodos] = useState([]);
    const [inputValue,setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== "") {
            setTodos((todos) => 
                todos.concat({
                    text: inputValue,
                    id: Math.floor(Math.random() * 10000),
                })
            );
            setInputValue("");
        }
    };

    const removeTodo = (id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }


    return (
        <div className = "container">
            <h1 className="title">Todo App</h1>
            
            <form onSubmit={handleSubmit} className="todo-form">
                <input 
                    type="text" 
                    placeholder="Add a new todo" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    className="todo-input"
                />
                <button type="submit" className="add-btn">
                    Add Todo
                </button>
            </form>

             <ul className = "todo-list">
                {todos.map(({text,id}) => (
                    <li className="todo" key = {id}>
                        <span>{text}</span>
                        <button className="close" onClick = {()=>removeTodo(id)}>×</button>
                    </li>
                ))}
             </ul>

        </div>
    );
};

export default Todo;