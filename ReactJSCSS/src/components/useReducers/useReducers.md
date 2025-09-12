# React useReducer Hook - Beginner-Friendly Guide 🚀

## What is useReducer? (Simple Explanation)
Think of useReducer like a **remote control** for your TV:
- **useState**: You directly change the channel (direct control)
- **useReducer**: You press buttons on remote, and TV decides what to do (indirect control through actions)

## Why Use useReducer? 
When you have **too many useState** in one component, it gets messy:

```jsx
// ❌ TOO MANY useState - Gets confusing!
function MessyComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Too many state updates everywhere!
}

// ✅ useReducer - Clean and organized!
function CleanComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Only one state and one dispatch function!
}
```

---

## 📚 STEP 1: Super Simple Counter Example

Let's start with the easiest example - a counter!

```jsx
import { useReducer } from 'react';

// Step 1: What actions can happen?
const ACTIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract', 
  RESET: 'reset'
};

// Step 2: What should happen for each action?
function counterReducer(currentNumber, action) {
  // action = { type: 'add' } or { type: 'subtract' } etc.
  
  if (action.type === ACTIONS.ADD) {
    return currentNumber + 1;  // Return new number
  }
  
  if (action.type === ACTIONS.SUBTRACT) {
    return currentNumber - 1;  // Return new number
  }
  
  if (action.type === ACTIONS.RESET) {
    return 0;  // Return new number
  }
  
  return currentNumber;  // If unknown action, return same number
}

// Step 3: Use it in component
function SimpleCounter() {
  // useReducer(reducer function, starting value)
  const [count, dispatch] = useReducer(counterReducer, 0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      
      {/* dispatch sends action to reducer */}
      <button onClick={() => dispatch({ type: ACTIONS.ADD })}>
        +1
      </button>
      
      <button onClick={() => dispatch({ type: ACTIONS.SUBTRACT })}>
        -1
      </button>
      
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>
        Reset
      </button>
    </div>
  );
}
```

**What happens when you click +1?**
1. `dispatch({ type: 'add' })` is called
2. Reducer function runs: `counterReducer(currentCount, { type: 'add' })`
3. Reducer returns `currentCount + 1`
4. Component re-renders with new count

---

## 📚 STEP 2: Adding Data to Actions (Payload)

Sometimes you want to send data with your action:

```jsx
import { useReducer } from 'react';

const ACTIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract'
};

function calculatorReducer(currentValue, action) {
  // action = { type: 'add', number: 5 }
  //         { type: 'subtract', number: 3 }
  
  if (action.type === ACTIONS.ADD) {
    return currentValue + action.number;  // Add the number we sent
  }
  
  if (action.type === ACTIONS.SUBTRACT) {
    return currentValue - action.number;  // Subtract the number we sent
  }
  
  return currentValue;
}

function SimpleCalculator() {
  const [value, dispatch] = useReducer(calculatorReducer, 0);
  
  return (
    <div>
      <h2>Value: {value}</h2>
      
      {/* Send number 5 with the action */}
      <button onClick={() => dispatch({ type: ACTIONS.ADD, number: 5 })}>
        Add 5
      </button>
      
      {/* Send number 3 with the action */}
      <button onClick={() => dispatch({ type: ACTIONS.SUBTRACT, number: 3 })}>
        Subtract 3
      </button>
      
      {/* Send number 10 with the action */}
      <button onClick={() => dispatch({ type: ACTIONS.ADD, number: 10 })}>
        Add 10
      </button>
    </div>
  );
}
```

**Key Point**: You can send extra data (called "payload") with your actions!

---

## 📚 STEP 3: Managing Multiple Values (Object State)

Instead of just numbers, let's manage an object with multiple properties:

```jsx
import { useReducer } from 'react';

const ACTIONS = {
  CHANGE_NAME: 'change_name',
  CHANGE_AGE: 'change_age',
  RESET: 'reset'
};

// Our state is now an object with name and age
function personReducer(currentPerson, action) {
  
  if (action.type === ACTIONS.CHANGE_NAME) {
    return {
      ...currentPerson,        // Keep everything the same
      name: action.newName     // Only change the name
    };
  }
  
  if (action.type === ACTIONS.CHANGE_AGE) {
    return {
      ...currentPerson,        // Keep everything the same  
      age: action.newAge       // Only change the age
    };
  }
  
  if (action.type === ACTIONS.RESET) {
    return {
      name: '',
      age: 0
    };
  }
  
  return currentPerson;  // Return current state if unknown action
}

function PersonForm() {
  // Starting state is an object
  const startingPerson = { name: '', age: 0 };
  const [person, dispatch] = useReducer(personReducer, startingPerson);
  
  return (
    <div>
      <h2>Person Info</h2>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      
      <input 
        type="text"
        placeholder="Enter name"
        onChange={(e) => dispatch({ 
          type: ACTIONS.CHANGE_NAME, 
          newName: e.target.value 
        })}
      />
      
      <input 
        type="number"
        placeholder="Enter age"
        onChange={(e) => dispatch({ 
          type: ACTIONS.CHANGE_AGE, 
          newAge: parseInt(e.target.value) 
        })}
      />
      
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>
        Reset Form
      </button>
    </div>
  );
}
```

**Important**: When updating objects, always use `...` (spread operator) to keep other properties!

---

## 📚 STEP 4: Simple Todo List

Let's build a todo list (most common example):

```jsx
import { useReducer, useState } from 'react';

const TODO_ACTIONS = {
  ADD: 'add_todo',
  DELETE: 'delete_todo',
  TOGGLE: 'toggle_todo'
};

function todoReducer(currentTodos, action) {
  
  if (action.type === TODO_ACTIONS.ADD) {
    // Add new todo to the list
    const newTodo = {
      id: Date.now(),           // Simple ID (just current time)
      text: action.text,        // Todo text from action
      completed: false          // New todos are not completed
    };
    
    return [...currentTodos, newTodo];  // Add to end of list
  }
  
  if (action.type === TODO_ACTIONS.DELETE) {
    // Remove todo with matching ID
    return currentTodos.filter(todo => todo.id !== action.id);
  }
  
  if (action.type === TODO_ACTIONS.TOGGLE) {
    // Toggle completed status of specific todo
    return currentTodos.map(todo => {
      if (todo.id === action.id) {
        return { ...todo, completed: !todo.completed };  // Flip completed
      }
      return todo;  // Keep other todos the same
    });
  }
  
  return currentTodos;  // Return current list if unknown action
}

function SimpleTodoApp() {
  // State: list of todos (starts empty)
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  // Local state for input field
  const [inputText, setInputText] = useState('');
  
  const addTodo = () => {
    if (inputText.trim()) {  // Only add if text is not empty
      dispatch({ 
        type: TODO_ACTIONS.ADD, 
        text: inputText 
      });
      setInputText('');  // Clear input after adding
    }
  };
  
  return (
    <div>
      <h2>My Todo List ({todos.length} items)</h2>
      
      {/* Add new todo */}
      <div>
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What do you need to do?"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      
      {/* Show all todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => dispatch({ 
                type: TODO_ACTIONS.TOGGLE, 
                id: todo.id 
              })}
            >
              {todo.text}
            </span>
            
            <button 
              onClick={() => dispatch({ 
                type: TODO_ACTIONS.DELETE, 
                id: todo.id 
              })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p>No todos yet! Add one above.</p>}
    </div>
  );
}
```

---

## 📚 STEP 5: useReducer + useContext (Sharing State)

When you want to share state between multiple components:

```jsx
import React, { createContext, useContext, useReducer } from 'react';

// Action types
const COUNTER_ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset'
};

// Reducer function
function counterReducer(count, action) {
  switch (action.type) {
    case COUNTER_ACTIONS.INCREMENT:
      return count + 1;
    case COUNTER_ACTIONS.DECREMENT:
      return count - 1;
    case COUNTER_ACTIONS.RESET:
      return 0;
    default:
      return count;
  }
}

// Create context
const CounterContext = createContext();

// Provider component
function CounterProvider({ children }) {
  const [count, dispatch] = useReducer(counterReducer, 0);
  
  return (
    <CounterContext.Provider value={{ count, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// Custom hook to use counter
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
}

// Component that shows count
function CounterDisplay() {
  const { count } = useCounter();
  
  return (
    <div>
      <h2>Count: {count}</h2>
    </div>
  );
}

// Component with buttons
function CounterButtons() {
  const { dispatch } = useCounter();
  
  return (
    <div>
      <button onClick={() => dispatch({ type: COUNTER_ACTIONS.INCREMENT })}>
        +1
      </button>
      <button onClick={() => dispatch({ type: COUNTER_ACTIONS.DECREMENT })}>
        -1
      </button>
      <button onClick={() => dispatch({ type: COUNTER_ACTIONS.RESET })}>
        Reset
      </button>
    </div>
  );
}

// Main app
function App() {
  return (
    <CounterProvider>
      <div>
        <CounterDisplay />
        <CounterButtons />
      </div>
    </CounterProvider>
  );
}
```

---

## 🎯 KEY POINTS TO REMEMBER

### 1. When to Use useReducer?
✅ **Use useReducer when:**
- You have 3+ related useState hooks
- State updates depend on previous state
- You have complex state logic
- Multiple components need same state logic

❌ **Don't use useReducer when:**
- Simple true/false states
- Independent state values
- Just 1-2 simple states

### 2. useReducer vs useState
```jsx
// Simple state = useState
const [isOpen, setIsOpen] = useState(false);
const [name, setName] = useState('');

// Complex state = useReducer  
const [state, dispatch] = useReducer(reducer, {
  user: null,
  loading: false,
  error: null,
  posts: []
});
```

### 3. Industry Usage Patterns

**Real-world examples where useReducer is used:**

1. **Form Management**
```jsx
// Managing complex forms with validation
const [formState, dispatch] = useReducer(formReducer, {
  values: { name: '', email: '', password: '' },
  errors: {},
  isSubmitting: false
});
```

2. **Shopping Cart**
```jsx
// E-commerce cart functionality
const [cart, dispatch] = useReducer(cartReducer, {
  items: [],
  total: 0,
  discount: 0
});
```

3. **User Authentication**
```jsx
// Login/logout state management
const [auth, dispatch] = useReducer(authReducer, {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null
});
```

### 4. Common Mistakes to Avoid

❌ **Don't mutate state directly:**
```jsx
// WRONG
function badReducer(state, action) {
  state.count = state.count + 1;  // ❌ Mutating original state
  return state;
}

// CORRECT  
function goodReducer(state, action) {
  return { ...state, count: state.count + 1 };  // ✅ Return new state
}
```

❌ **Don't forget to handle unknown actions:**
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;  // ✅ Always return current state for unknown actions
  }
}
```

### 5. Simple Mental Model

Think of useReducer like a **vending machine**:
1. You press a button (dispatch action)
2. Machine processes your request (reducer function)  
3. You get your item (new state)
4. Machine updates its display (component re-renders)

---

## 🏭 How Companies Use useReducer

### Small Companies:
- Form handling in contact/signup pages
- Shopping cart for online stores
- User preferences (theme, language)

### Large Companies (Netflix, Facebook, etc.):
- Complex dashboards with filters
- Real-time chat applications
- Multi-step wizards and workflows
- Global app state management

### Why Industries Love useReducer:
1. **Predictable** - Same action always gives same result
2. **Testable** - Easy to test reducer functions
3. **Scalable** - Easy to add new features
4. **Debuggable** - Clear action history for debugging

---

## 🎓 Quick Revision Checklist

Before interviews or projects, remember:

✅ **useReducer Basics:**
- `const [state, dispatch] = useReducer(reducer, initialState)`
- Reducer takes (state, action) and returns new state
- Always dispatch objects with `type` property

✅ **Action Pattern:**
```jsx
dispatch({ type: 'ACTION_NAME', payload: data })
```

✅ **When to Use:**
- Complex state logic
- Multiple related state values  
- State depends on previous state

✅ **Real Examples:**
- Todo lists, shopping carts, forms
- Authentication, themes, user preferences

That's it! Master these concepts and you'll understand 90% of useReducer usage in the industry! 🚀

### 3. Understanding Actions and Payload

```jsx
// Actions can carry data (payload)
const ACTIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTIPLY: 'multiply',
  SET: 'set'
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      // action.payload contains the number to add
      return { value: state.value + action.payload };
    
    case ACTIONS.SUBTRACT:
      return { value: state.value - action.payload };
    
    case ACTIONS.MULTIPLY:
      return { value: state.value * action.payload };
    
    case ACTIONS.SET:
      return { value: action.payload };
    
    default:
      return state;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, { value: 0 });
  
  return (
    <div>
      <h2>Value: {state.value}</h2>
      
      {/* Dispatching actions with payload */}
      <button onClick={() => dispatch({ type: ACTIONS.ADD, payload: 5 })}>
        Add 5
      </button>
      
      <button onClick={() => dispatch({ type: ACTIONS.SUBTRACT, payload: 3 })}>
        Subtract 3
      </button>
      
      <button onClick={() => dispatch({ type: ACTIONS.MULTIPLY, payload: 2 })}>
        Multiply by 2
      </button>
      
      <button onClick={() => dispatch({ type: ACTIONS.SET, payload: 100 })}>
        Set to 100
      </button>
    </div>
  );
}
```

### 4. Simple Todo List with useReducer

```jsx
import { useReducer } from 'react';

// Define action types
const TODO_ACTIONS = {
  ADD_TODO: 'add_todo',
  TOGGLE_TODO: 'toggle_todo',
  DELETE_TODO: 'delete_todo'
};

// Reducer function to manage todos
function todoReducer(todos, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO:
      // Add new todo to the list
      return [...todos, {
        id: Date.now(), // Simple ID (use better ID in real apps)
        text: action.payload.text,
        completed: false
      }];
    
    case TODO_ACTIONS.TOGGLE_TODO:
      // Toggle completed status of specific todo
      return todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    
    case TODO_ACTIONS.DELETE_TODO:
      // Remove todo from list
      return todos.filter(todo => todo.id !== action.payload.id);
    
    default:
      return todos;
  }
}

function TodoApp() {
  // Initialize with empty array
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  const addTodo = (text) => {
    dispatch({
      type: TODO_ACTIONS.ADD_TODO,
      payload: { text }
    });
  };
  
  const toggleTodo = (id) => {
    dispatch({
      type: TODO_ACTIONS.TOGGLE_TODO,
      payload: { id }
    });
  };
  
  const deleteTodo = (id) => {
    dispatch({
      type: TODO_ACTIONS.DELETE_TODO,
      payload: { id }
    });
  };

  return (
    <div>
      <h2>Todo List ({todos.length} items)</h2>
      
      {/* Add new todo */}
      <AddTodoForm onAdd={addTodo} />
      
      {/* Display todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p>No todos yet. Add one above!</p>}
    </div>
  );
}

// Separate component for adding todos
function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText(''); // Clear input
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

---

## 🟡 INTERMEDIATE LEVEL

### 5. Complex State Management with Multiple Properties

```jsx
import { useReducer, useEffect } from 'react';

// Action types for user profile management
const PROFILE_ACTIONS = {
  SET_LOADING: 'set_loading',
  SET_USER_DATA: 'set_user_data',
  SET_ERROR: 'set_error',
  UPDATE_FIELD: 'update_field',
  RESET_FORM: 'reset_form',
  SET_EDITING: 'set_editing'
};

// Complex reducer managing multiple state properties
function profileReducer(state, action) {
  switch (action.type) {
    case PROFILE_ACTIONS.SET_LOADING:
      return {
        ...state, // Keep all existing state
        loading: action.payload, // Update only loading
        error: null // Clear error when loading starts
      };
    
    case PROFILE_ACTIONS.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        formData: action.payload, // Copy to form for editing
        loading: false,
        error: null
      };
    
    case PROFILE_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case PROFILE_ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value
        }
      };
    
    case PROFILE_ACTIONS.RESET_FORM:
      return {
        ...state,
        formData: state.userData, // Reset form to original data
        isEditing: false
      };
    
    case PROFILE_ACTIONS.SET_EDITING:
      return {
        ...state,
        isEditing: action.payload
      };
    
    default:
      return state;
  }
}

function UserProfile({ userId }) {
  // Complex initial state
  const initialState = {
    userData: null,     // Original user data from server
    formData: null,     // Form data being edited
    loading: false,     // Loading indicator
    error: null,        // Error message
    isEditing: false    // Whether user is editing
  };
  
  const [state, dispatch] = useReducer(profileReducer, initialState);
  
  // Load user data when component mounts or userId changes
  useEffect(() => {
    const loadUserData = async () => {
      dispatch({ type: PROFILE_ACTIONS.SET_LOADING, payload: true });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const userData = {
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Software developer who loves React!'
        };
        
        dispatch({ type: PROFILE_ACTIONS.SET_USER_DATA, payload: userData });
        
      } catch (error) {
        dispatch({ 
          type: PROFILE_ACTIONS.SET_ERROR, 
          payload: 'Failed to load user data' 
        });
      }
    };
    
    if (userId) {
      loadUserData();
    }
  }, [userId]);
  
  // Update a form field
  const updateField = (field, value) => {
    dispatch({
      type: PROFILE_ACTIONS.UPDATE_FIELD,
      payload: { field, value }
    });
  };
  
  // Start editing
  const startEditing = () => {
    dispatch({ type: PROFILE_ACTIONS.SET_EDITING, payload: true });
  };
  
  // Cancel editing (reset form)
  const cancelEditing = () => {
    dispatch({ type: PROFILE_ACTIONS.RESET_FORM });
  };
  
  // Save changes
  const saveChanges = async () => {
    dispatch({ type: PROFILE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Simulate API call to save data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the original user data
      dispatch({ type: PROFILE_ACTIONS.SET_USER_DATA, payload: state.formData });
      
      alert('Profile updated successfully!');
      
    } catch (error) {
      dispatch({ 
        type: PROFILE_ACTIONS.SET_ERROR, 
        payload: 'Failed to save changes' 
      });
    }
  };
  
  // Loading state
  if (state.loading && !state.userData) {
    return <div>Loading user profile...</div>;
  }
  
  // Error state
  if (state.error) {
    return <div style={{ color: 'red' }}>Error: {state.error}</div>;
  }
  
  // No data state
  if (!state.userData) {
    return <div>No user data available</div>;
  }
  
  return (
    <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>User Profile</h2>
      
      {state.isEditing ? (
        // Editing mode
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label>
            <input
              type="text"
              value={state.formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input
              type="email"
              value={state.formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Bio:</label>
            <textarea
              value={state.formData.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              style={{ width: '100%', padding: '5px', height: '80px' }}
            />
          </div>
          
          <div>
            <button 
              onClick={saveChanges} 
              disabled={state.loading}
              style={{ marginRight: '10px' }}
            >
              {state.loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
        </div>
      ) : (
        // Display mode
        <div>
          <p><strong>Name:</strong> {state.userData.name}</p>
          <p><strong>Email:</strong> {state.userData.email}</p>
          <p><strong>Bio:</strong> {state.userData.bio}</p>
          
          <button onClick={startEditing}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}
```

### 6. useReducer with useContext for Global State

```jsx
import React, { createContext, useContext, useReducer } from 'react';

// Action types for shopping cart
const CART_ACTIONS = {
  ADD_ITEM: 'add_item',
  REMOVE_ITEM: 'remove_item',
  UPDATE_QUANTITY: 'update_quantity',
  CLEAR_CART: 'clear_cart',
  APPLY_DISCOUNT: 'apply_discount'
};

// Cart reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        // New item, add to cart
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        discount: 0
      };
    
    case CART_ACTIONS.APPLY_DISCOUNT:
      return {
        ...state,
        discount: action.payload
      };
    
    default:
      return state;
  }
}

// Create Context
const CartContext = createContext();

// Cart Provider Component
function CartProvider({ children }) {
  const initialState = {
    items: [],
    discount: 0
  };
  
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  
  // Calculate totals (derived state)
  const totals = {
    itemCount: cartState.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    discountAmount: 0,
    total: 0
  };
  
  totals.discountAmount = totals.subtotal * (cartState.discount / 100);
  totals.total = totals.subtotal - totals.discountAmount;
  
  const contextValue = {
    cartState,
    totals,
    dispatch,
    // Helper functions
    addItem: (item) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item }),
    removeItem: (id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id }),
    updateQuantity: (id, quantity) => dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id, quantity } 
    }),
    clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR_CART }),
    applyDiscount: (percent) => dispatch({ 
      type: CART_ACTIONS.APPLY_DISCOUNT, 
      payload: percent 
    })
  };
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Product list component
function ProductList() {
  const { addItem } = useCart();
  
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 }
  ];
  
  return (
    <div>
      <h3>Products</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <button onClick={() => addItem(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Shopping cart component
function ShoppingCart() {
  const { cartState, totals, removeItem, updateQuantity, clearCart, applyDiscount } = useCart();
  
  if (cartState.items.length === 0) {
    return (
      <div>
        <h3>Shopping Cart</h3>
        <p>Your cart is empty</p>
      </div>
    );
  }
  
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px' }}>
      <h3>Shopping Cart ({totals.itemCount} items)</h3>
      
      {cartState.items.map(item => (
        <div key={item.id} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '10px 0',
          borderBottom: '1px solid #eee'
        }}>
          <div>
            <h4>{item.name}</h4>
            <p>${item.price} each</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>Qty: {item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      
      {/* Discount section */}
      <div style={{ marginTop: '15px' }}>
        <h4>Apply Discount:</h4>
        <button onClick={() => applyDiscount(10)}>10% Off</button>
        <button onClick={() => applyDiscount(20)}>20% Off</button>
        <button onClick={() => applyDiscount(0)}>Remove Discount</button>
      </div>
      
      {/* Totals */}
      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <p>Subtotal: ${totals.subtotal.toFixed(2)}</p>
        {cartState.discount > 0 && (
          <p>Discount ({cartState.discount}%): -${totals.discountAmount.toFixed(2)}</p>
        )}
        <h3>Total: ${totals.total.toFixed(2)}</h3>
      </div>
      
      <button onClick={clearCart} style={{ marginTop: '10px', width: '100%' }}>
        Clear Cart
      </button>
    </div>
  );
}

// Main shopping app
function ShoppingApp() {
  return (
    <CartProvider>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <div style={{ flex: 2 }}>
          <ProductList />
        </div>
        <div style={{ flex: 1 }}>
          <ShoppingCart />
        </div>
      </div>
    </CartProvider>
  );
}
```

---

## 🔴 ADVANCED LEVEL - PRODUCTION PATTERNS

### 7. Complex Application State with useReducer + useEffect + Context

```jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Action types for a complete application
const APP_ACTIONS = {
  // Auth actions
  LOGIN_START: 'login_start',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  LOGOUT: 'logout',
  
  // Data loading actions
  FETCH_START: 'fetch_start',
  FETCH_SUCCESS: 'fetch_success',
  FETCH_ERROR: 'fetch_error',
  
  // UI actions
  SET_THEME: 'set_theme',
  TOGGLE_SIDEBAR: 'toggle_sidebar',
  SET_NOTIFICATION: 'set_notification',
  CLEAR_NOTIFICATION: 'clear_notification',
  
  // User actions
  UPDATE_PROFILE: 'update_profile',
  ADD_FAVORITE: 'add_favorite',
  REMOVE_FAVORITE: 'remove_favorite'
};

// Complex application reducer
function appReducer(state, action) {
  switch (action.type) {
    // Authentication
    case APP_ACTIONS.LOGIN_START:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
          error: null
        }
      };
    
    case APP_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          user: action.payload.user,
          token: action.payload.token,
          loading: false,
          error: null,
          isAuthenticated: true
        }
      };
    
    case APP_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        auth: {
          user: null,
          token: null,
          loading: false,
          error: action.payload,
          isAuthenticated: false
        }
      };
    
    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        auth: {
          user: null,
          token: null,
          loading: false,
          error: null,
          isAuthenticated: false
        },
        data: {
          ...state.data,
          userPosts: [],
          favorites: []
        }
      };
    
    // Data fetching
    case APP_ACTIONS.FETCH_START:
      return {
        ...state,
        data: {
          ...state.data,
          loading: {
            ...state.data.loading,
            [action.payload.key]: true
          }
        }
      };
    
    case APP_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: action.payload.data,
          loading: {
            ...state.data.loading,
            [action.payload.key]: false
          },
          errors: {
            ...state.data.errors,
            [action.payload.key]: null
          }
        }
      };
    
    case APP_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          loading: {
            ...state.data.loading,
            [action.payload.key]: false
          },
          errors: {
            ...state.data.errors,
            [action.payload.key]: action.payload.error
          }
        }
      };
    
    // UI state
    case APP_ACTIONS.SET_THEME:
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: action.payload
        }
      };
    
    case APP_ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen
        }
      };
    
    case APP_ACTIONS.SET_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [
            ...state.ui.notifications,
            {
              id: Date.now(),
              ...action.payload,
              timestamp: new Date()
            }
          ]
        }
      };
    
    case APP_ACTIONS.CLEAR_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(
            notification => notification.id !== action.payload
          )
        }
      };
    
    // User actions
    case APP_ACTIONS.ADD_FAVORITE:
      return {
        ...state,
        data: {
          ...state.data,
          favorites: [...state.data.favorites, action.payload]
        }
      };
    
    case APP_ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        data: {
          ...state.data,
          favorites: state.data.favorites.filter(
            fav => fav.id !== action.payload
          )
        }
      };
    
    default:
      return state;
  }
}

// Initial application state
const initialState = {
  auth: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false
  },
  data: {
    posts: [],
    userPosts: [],
    favorites: [],
    loading: {
      posts: false,
      userPosts: false
    },
    errors: {
      posts: null,
      userPosts: null
    }
  },
  ui: {
    theme: 'light',
    sidebarOpen: false,
    notifications: []
  }
};

// Create application context
const AppContext = createContext();

// Application provider component
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.token) {
          dispatch({
            type: APP_ACTIONS.LOGIN_SUCCESS,
            payload: authData
          });
        }
      } catch (error) {
        console.error('Failed to load saved auth:', error);
      }
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch({ type: APP_ACTIONS.SET_THEME, payload: savedTheme });
    }
  }, []);
  
  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (state.auth.isAuthenticated) {
      localStorage.setItem('auth', JSON.stringify({
        user: state.auth.user,
        token: state.auth.token
      }));
    } else {
      localStorage.removeItem('auth');
    }
  }, [state.auth]);
  
  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', state.ui.theme);
  }, [state.ui.theme]);
  
  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    state.ui.notifications.forEach(notification => {
      setTimeout(() => {
        dispatch({
          type: APP_ACTIONS.CLEAR_NOTIFICATION,
          payload: notification.id
        });
      }, 5000);
    });
  }, [state.ui.notifications]);
  
  // API functions
  const api = {
    // Login function
    login: async (credentials) => {
      dispatch({ type: APP_ACTIONS.LOGIN_START });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          const userData = {
            user: { id: 1, name: 'John Doe', email: credentials.email },
            token: 'fake-jwt-token'
          };
          
          dispatch({ type: APP_ACTIONS.LOGIN_SUCCESS, payload: userData });
          dispatch({
            type: APP_ACTIONS.SET_NOTIFICATION,
            payload: { message: 'Login successful!', type: 'success' }
          });
          
          return userData;
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        dispatch({ type: APP_ACTIONS.LOGIN_FAILURE, payload: error.message });
        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATION,
          payload: { message: 'Login failed!', type: 'error' }
        });
        throw error;
      }
    },
    
    // Logout function
    logout: () => {
      dispatch({ type: APP_ACTIONS.LOGOUT });
      dispatch({
        type: APP_ACTIONS.SET_NOTIFICATION,
        payload: { message: 'Logged out successfully', type: 'info' }
      });
    },
    
    // Fetch posts function
    fetchPosts: async () => {
      dispatch({ type: APP_ACTIONS.FETCH_START, payload: { key: 'posts' } });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const posts = [
          { id: 1, title: 'First Post', content: 'This is the first post' },
          { id: 2, title: 'Second Post', content: 'This is the second post' },
          { id: 3, title: 'Third Post', content: 'This is the third post' }
        ];
        
        dispatch({
          type: APP_ACTIONS.FETCH_SUCCESS,
          payload: { key: 'posts', data: posts }
        });
        
      } catch (error) {
        dispatch({
          type: APP_ACTIONS.FETCH_ERROR,
          payload: { key: 'posts', error: error.message }
        });
      }
    }
  };
  
  // UI functions
  const ui = {
    toggleTheme: () => {
      const newTheme = state.ui.theme === 'light' ? 'dark' : 'light';
      dispatch({ type: APP_ACTIONS.SET_THEME, payload: newTheme });
    },
    
    toggleSidebar: () => {
      dispatch({ type: APP_ACTIONS.TOGGLE_SIDEBAR });
    },
    
    addNotification: (message, type = 'info') => {
      dispatch({
        type: APP_ACTIONS.SET_NOTIFICATION,
        payload: { message, type }
      });
    }
  };
  
  // User functions
  const user = {
    addFavorite: (post) => {
      dispatch({ type: APP_ACTIONS.ADD_FAVORITE, payload: post });
      ui.addNotification('Added to favorites!', 'success');
    },
    
    removeFavorite: (postId) => {
      dispatch({ type: APP_ACTIONS.REMOVE_FAVORITE, payload: postId });
      ui.addNotification('Removed from favorites', 'info');
    }
  };
  
  const contextValue = {
    state,
    dispatch,
    api,
    ui,
    user
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use app context
function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Login component
function LoginForm() {
  const { state, api } = useApp();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login(credentials);
    } catch (error) {
      // Error handling is done in the API function
    }
  };
  
  if (state.auth.isAuthenticated) {
    return <Dashboard />;
  }
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>Login</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="email"
          placeholder="Email (test@example.com)"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="password"
          placeholder="Password (password)"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={state.auth.loading}
        style={{ width: '100%', padding: '10px' }}
      >
        {state.auth.loading ? 'Logging in...' : 'Login'}
      </button>
      
      {state.auth.error && (
        <p style={{ color: 'red', marginTop: '10px' }}>{state.auth.error}</p>
      )}
    </form>
  );
}

// Dashboard component
function Dashboard() {
  const { state, api, ui, user } = useApp();
  
  useEffect(() => {
    if (state.auth.isAuthenticated && state.data.posts.length === 0) {
      api.fetchPosts();
    }
  }, [state.auth.isAuthenticated]);
  
  const themeStyles = {
    light: { backgroundColor: '#ffffff', color: '#000000' },
    dark: { backgroundColor: '#333333', color: '#ffffff' }
  };
  
  return (
    <div style={{ 
      ...themeStyles[state.ui.theme], 
      minHeight: '100vh', 
      padding: '20px' 
    }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
        marginBottom: '20px'
      }}>
        <h1>Dashboard</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>Welcome, {state.auth.user?.name}!</span>
          
          <button onClick={ui.toggleTheme}>
            {state.ui.theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <button onClick={api.logout}>Logout</button>
        </div>
      </header>
      
      {/* Posts section */}
      <div>
        <h2>Posts</h2>
        
        {state.data.loading.posts ? (
          <p>Loading posts...</p>
        ) : state.data.errors.posts ? (
          <p style={{ color: 'red' }}>Error: {state.data.errors.posts}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {state.data.posts.map(post => (
              <div key={post.id} style={{ 
                border: '1px solid #ccc', 
                padding: '15px', 
                borderRadius: '8px' 
              }}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                
                <div style={{ marginTop: '10px' }}>
                  {state.data.favorites.some(fav => fav.id === post.id) ? (
                    <button onClick={() => user.removeFavorite(post.id)}>
                      ❤️ Remove from Favorites
                    </button>
                  ) : (
                    <button onClick={() => user.addFavorite(post)}>
                      🤍 Add to Favorites
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Favorites section */}
      {state.data.favorites.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>Favorites ({state.data.favorites.length})</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {state.data.favorites.map(fav => (
              <div key={fav.id} style={{ 
                border: '1px solid #ccc', 
                padding: '10px', 
                borderRadius: '5px',
                backgroundColor: state.ui.theme === 'light' ? '#f9f9f9' : '#444444'
              }}>
                <h4>{fav.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Notifications component
function Notifications() {
  const { state, dispatch } = useApp();
  
  if (state.ui.notifications.length === 0) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {state.ui.notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            backgroundColor: notification.type === 'error' ? '#ff4444' : 
                           notification.type === 'success' ? '#44ff44' : '#4444ff',
            color: 'white',
            padding: '10px 15px',
            margin: '5px 0',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => dispatch({
            type: APP_ACTIONS.CLEAR_NOTIFICATION,
            payload: notification.id
          })}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}

// Main app component
function App() {
  return (
    <AppProvider>
      <div>
        <LoginForm />
        <Notifications />
      </div>
    </AppProvider>
  );
}
```

---

## 📚 PRODUCTION BEST PRACTICES

### When to Use useReducer:
1. **Complex state logic** - Multiple state values that depend on each other
2. **Multiple ways to update state** - Many different actions that can modify state
3. **State transitions** - When next state depends on previous state
4. **Shared state logic** - When multiple components need the same state logic

### useReducer vs useState:
```jsx
// Use useState for:
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);

// Use useReducer for:
const [complexState, dispatch] = useReducer(reducer, {
  user: null,
  posts: [],
  loading: false,
  error: null,
  filters: { category: 'all', sortBy: 'date' }
});
```

### Performance Tips:
1. **Memoize reducer functions** - Define outside component or use useCallback
2. **Split large reducers** - Use multiple useReducer hooks for different concerns
3. **Optimize context updates** - Split frequently changing state from stable state
4. **Use action creators** - Create helper functions for common actions

### Real-World Integration:
- **useState**: Local component state (form inputs, UI toggles)
- **useReducer**: Complex state logic (shopping cart, form validation)
- **useEffect**: Side effects (API calls, subscriptions, cleanup)
- **useContext**: Global state sharing (authentication, theme, cart)

### Complete Data Flow:
1. **User interaction** triggers an action
2. **Action** is dispatched to reducer
3. **Reducer** calculates new state
4. **Component re-renders** with new state
5. **useEffect** responds to state changes
6. **Context** shares state across components

useReducer is essential for building scalable React applications with complex state management needs, especially when combined with Context API for global state and useEffect for side effects!