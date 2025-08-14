// Basic Props Examples - No styling, just pure learning

// 1. BASIC - Simple Props
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 2. BASIC - Multiple Props
function PersonInfo(props) {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Job: {props.job}</p>
    </div>
  );
}

// 3. BASIC - Different Data Types
function DataTypes({ text, number, isTrue, array }) {
  return (
    <div>
      <p>Text: {text}</p>
      <p>Number: {number}</p>
      <p>Boolean: {isTrue ? "True" : "False"}</p>
      <p>Array: {array.join(", ")}</p>
    </div>
  );
}

// 4. MEDIUM - Props with Destructuring
function Product({ name, price, inStock }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
}

// 5. MEDIUM - Default Values
function Welcome({ name = "Guest", greeting = "Hello" }) {
  return <h2>{greeting}, {name}!</h2>;
}

// 6. MEDIUM - Conditional Rendering
function UserStatus({ username, isOnline }) {
  return (
    <div>
      <p>{username}</p>
      {isOnline ? (
        <span>🟢 Online</span>
      ) : (
        <span>🔴 Offline</span>
      )}
    </div>
  );
}

// 7. MEDIUM - Object Props
function StudentCard({ student }) {
  return (
    <div>
      <h3>{student.name}</h3>
      <p>Grade: {student.grade}</p>
      <p>Subject: {student.subject}</p>
    </div>
  );
}

// 8. MEDIUM - Array Props with Map
function FruitList({ fruits }) {
  return (
    <div>
      <h3>Fruits:</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

// Main Demo Component
function PropsLearning() {
  // Sample data
  const studentData = {
    name: "Alice",
    grade: "A+",
    subject: "Mathematics"
  };

  const fruitArray = ["Apple", "Banana", "Orange", "Mango"];
  const colorArray = ["Red", "Blue", "Green"];

  return (
    <div>
      <h1>Learning React Props</h1>
      
      <hr />
      <h2>BASIC EXAMPLES</h2>
      
      {/* Basic Props */}
      <Greeting name="John" />
      <Greeting name="Sarah" />
      
      {/* Multiple Props */}
      <PersonInfo name="Mike" age={25} job="Developer" />
      <PersonInfo name="Lisa" age={30} job="Designer" />
      
      {/* Different Data Types */}
      <DataTypes 
        text="Hello World" 
        number={42} 
        isTrue={true} 
        array={colorArray} 
      />
      
      <hr />
      <h2>MEDIUM EXAMPLES</h2>
      
      {/* Destructured Props */}
      <Product name="Laptop" price={999} inStock={true} />
      <Product name="Mouse" price={25} inStock={false} />
      
      {/* Default Values */}
      <Welcome />
      <Welcome name="Alex" />
      <Welcome name="Emma" greeting="Hi" />
      
      {/* Conditional Rendering */}
      <UserStatus username="user123" isOnline={true} />
      <UserStatus username="user456" isOnline={false} />
      
      {/* Object Props */}
      <StudentCard student={studentData} />
      
      {/* Array Props */}
      <FruitList fruits={fruitArray} />
    </div>
  );
}

export default PropsLearning;