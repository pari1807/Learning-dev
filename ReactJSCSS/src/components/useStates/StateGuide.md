# React State Management - Complete Guide

## What is State?
State is a built-in React object that holds data that may change over time. When state changes, React re-renders the component to reflect the new data.

---

## 🟢 BASIC LEVEL

### 1. What is useState Hook?
```jsx
import { useState } from 'react';

// useState is a React Hook that lets you add state to functional components
// Syntax: const [stateVariable, setterFunction] = useState(initialValue);
```

### 2. Simple Counter Example
```jsx
function Counter() {
  // Declare a state variable 'count' with initial value 0
  // setCount is the function to update count
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      {/* When button is clicked, count increases by 1 */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      {/* When button is clicked, count decreases by 1 */}
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      {/* Reset count to 0 */}
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
```

### 3. String State Example
```jsx
function NameInput() {
  // State to store user's name
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Hello, {name || "Guest"}!</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={() => setName("")}>
        Clear
      </button>
    </div>
  );
}
```

### 4. Boolean State Example
```jsx
function ToggleSwitch() {
  // State to track if switch is on or off
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h2>Switch is {isOn ? "ON" : "OFF"}</h2>
      <button onClick={() => setIsOn(!isOn)}>
        Toggle Switch
      </button>
      {/* Conditional rendering based on state */}
      {isOn && <p>The light is on! 💡</p>}
    </div>
  );
}
```

---

## 🟡 INTERMEDIATE LEVEL

### 5. Array State Management
```jsx
function TodoList() {
  // State to store array of todos
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Function to add new todo
  const addTodo = () => {
    if (inputValue.trim()) {
      // Use spread operator to create new array (immutability)
      setTodos([...todos, inputValue]);
      setInputValue(""); // Clear input after adding
    }
  };

  // Function to remove todo by index
  const removeTodo = (indexToRemove) => {
    // Filter out the todo at specified index
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h2>Todo List ({todos.length} items)</h2>
      
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 6. Object State Management
```jsx
function UserProfile() {
  // State to store user object
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
    city: ""
  });

  // Function to update specific field in user object
  const updateField = (field, value) => {
    // Use spread operator to maintain immutability
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div>
      <h2>User Profile</h2>
      
      <div>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => updateField('name', e.target.value)}
        />
        
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => updateField('email', e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Age"
          value={user.age}
          onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
        />
        
        <input
          type="text"
          placeholder="City"
          value={user.city}
          onChange={(e) => updateField('city', e.target.value)}
        />
      </div>

      <div>
        <h3>Preview:</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>City: {user.city}</p>
      </div>
    </div>
  );
}
```

### 7. Array of Objects State
```jsx
function StudentGrades() {
  // State to store array of student objects
  const [students, setStudents] = useState([
    { id: 1, name: "John", grade: 85 },
    { id: 2, name: "Jane", grade: 92 },
    { id: 3, name: "Bob", grade: 78 }
  ]);

  // Function to update a student's grade
  const updateGrade = (studentId, newGrade) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, grade: newGrade }
          : student
      )
    );
  };

  // Function to add new student
  const addStudent = () => {
    const newId = Math.max(...students.map(s => s.id)) + 1;
    const newStudent = {
      id: newId,
      name: `Student ${newId}`,
      grade: 0
    };
    setStudents([...students, newStudent]);
  };

  // Function to remove student
  const removeStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  return (
    <div>
      <h2>Student Grades</h2>
      <button onClick={addStudent}>Add Student</button>
      
      {students.map(student => (
        <div key={student.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
          <h3>{student.name}</h3>
          <p>Grade: {student.grade}</p>
          
          <input
            type="number"
            value={student.grade}
            onChange={(e) => updateGrade(student.id, parseInt(e.target.value) || 0)}
            min="0"
            max="100"
          />
          
          <button onClick={() => removeStudent(student.id)}>
            Remove Student
          </button>
        </div>
      ))}
      
      <h3>Class Average: {
        students.length > 0 
          ? (students.reduce((sum, student) => sum + student.grade, 0) / students.length).toFixed(2)
          : 0
      }</h3>
    </div>
  );
}
```

---

## 📝 Important State Rules

### 1. State is Immutable
```jsx
// ❌ Wrong - Mutating state directly
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // This won't trigger re-render

// ✅ Correct - Creating new array
setItems([...items, 4]);
```

### 2. State Updates are Asynchronous
```jsx
function AsyncExample() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // This will log the OLD value
    
    // To use updated value, use useEffect or functional update
    setCount(prevCount => {
      console.log(prevCount + 1); // This logs the NEW value
      return prevCount + 1;
    });
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### 3. Functional Updates
```jsx
function FunctionalUpdate() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Use functional update when new state depends on previous state
    setCount(prevCount => prevCount + 1);
  };

  const incrementMultiple = () => {
    // This ensures each update builds on the previous one
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // count will increase by 3
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementMultiple}>+3</button>
    </div>
  );
}
```

---

## 🎯 Quick Tips

1. **Always use the setter function** to update state
2. **State updates trigger re-renders** - React re-runs your component
3. **Preserve immutability** - don't modify objects/arrays directly
4. **Use functional updates** when new state depends on previous state
5. **Initialize state properly** - use appropriate data types
6. **Keep state minimal** - only store what's necessary for UI

This covers the fundamental concepts of React state management. Practice these patterns to build a solid foundation!