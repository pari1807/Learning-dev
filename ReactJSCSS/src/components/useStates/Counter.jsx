import {useState} from "react";

const Counter = () => {
    //Question 1 set Counter
    // const [count, setCount] = useState(0);

    // return(
    //     <div>
    //         <p>You Clicked {count} Times</p>
    //         <button onClick={()=>setCount(count+1)}>Increment</button>
    //         <button onClick= {()=>setCount(count-1)}>Decrement</button>
    //     </div>
    // );

    //Question 2 To do List

    // const [todos,setTodos] = useState([]);
    // const [inputValue, setInputValue] = useState("");

    // const handleSubmit = (e) => {
    //      e.preventDefault();
    //     if(inputValue.trim()){
    //         setTodos([...todos,inputValue]);
    //         setInputValue("");
    //     }
    // };

    // const handleChange=(e)=>{
    //     setInputValue(e.target.value);
    // }

    // return(
    //     <div>
    //         <h1>Todo List</h1>
    //         <form onSubmit={handleSubmit}>
    //             <input type="text" value = {inputValue} onChange={handleChange} placeholder = "Add a new Todo" />
    //             <button type="submit">Add Todo</button>
    //         </form>



    //         <ul>
    //             {todos.map((todo,index) =>((
    //                 <li key = {index}>{todo}</li>
    //             )))}
    //         </ul>
    //     </div>
    // );

    //question 3

    // const [profile,setProfile] = useState({
    //     name: "",
    //     age: "",
    // });
    
    // const handleChange = (e) => {
    //     const {name,value} = e.target;

    //     setProfile((prevProfile) => ({
    //         ...prevProfile,
    //         [name]: value
    //     }));
    // }
    // return(
    //     <div>
    //         <h2>User profile</h2>
    //         <div>
    //             <label> Name: 
    //                 <input type="text" name="name" value={profile.name} onChange = {handleChange} />
    //             </label>
    //         </div>
    //         <div>
    //             <label> Age: 
    //                 <input type="text" name="age" value={profile.age} onChange = {handleChange} />
    //             </label>
    //         </div>

    //         <h3>Profile Information</h3>
    //         <p>Name: {profile.name}</p>
    //         <p>Age: {profile.age}</p>
    //     </div>
    // );

    //q4 Shopping list 
    const [item, setItem] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !quantity) return;

        const newItem = {
            name,
            quantity : parseInt(quantity),
        };

        setItem((prevItem) =>[...prevItem,newItem]);
        setName("");
        setQuantity("");
    };

    return (
        <div>
            <h1>Shopping List</h1>
            <form onSubmit = {handleSubmit}>
                <input type="text" value = {name} placeholder="item Name" onChange = {(e)=>(setName(e.target.value))}/>
                <input type="number" value = {quantity} placeholder="Quantity" onChange = {(e)=>(setQuantity(e.target.value))}/>
                <button type="submit">Add Item</button>
            </form>

            <ul>
                {item.map((item,index) => (
                    <li key = {index}>
                        {item.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Counter;