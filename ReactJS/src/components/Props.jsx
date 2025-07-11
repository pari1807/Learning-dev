// Basic Props Examples - No hooks or state needed

// 1. Simple Props - Passing a single value
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 2. Multiple Props - Passing several values
function Person(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>City: {props.city}</p>
    </div>
  );
}

// 3. Props with Destructuring (cleaner way)
function Student({ name, grade, subject }) {
  return (
    <div>
      <h3>Student: {name}</h3>
      <p>Grade: {grade}</p>
      <p>Subject: {subject}</p>
    </div>
  );
}

// 4. Boolean Props
function Status({ isOnline, userName }) {
  return (
    <div>
      <p>{userName} is {isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
}

// 5. Number Props
function Price({ item, cost, discount }) {
  return (
    <div>
      <h4>{item}</h4>
      <p>Original Price: ${cost}</p>
      <p>Discount: {discount}%</p>
      <p>Final Price: ${cost - (cost * discount / 100)}</p>
    </div>
  );
}

// Main component to show all examples
function BasicPropsDemo() {
  return (
    <div>
      <h1>Basic Props Examples</h1>
      
      {/* Example 1: Simple Props */}
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      
      {/* Example 2: Multiple Props */}
      <Person name="John Smith" age={25} city="New York" />
      <Person name="Jane Doe" age={30} city="Los Angeles" />
      
      {/* Example 3: Destructured Props */}
      <Student name="Mike" grade="A" subject="Math" />
      <Student name="Sarah" grade="B+" subject="Science" />
      
      {/* Example 4: Boolean Props */}
      <Status isOnline={true} userName="Alex" />
      <Status isOnline={false} userName="Emma" />
      
      {/* Example 5: Number Props */}
      <Price item="Laptop" cost={1000} discount={10} />
      <Price item="Book" cost={50} discount={20} />
    </div>
  );
}

export default BasicPropsDemo;

// How to use these components in App.jsx:
/*
import PropsDemo from './components/Props';

function App() {
  return (
    <div>
      <PropsDemo />
    </div>
  );
}
*/