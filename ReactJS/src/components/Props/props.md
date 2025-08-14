# React Props (Properties) - Complete Guide

## What are Props?
--> Props / Properties are arguments passed into react components
--> Props allows us to pass data from a **parent component** to a **child component** (Note: corrected direction)
--> Props are **read-only** - they cannot be modified by the child component
--> Props make components reusable and dynamic

---

## 🟢 BASIC LEVEL

### 1. Simple Props Example
```jsx
// Child Component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Parent Component
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
// Output: Hello, Alice! and Hello, Bob!
```

### 2. Multiple Props
```jsx
function UserInfo(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

// Usage
<UserInfo name="John" age={25} email="john@email.com" />
```

### 3. Props with Different Data Types
```jsx
function Example(props) {
  return (
    <div>
      <p>String: {props.text}</p>
      <p>Number: {props.count}</p>
      <p>Boolean: {props.isActive ? 'Yes' : 'No'}</p>
    </div>
  );
}

// Usage
<Example text="Hello" count={42} isActive={true} />
```

---

## 🟡 MEDIUM LEVEL

### 4. Props Destructuring (Cleaner Syntax)
```jsx
// Instead of props.name, props.age
function User({ name, age, city }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}
```

### 5. Default Props
```jsx
function Button({ text = "Click Me", color = "blue" }) {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}

// Usage
<Button />                          // Uses defaults
<Button text="Submit" color="red" /> // Custom values
```

### 6. Object and Array Props
```jsx
function StudentCard({ student, subjects }) {
  return (
    <div>
      <h3>{student.name}</h3>
      <p>Grade: {student.grade}</p>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>{subject}</li>
        ))}
      </ul>
    </div>
  );
}

// Usage
const studentData = { name: "Sarah", grade: "A" };
const subjectList = ["Math", "Science", "English"];

<StudentCard student={studentData} subjects={subjectList} />
```

### 7. Conditional Rendering with Props
```jsx
function Status({ isOnline, userName }) {
  return (
    <div>
      <p>{userName} is {isOnline ? '🟢 Online' : '🔴 Offline'}</p>
    </div>
  );
}

// Usage
<Status isOnline={true} userName="Alice" />
<Status isOnline={false} userName="Bob" />
```

---

## 🔴 ADVANCED LEVEL

### 8. Function Props (Callbacks)
```jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Button onClick={handleClick}>
      Click Me
    </Button>
  );
}
```

### 9. Children Props
```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="User Profile">
  <p>Name: John Doe</p>
  <p>Email: john@email.com</p>
  <button>Edit Profile</button>
</Card>
```

### 10. Prop Validation with PropTypes
```jsx
import PropTypes from 'prop-types';

function User({ name, age, email, isActive }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

// Prop validation
User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string,
  isActive: PropTypes.bool
};

User.defaultProps = {
  isActive: false
};
```

### 11. Render Props Pattern
```jsx
function DataFetcher({ render }) {
  const data = "Some fetched data";
  return render(data);
}

// Usage
<DataFetcher 
  render={(data) => <p>Data: {data}</p>}
/>
```

### 12. Higher-Order Component with Props
```jsx
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

const UserWithLoading = withLoading(User);

// Usage
<UserWithLoading 
  isLoading={false} 
  name="John" 
  age={30} 
/>
```

---

## 📝 Key Rules and Best Practices

### Props Rules:
1. **Read-Only**: Never modify props inside a component
2. **One-Way Data Flow**: Data flows from parent to child
3. **Pure Functions**: Components should be pure functions of their props

### Best Practices:
1. **Use Destructuring**: `({ name, age })` instead of `(props)`
2. **Default Values**: Always provide defaults for optional props
3. **Meaningful Names**: Use descriptive prop names
4. **Prop Validation**: Use PropTypes for type checking
5. **Keep Components Small**: Each component should have a single responsibility

### Common Mistakes:
```jsx
// ❌ Wrong - Modifying props
function BadComponent(props) {
  props.name = "Changed"; // Never do this!
  return <h1>{props.name}</h1>;
}

// ✅ Correct - Using props as read-only
function GoodComponent({ name }) {
  return <h1>{name}</h1>;
}
```

---

## 🚀 Complete Example Combining All Concepts

```jsx
// Advanced component using multiple prop patterns
function UserDashboard({ 
  user, 
  permissions = [], 
  onEdit, 
  onDelete, 
  children,
  theme = 'light' 
}) {
  const canEdit = permissions.includes('edit');
  const canDelete = permissions.includes('delete');

  return (
    <div className={`dashboard dashboard--${theme}`}>
      <header>
        <h1>Welcome, {user.name}!</h1>
        <p>Email: {user.email}</p>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer>
        {canEdit && (
          <button onClick={() => onEdit(user.id)}>
            Edit Profile
          </button>
        )}
        {canDelete && (
          <button onClick={() => onDelete(user.id)}>
            Delete Account
          </button>
        )}
      </footer>
    </div>
  );
}

// Usage
const userData = { id: 1, name: "Alice", email: "alice@email.com" };
const userPermissions = ['edit', 'view'];

<UserDashboard
  user={userData}
  permissions={userPermissions}
  onEdit={(id) => console.log(`Editing user ${id}`)}
  onDelete={(id) => console.log(`Deleting user ${id}`)}
  theme="dark"
>
  <p>This is dashboard content passed as children!</p>
  <div>Additional dashboard widgets...</div>
</UserDashboard>
```

This example demonstrates props destructuring, default values, function props, children props, conditional rendering, and object props all in one component!