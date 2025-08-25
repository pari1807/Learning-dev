// Import useState hook from React - this allows us to add state to functional components
//import { useState, useEffect } from "react";

// Import useState hook from React - this allows us to add state to functional components
// Import useEffect hook - this allows us to perform side effects like localStorage operations
import { useState, useEffect } from "react";

const State = () => {
    // EXAMPLE 1: Simple Counter (Commented out)
    // const [count, setCount] = useState(0);
    // useState(0) creates a state variable 'count' with initial value 0
    // setCount is the function to update the count value
    // return (
    //     <section>
    //         <h1>{count}</h1>  {/* Display current count value */}
    //         <button onClick = {() => setCount(count + 1)}>+</button>  {/* Increment count by 1 */}
    //     </section>
    // );

    // EXAMPLE 2: Array State Management (Commented out)
    // const [friends, setFriends] = useState(["Paritosh","Lipun"]);
    // useState with array - initial state is an array with two friends
    // return (
    //     <section>
    //         {friends.map((f)=>(  // Loop through friends array
    //             <li key = {Math.random()}>{f}</li>  // Display each friend as list item
    //         ))}
    //         {/* Add new friend using spread operator to maintain immutability */}
    //         <button onClick={()=>setFriends([...friends,"New Friend"])}>Add New Friend</button>
    //         {/* Remove specific friend using filter method */}
    //         <button onClick = {()=>setFriends(friends.filter((f)=>f !== "Paritosh"))}>Remove Friend</button>
    //     </section>
    // );

    // EXAMPLE 3: Object State Management (Commented out)
    // const [movie, setMovie] = useState({
    //     title : " Equalizer 3",  // Object property: movie title
    //     ratings: 7,              // Object property: movie rating
    // });
    // return <section>
    //     <h1>{movie.title}</h1>           {/* Display movie title */}
    //     <p>Ratings: {movie.ratings}</p>  {/* Display movie ratings */}
    //     {/* Update object state using spread operator to maintain immutability */}
    //     <button onClick = {()=> setMovie({...movie, ratings: movie.ratings + 1})}>Change Rating</button>
    // </section>

    // EXAMPLE 4: Array of Objects State (Commented out)
    // const [movies,setMovies] = useState([
    //     {id: 1, title: "Equalizer 3", ratings: 7},    // Movie object with id, title, ratings
    //     {id: 2, title: "John Wick 4", ratings: 8},    // Second movie object
    //     {id: 3, title: "Mission Impossible 7", ratings: 9},  // Third movie object
    // ]);
    // return (
    //     <section>
    //         {movies.map(m => (  // Loop through movies array
    //             <li key = {Math.random()}>{m.title} - {m.ratings}</li>  // Display title and rating
    //         ))}
    //         {/* Update specific movie in array using map method */}
    //         <button onClick = { ()=> setMovies(movies.map(m => m.id ===1 ? 
    //             {...m, title: "New Title"} : m  // If id is 1, update title, otherwise keep original
    //         ))}>Change Name</button>
    //     </section>
    // );

    // EXAMPLE 5: Lazy Initial State (Commented out)
    // const [count, setCount] = useState(() => {
    //     const initialCount = 10;  // Calculate initial value
    //     return initialCount;      // Return the calculated value
    // });
    // useState with function - function runs only on first render for performance
    // return (<div>
    //     <h1>Count: {count}</h1>  {/* Display current count */}
    //     {/* Use functional update for better performance and to avoid stale closures */}
    //     <button onClick ={()=> setCount((prevCount) => prevCount + 1)} >Increment</button>
    // </div>
    // );

    // EXAMPLE 6: State with Local Storage (Currently Active)
    // Initialize state with lazy initialization - check localStorage first
    const [name, setName] = useState(() => {
        const savedName = localStorage.getItem("name");  // Get saved name from localStorage
        return savedName ? JSON.parse(savedName) : "";   // Parse JSON or return empty string
    });

    // useEffect hook to save name to localStorage whenever name changes
    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(name));  // Save name to localStorage as JSON
    }, [name]);  // Dependency array - effect runs when 'name' changes

    // Event handler function to handle input changes
    const handleChange = (event) => {
        setName(event.target.value);  // Update name state with input value
    }

    // Event handler function to clear the name
    const handleClear = () => {
        setName("");  // Set name to empty string
    }

    // Return JSX to render the component
    return (
        <div>
            {/* Display current name value */}
            <h1>Your Name: {name}</h1>
            {/* Controlled input - value comes from state, onChange updates state */}
            <input 
                type="text" 
                value={name} 
                onChange={handleChange} 
                placeholder="Enter your Name" 
            />
            {/* Button to clear name - calls handleClear function */}
            <button onClick={handleClear}>Clear Name</button>
        </div>
    );
};

export default State;