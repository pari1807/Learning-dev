# React Context API - Complete Guide (Beginner to Production Level)

## What is Context API?
Context API is React's built-in state management solution that allows you to share data across multiple components without passing props down through every level of the component tree. It solves the "prop drilling" problem.

---

## 🟢 BASIC LEVEL

### 1. The Prop Drilling Problem
```jsx
// Without Context - Prop Drilling Problem
function App() {
  const [user, setUser] = useState({ name: 'John', role: 'admin' });
  
  return <Layout user={user} />;
}

function Layout({ user }) {
  return (
    <div>
      <Header user={user} />
      <Main user={user} />
    </div>
  );
}

function Header({ user }) {
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  // Finally we can use the user data!
  return <div>Welcome, {user.name}!</div>;
}

// Problem: user prop is passed through Layout → Header → Navigation → UserMenu
// Even though Layout, Header, and Navigation don't use it!
```

### 2. Basic Context Creation and Usage
```jsx
import React, { createContext, useContext, useState } from 'react';

// Step 1: Create Context
// createContext() creates a context object
const UserContext = createContext();

// Step 2: Create Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John', role: 'admin' });
  
  // Value object contains all data and functions we want to share
  const contextValue = {
    user,        // Current user data
    setUser      // Function to update user
  };
  
  return (
    // Provider makes the context value available to all child components
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

// Step 3: Create Custom Hook (optional but recommended)
function useUser() {
  const context = useContext(UserContext);
  
  // Error handling: throw error if hook is used outside provider
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
}

// Step 4: Use Context in Components
function App() {
  return (
    // Wrap your app with the Provider
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

function Layout() {
  // No need to pass props anymore!
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return <Navigation />;
}

function Navigation() {
  return <UserMenu />;
}

function UserMenu() {
  // Use the custom hook to access context
  const { user, setUser } = useUser();
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <div>
      <span>Welcome, {user?.name}!</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Theme Context Example
```jsx
import React, { createContext, useContext, useState } from 'react';

// Create theme context
const ThemeContext = createContext();

// Theme provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Default theme is light
  
  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Theme styles object
  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #cccccc'
    },
    dark: {
      backgroundColor: '#333333',
      color: '#ffffff',
      border: '1px solid #666666'
    }
  };
  
  const contextValue = {
    theme,           // Current theme name
    toggleTheme,     // Function to toggle theme
    themeStyles      // Styles object for current theme
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Component that uses theme
function ThemedButton({ children, onClick }) {
  const { theme, themeStyles } = useTheme();
  
  return (
    <button 
      style={{
        ...themeStyles[theme],
        padding: '10px 20px',
        border: themeStyles[theme].border,
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Main app component
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <ThemeToggler />
        <Content />
      </div>
    </ThemeProvider>
  );
}

function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <h2>Current Theme: {theme}</h2>
      <ThemedButton onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </ThemedButton>
    </div>
  );
}

function Content() {
  const { themeStyles, theme } = useTheme();
  
  return (
    <div style={{
      ...themeStyles[theme],
      padding: '20px',
      margin: '20px 0',
      borderRadius: '8px'
    }}>
      <h3>This content adapts to the theme!</h3>
      <p>The background and text colors change based on the selected theme.</p>
      <ThemedButton onClick={() => alert('Button clicked!')}>
        Themed Button
      </ThemedButton>
    </div>
  );
}
```

---

## 🟡 INTERMEDIATE LEVEL

### 4. Shopping Cart Context with useReducer
```jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Action types for reducer
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer function to manage cart state
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
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
      return { ...state, items: [] };
    
    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload };
    
    default:
      return state;
  }
}

// Create cart context
const CartContext = createContext();

// Cart provider component
function CartProvider({ children }) {
  // Initial state for cart
  const initialState = {
    items: []
  };
  
  // useReducer for complex state management
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartState.items));
  }, [cartState.items]);
  
  // Calculate cart totals
  const cartTotals = {
    itemCount: cartState.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cartState.items.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    )
  };
  
  // Action creators (functions that dispatch actions)
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };
  
  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ 
        type: CART_ACTIONS.UPDATE_QUANTITY, 
        payload: { id: productId, quantity } 
      });
    }
  };
  
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };
  
  // Context value object
  const contextValue = {
    cartState,      // Current cart state
    cartTotals,     // Calculated totals
    addToCart,      // Function to add item
    removeFromCart, // Function to remove item
    updateQuantity, // Function to update quantity
    clearCart       // Function to clear cart
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
  const { addToCart } = useCart();
  
  // Sample products
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      {products.map(product => (
        <div 
          key={product.id} 
          style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

// Cart display component
function CartDisplay() {
  const { cartState, cartTotals, updateQuantity, removeFromCart, clearCart } = useCart();
  
  if (cartState.items.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '20px', borderLeft: '1px solid #ccc' }}>
      <h2>Shopping Cart ({cartTotals.itemCount} items)</h2>
      
      {cartState.items.map(item => (
        <div 
          key={item.id}
          style={{ 
            border: '1px solid #eee', 
            padding: '10px', 
            margin: '5px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
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
            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>Total: ${cartTotals.totalPrice.toFixed(2)}</h3>
        <button onClick={clearCart} style={{ marginTop: '10px' }}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

// Main shopping app
function ShoppingApp() {
  return (
    <CartProvider>
      <div style={{ display: 'flex' }}>
        <ProductList />
        <CartDisplay />
      </div>
    </CartProvider>
  );
}
```

### 5. Multiple Contexts with Composition
```jsx
import React, { createContext, useContext, useState } from 'react';

// Auth Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = { id: 1, email, name: 'John Doe' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Notification Context
const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      removeNotification 
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

// Combined Provider Component
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

// Component using multiple contexts
function Header() {
  const { user, logout } = useAuth();
  const { addNotification } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const { cartTotals } = useCart();
  
  const handleLogout = () => {
    logout();
    addNotification('Logged out successfully', 'success');
  };
  
  return (
    <header style={{ 
      padding: '10px 20px', 
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>My Store</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>Cart: {cartTotals.itemCount} items</span>
        
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        {user ? (
          <div>
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <span>Please log in</span>
        )}
      </div>
    </header>
  );
}

// Main app with all providers
function App() {
  return (
    <AppProviders>
      <div>
        <Header />
        <NotificationDisplay />
        <ShoppingApp />
      </div>
    </AppProviders>
  );
}
```

---

## 🔴 ADVANCED LEVEL - PRODUCTION PATTERNS

### 6. Advanced Context with Performance Optimization
```jsx
import React, { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback, 
  useMemo,
  useEffect 
} from 'react';

// Performance-optimized context that splits state and actions
const AppStateContext = createContext();
const AppActionsContext = createContext();

// Complex application state
const initialState = {
  user: null,
  products: [],
  cart: { items: [], total: 0 },
  ui: {
    loading: false,
    errors: {},
    modals: {},
    notifications: []
  },
  settings: {
    theme: 'light',
    language: 'en',
    currency: 'USD'
  }
};

// Action types
const ActionTypes = {
  // User actions
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  
  // Product actions
  SET_PRODUCTS: 'SET_PRODUCTS',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  
  // Cart actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  
  // UI actions
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  
  // Settings actions
  UPDATE_SETTINGS: 'UPDATE_SETTINGS'
};

// Complex reducer with nested updates
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        cart: { items: [], total: 0 }
      };
    
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    
    case ActionTypes.ADD_TO_CART:
      const existingItemIndex = state.cart.items.findIndex(
        item => item.id === action.payload.id
      );
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.cart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.cart.items, { ...action.payload, quantity: 1 }];
      }
      
      const newTotal = updatedItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
      
      return {
        ...state,
        cart: {
          items: updatedItems,
          total: newTotal
        }
      };
    
    case ActionTypes.REMOVE_FROM_CART:
      const filteredItems = state.cart.items.filter(
        item => item.id !== action.payload
      );
      const filteredTotal = filteredItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
      
      return {
        ...state,
        cart: {
          items: filteredItems,
          total: filteredTotal
        }
      };
    
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: action.payload
        }
      };
    
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: {
            ...state.ui.errors,
            [action.payload.key]: action.payload.message
          }
        }
      };
    
    case ActionTypes.CLEAR_ERROR:
      const { [action.payload]: removed, ...remainingErrors } = state.ui.errors;
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: remainingErrors
        }
      };
    
    case ActionTypes.ADD_NOTIFICATION:
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
    
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(
            notif => notif.id !== action.payload
          )
        }
      };
    
    case ActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };
    
    default:
      return state;
  }
}

// Provider component with performance optimizations
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Memoized action creators to prevent unnecessary re-renders
  const actions = useMemo(() => ({
    // User actions
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    logoutUser: () => dispatch({ type: ActionTypes.LOGOUT_USER }),
    
    // Product actions
    setProducts: (products) => dispatch({ type: ActionTypes.SET_PRODUCTS, payload: products }),
    
    // Cart actions
    addToCart: (product) => dispatch({ type: ActionTypes.ADD_TO_CART, payload: product }),
    removeFromCart: (productId) => dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId }),
    clearCart: () => dispatch({ type: ActionTypes.CLEAR_CART }),
    
    // UI actions
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (key, message) => dispatch({ 
      type: ActionTypes.SET_ERROR, 
      payload: { key, message } 
    }),
    clearError: (key) => dispatch({ type: ActionTypes.CLEAR_ERROR, payload: key }),
    addNotification: (message, type = 'info') => dispatch({ 
      type: ActionTypes.ADD_NOTIFICATION, 
      payload: { message, type } 
    }),
    removeNotification: (id) => dispatch({ 
      type: ActionTypes.REMOVE_NOTIFICATION, 
      payload: id 
    }),
    
    // Settings actions
    updateSettings: (settings) => dispatch({ 
      type: ActionTypes.UPDATE_SETTINGS, 
      payload: settings 
    })
  }), []);
  
  // Persist state to localStorage
  useEffect(() => {
    const stateToSave = {
      user: state.user,
      cart: state.cart,
      settings: state.settings
    };
    localStorage.setItem('appState', JSON.stringify(stateToSave));
  }, [state.user, state.cart, state.settings]);
  
  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.user) actions.setUser(parsedState.user);
        if (parsedState.settings) actions.updateSettings(parsedState.settings);
        // Note: Cart should be handled separately for security
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, [actions]);
  
  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={actions}>
        {children}
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  );
}

// Custom hooks for accessing state and actions separately
function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return state;
}

function useAppActions() {
  const actions = useContext(AppActionsContext);
  if (!actions) {
    throw new Error('useAppActions must be used within AppProvider');
  }
  return actions;
}

// Selector hook for performance optimization
function useAppSelector(selector) {
  const state = useAppState();
  return useMemo(() => selector(state), [state, selector]);
}

// Example usage with selectors
function ProductGrid() {
  // Only re-render when products change
  const products = useAppSelector(state => state.products);
  const { addToCart } = useAppActions();
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={() => addToCart(product)} 
        />
      ))}
    </div>
  );
}

function CartSummary() {
  // Only re-render when cart changes
  const cart = useAppSelector(state => state.cart);
  const { removeFromCart, clearCart } = useAppActions();
  
  return (
    <div>
      <h3>Cart Summary</h3>
      <p>Items: {cart.items.length}</p>
      <p>Total: ${cart.total.toFixed(2)}</p>
      {cart.items.map(item => (
        <div key={item.id}>
          <span>{item.name} x {item.quantity}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      {cart.items.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
  );
}
```

### 7. Real-World E-commerce Application Architecture
```jsx
// Production-level e-commerce context structure
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// API Service Layer
class ApiService {
  static baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  
  static async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  // User API methods
  static async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }
  
  static async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }
  
  static async getProfile() {
    return this.request('/user/profile');
  }
  
  // Product API methods
  static async getProducts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/products?${queryParams}`);
  }
  
  static async getProduct(id) {
    return this.request(`/products/${id}`);
  }
  
  // Cart API methods
  static async getCart() {
    return this.request('/cart');
  }
  
  static async addToCart(productId, quantity = 1) {
    return this.request('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    });
  }
  
  static async updateCartItem(itemId, quantity) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  }
  
  static async removeFromCart(itemId) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'DELETE'
    });
  }
  
  // Order API methods
  static async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }
  
  static async getOrders() {
    return this.request('/orders');
  }
}

// Global app context for e-commerce
const EcommerceContext = createContext();

// Action types
const ACTIONS = {
  // Loading states
  SET_GLOBAL_LOADING: 'SET_GLOBAL_LOADING',
  SET_OPERATION_LOADING: 'SET_OPERATION_LOADING',
  
  // Auth
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  
  // Products
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_PRODUCT_FILTERS: 'SET_PRODUCT_FILTERS',
  SET_FEATURED_PRODUCTS: 'SET_FEATURED_PRODUCTS',
  
  // Cart
  SET_CART: 'SET_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  
  // Orders
  SET_ORDERS: 'SET_ORDERS',
  ADD_ORDER: 'ADD_ORDER',
  
  // UI
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  
  // Search
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS'
};

// Initial state
const initialState = {
  // Auth state
  user: null,
  isAuthenticated: false,
  authLoading: false,
  
  // Product state
  products: [],
  featuredProducts: [],
  productFilters: {
    category: '',
    priceRange: [0, 1000],
    sortBy: 'name',
    inStock: true
  },
  
  // Cart state
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
    shipping: 0,
    tax: 0,
    grandTotal: 0
  },
  
  // Order state
  orders: [],
  
  // Search state
  searchQuery: '',
  searchResults: [],
  
  // UI state
  loading: {
    global: false,
    products: false,
    cart: false,
    orders: false
  },
  errors: {},
  notifications: [],
  modals: {
    cart: false,
    login: false,
    productQuickView: false
  }
};

// Complex reducer for e-commerce state
function ecommerceReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_GLOBAL_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: action.payload
        }
      };
    
    case ACTIONS.SET_OPERATION_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.operation]: action.payload.loading
        }
      };
    
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        authLoading: false,
        errors: { ...state.errors, auth: null }
      };
    
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authLoading: false,
        errors: { ...state.errors, auth: action.payload }
      };
    
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: initialState.cart,
        orders: []
      };
    
    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    
    case ACTIONS.SET_CART:
      const cartData = action.payload;
      return {
        ...state,
        cart: {
          ...cartData,
          itemCount: cartData.items.reduce((count, item) => count + item.quantity, 0),
          grandTotal: cartData.total + cartData.shipping + cartData.tax
        }
      };
    
    case ACTIONS.SET_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            ...action.payload,
            timestamp: new Date()
          }
        ]
      };
    
    case ACTIONS.CLEAR_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    
    case ACTIONS.TOGGLE_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modal]: action.payload.isOpen
        }
      };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    
    case ACTIONS.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    
    default:
      return state;
  }
}

// E-commerce provider component
function EcommerceProvider({ children }) {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);
  
  // Authentication methods
  const login = async (credentials) => {
    dispatch({ type: ACTIONS.SET_OPERATION_LOADING, payload: { operation: 'auth', loading: true } });
    
    try {
      const response = await ApiService.login(credentials);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: response });
      dispatch({ type: ACTIONS.SET_NOTIFICATION, payload: { 
        message: 'Login successful!', 
        type: 'success' 
      }});
      
      // Load user's cart after successful login
      await loadCart();
      
    } catch (error) {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: error.message });
      dispatch({ type: ACTIONS.SET_NOTIFICATION, payload: { 
        message: 'Login failed. Please try again.', 
        type: 'error' 
      }});
    }
  };
  
  const logout = async () => {
    try {
      await ApiService.logout();
      localStorage.removeItem('authToken');
      dispatch({ type: ACTIONS.LOGOUT });
      dispatch({ type: ACTIONS.SET_NOTIFICATION, payload: { 
        message: 'Logged out successfully', 
        type: 'info' 
      }});
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Product methods
  const loadProducts = async (filters = {}) => {
    dispatch({ type: ACTIONS.SET_OPERATION_LOADING, payload: { operation: 'products', loading: true } });
    
    try {
      const products = await ApiService.getProducts(filters);
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: { key: 'products', message: error.message } });
    } finally {
      dispatch({ type: ACTIONS.SET_OPERATION_LOADING, payload: { operation: 'products', loading: false } });
    }
  };
  
  // Cart methods
  const loadCart = async () => {
    if (!state.isAuthenticated) return;
    
    try {
      const cart = await ApiService.getCart();
      dispatch({ type: ACTIONS.SET_CART, payload: cart });
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };
  
  const addToCart = async (productId, quantity = 1) => {
    if (!state.isAuthenticated) {
      dispatch({ type: ACTIONS.TOGGLE_MODAL, payload: { modal: 'login', isOpen: true } });
      return;
    }
    
    try {
      const updatedCart = await ApiService.addToCart(productId, quantity);
      dispatch({ type: ACTIONS.SET_CART, payload: updatedCart });
      dispatch({ type: ACTIONS.SET_NOTIFICATION, payload: { 
        message: 'Item added to cart!', 
        type: 'success' 
      }});
    } catch (error) {
      dispatch({ type: ACTIONS.SET_NOTIFICATION, payload: { 
        message: 'Failed to add item to cart', 
        type: 'error' 
      }});
    }
  };
  
  // Search methods
  const search = async (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
    
    if (query.trim() === '') {
      dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: [] });
      return;
    }
    
    try {
      const results = await ApiService.getProducts({ search: query });
      dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: results });
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  
  // Load initial data
  useEffect(() => {
    loadProducts();
    
    // Check for existing auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token and load user profile
      ApiService.getProfile()
        .then(user => {
          dispatch({ type: ACTIONS.SET_USER, payload: user });
          loadCart();
        })
        .catch(() => {
          localStorage.removeItem('authToken');
        });
    }
  }, []);
  
  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    state.notifications.forEach(notification => {
      setTimeout(() => {
        dispatch({ type: ACTIONS.CLEAR_NOTIFICATION, payload: notification.id });
      }, 5000);
    });
  }, [state.notifications]);
  
  const contextValue = {
    // State
    ...state,
    
    // Auth methods
    login,
    logout,
    
    // Product methods
    loadProducts,
    
    // Cart methods
    addToCart,
    loadCart,
    
    // Search methods
    search,
    
    // UI methods
    toggleModal: (modal, isOpen) => dispatch({ 
      type: ACTIONS.TOGGLE_MODAL, 
      payload: { modal, isOpen } 
    }),
    addNotification: (message, type) => dispatch({ 
      type: ACTIONS.SET_NOTIFICATION, 
      payload: { message, type } 
    }),
    clearNotification: (id) => dispatch({ 
      type: ACTIONS.CLEAR_NOTIFICATION, 
      payload: id 
    })
  };
  
  return (
    <EcommerceContext.Provider value={contextValue}>
      {children}
    </EcommerceContext.Provider>
  );
}

// Custom hook for using e-commerce context
function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within EcommerceProvider');
  }
  return context;
}

// Main app component
function App() {
  return (
    <EcommerceProvider>
      <div className="app">
        <Header />
        <NotificationCenter />
        <MainContent />
        <ModalManager />
      </div>
    </EcommerceProvider>
  );
}

// Header component using multiple context features
function Header() {
  const { 
    user, 
    isAuthenticated, 
    cart, 
    searchQuery, 
    search, 
    toggleModal,
    logout 
  } = useEcommerce();
  
  return (
    <header style={{ 
      padding: '10px 20px', 
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>E-Commerce Store</h1>
      
      {/* Search bar */}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
          placeholder="Search products..."
          style={{ padding: '8px', width: '300px' }}
        />
      </div>
      
      {/* User actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Cart icon */}
        <button 
          onClick={() => toggleModal('cart', true)}
          style={{ position: 'relative' }}
        >
          🛒 Cart
          {cart.itemCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px'
            }}>
              {cart.itemCount}
            </span>
          )}
        </button>
        
        {/* User menu */}
        {isAuthenticated ? (
          <div>
            <span>Welcome, {user?.name}!</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={() => toggleModal('login', true)}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
```

---

## 📚 KEY PRODUCTION PATTERNS

### When to Use Context API:
1. **Theme Management** - App-wide styling and dark/light mode
2. **Authentication State** - User login status, permissions
3. **Shopping Cart** - E-commerce cart state across components
4. **Language/Localization** - Multi-language support
5. **Global UI State** - Modals, notifications, loading states

### Performance Best Practices:
1. **Split Contexts** - Separate frequently changing data from stable data
2. **Use Multiple Contexts** - Don't put everything in one context
3. **Memoize Context Values** - Use useMemo to prevent unnecessary re-renders
4. **Selector Pattern** - Create custom hooks for specific data selection
5. **Lazy Loading** - Load context data only when needed

### Common Mistakes to Avoid:
1. **Over-using Context** - Not everything needs to be in context
2. **Large Context Objects** - Split large contexts into smaller ones
3. **Frequent Updates** - Don't put rapidly changing data in context
4. **No Error Boundaries** - Always handle context errors gracefully
5. **Not Optimizing Re-renders** - Use React.memo and useMemo appropriately

### Real-World Integration:
- **State + useEffect + Context** work together for complete data management
- **API calls in useEffect** update context state
- **Context provides global state** while components manage local state
- **Error boundaries** protect context consumers from crashes
- **Performance optimization** with memoization and selective subscriptions

Context API is essential for building scalable React applications that need to share state across multiple components while maintaining clean, maintainable code architecture!