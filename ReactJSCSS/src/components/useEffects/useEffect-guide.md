# React useEffect Hook - Complete Guide (Beginner to Advanced)

## What is useEffect?
useEffect is a React Hook that lets you perform side effects in functional components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined in class components.

---

## 🟢 BASIC LEVEL

### 1. What are Side Effects?
Side effects are operations that affect something outside the scope of the current function:
- **Data fetching** (API calls)
- **Setting up subscriptions** (WebSocket connections)
- **Manually changing the DOM** (document.title)
- **Timers** (setTimeout, setInterval)
- **Cleanup operations** (removing event listeners)

```jsx
// Examples of side effects:
fetch('/api/data')           // API call
document.title = 'New Title' // DOM manipulation
localStorage.setItem()       // Browser storage
console.log()               // Logging
```

### 2. Basic useEffect Syntax
```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Side effect code goes here
  console.log('Component rendered or updated');
});

// Syntax breakdown:
// useEffect(effectFunction, dependencyArray?)
// effectFunction: Function that contains side effect logic
// dependencyArray: Optional array that controls when effect runs
```

### 3. useEffect Without Dependencies (Runs on Every Render)
```jsx
import { useState, useEffect } from 'react';

function CounterWithEffect() {
  const [count, setCount] = useState(0);

  // This effect runs after EVERY render (mount + updates)
  useEffect(() => {
    console.log('Component rendered! Count is:', count);
    // This runs every time count changes OR component re-renders for any reason
  });

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <p>Check console - effect runs on every render!</p>
    </div>
  );
}
```

### 4. useEffect with Empty Dependency Array (Runs Only Once)
```jsx
import { useState, useEffect } from 'react';

function ComponentDidMountExample() {
  const [message, setMessage] = useState('Loading...');

  // This effect runs only ONCE after the first render (like componentDidMount)
  useEffect(() => {
    console.log('Component mounted - this runs only once!');
    
    // Simulate API call or initialization
    setTimeout(() => {
      setMessage('Welcome! Component has loaded.');
    }, 2000);
    
  }, []); // Empty dependency array = run only once

  return (
    <div>
      <h2>{message}</h2>
      <p>This effect only ran once when component mounted</p>
    </div>
  );
}
```

### 5. useEffect with Specific Dependencies
```jsx
import { useState, useEffect } from 'react';

function UserProfile() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // This effect runs when 'userId' changes
  useEffect(() => {
    console.log('Fetching user data for ID:', userId);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUserData({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
      });
      setLoading(false);
    }, 1000);
    
  }, [userId]); // Effect runs when userId changes

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <button onClick={() => setUserId(1)}>User 1</button>
        <button onClick={() => setUserId(2)}>User 2</button>
        <button onClick={() => setUserId(3)}>User 3</button>
      </div>
      
      {loading ? (
        <p>Loading user data...</p>
      ) : userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
}
```

### 6. Cleanup Function (Preventing Memory Leaks)
```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      // Set up the timer
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      console.log('Timer started');
    }

    // Cleanup function - runs when effect is cleaned up
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log('Timer cleaned up');
      }
    };
  }, [isActive]); // Effect runs when isActive changes

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div>
      <h2>Timer: {seconds} seconds</h2>
      <button onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

## 🟡 INTERMEDIATE LEVEL

### 7. Data Fetching with useEffect
```jsx
import { useState, useEffect } from 'react';

function PostsList() {
  const [posts, setPosts] = useState([]); // Array to store posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Function to fetch posts from API
    const fetchPosts = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear any previous errors
        
        // Make API call
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON data
        const postsData = await response.json();
        
        // Update state with fetched data
        setPosts(postsData.slice(0, 10)); // Only show first 10 posts
        
      } catch (err) {
        // Handle any errors
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        // Always stop loading, whether success or error
        setLoading(false);
      }
    };

    fetchPosts(); // Call the function
  }, []); // Empty dependency array - fetch only once on mount

  // Render loading state
  if (loading) {
    return <div>Loading posts...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render posts list
  return (
    <div>
      <h2>Posts ({posts.length})</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
```

### 8. Multiple useEffect Hooks
```jsx
import { useState, useEffect } from 'react';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  // Effect 1: Fetch user data (runs once)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        const userData = await response.json();
        setUser(userData);
        console.log('User data loaded');
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []); // Runs only once on mount

  // Effect 2: Set up document title (runs when user changes)
  useEffect(() => {
    if (user) {
      document.title = `Dashboard - ${user.name}`;
      console.log('Document title updated');
    }
    
    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = 'My App';
    };
  }, [user]); // Runs when user state changes

  // Effect 3: Fetch notifications (runs when user changes)
  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch(`/api/notifications?userId=${user.id}`);
          const notifData = await response.json();
          setNotifications(notifData);
          console.log('Notifications loaded');
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [user]); // Runs when user changes

  // Effect 4: Online/offline status listener (runs once)
  useEffect(() => {
    // Functions to handle online/offline events
    const handleOnline = () => {
      setOnlineStatus(true);
      console.log('User came online');
    };

    const handleOffline = () => {
      setOnlineStatus(false);
      console.log('User went offline');
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup: Remove event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Runs only once

  return (
    <div>
      <h1>User Dashboard</h1>
      
      {/* Online status indicator */}
      <div style={{ 
        padding: '10px', 
        backgroundColor: onlineStatus ? 'green' : 'red', 
        color: 'white' 
      }}>
        Status: {onlineStatus ? 'Online' : 'Offline'}
      </div>

      {/* User information */}
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user...</p>
      )}

      {/* Notifications */}
      <div>
        <h3>Notifications ({notifications.length})</h3>
        {notifications.map(notif => (
          <div key={notif.id} style={{ padding: '5px', border: '1px solid #ddd' }}>
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 9. Custom Hook with useEffect
```jsx
import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useApiData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip if no URL provided
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-fetch when URL changes

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Component using custom hooks
function ProductPage({ productId }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const { data: product, loading, error } = useApiData(
    productId ? `/api/products/${productId}` : null
  );

  const toggleFavorite = () => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      
      <button onClick={toggleFavorite}>
        {favorites.includes(productId) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
      </button>
    </div>
  );
}
```

---

## 🔴 ADVANCED LEVEL

### 10. useEffect with Async/Await and AbortController
```jsx
import { useState, useEffect } from 'react';

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip search if term is empty
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    // Create AbortController to cancel requests
    const abortController = new AbortController();
    
    const searchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Make API call with abort signal
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`, {
          signal: abortController.signal // This allows cancellation
        });

        // Check if request was aborted
        if (abortController.signal.aborted) {
          return;
        }

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.results);
        
      } catch (err) {
        // Ignore abort errors
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce search: wait 500ms after user stops typing
    const timeoutId = setTimeout(() => {
      searchProducts();
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId); // Cancel timeout
      abortController.abort(); // Cancel ongoing request
    };
  }, [searchTerm]); // Run when search term changes

  return (
    <div>
      <h2>Product Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        style={{ width: '300px', padding: '10px' }}
      />

      {loading && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}
      
      <div>
        {results.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 11. Complex State Management with useEffect
```jsx
import { useState, useEffect, useReducer } from 'react';

// Reducer for complex state management
function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'SET_DISCOUNT':
      return { ...state, discount: action.payload };

    default:
      return state;
  }
}

function ShoppingCart() {
  const [cartState, dispatch] = useReducer(shoppingCartReducer, {
    items: [],
    discount: 0
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect 1: Load available products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Effect 2: Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  // Effect 3: Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Restore each item to the cart
        parsedCart.items.forEach(item => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
        if (parsedCart.discount) {
          dispatch({ type: 'SET_DISCOUNT', payload: parsedCart.discount });
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Effect 4: Calculate and update totals
  const [totals, setTotals] = useState({ subtotal: 0, total: 0 });
  
  useEffect(() => {
    const subtotal = cartState.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    const discountAmount = subtotal * (cartState.discount / 100);
    const total = subtotal - discountAmount;

    setTotals({ subtotal, total, discountAmount });
  }, [cartState.items, cartState.discount]);

  // Effect 5: Auto-save cart to server (for logged-in users)
  useEffect(() => {
    const saveCartToServer = async () => {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartState)
        });
      } catch (error) {
        console.error('Failed to sync cart with server:', error);
      }
    };

    // Debounce server saves
    const timeoutId = setTimeout(saveCartToServer, 1000);
    return () => clearTimeout(timeoutId);
  }, [cartState]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Products List */}
      <div style={{ flex: 2 }}>
        <h2>Products</h2>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px' }}>
        <h2>Shopping Cart ({cartState.items.length} items)</h2>
        
        {cartState.items.map(item => (
          <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span style={{ margin: '0 10px' }}>Qty: {item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}

        {/* Totals */}
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
          <p>Subtotal: ${totals.subtotal.toFixed(2)}</p>
          {cartState.discount > 0 && (
            <p>Discount ({cartState.discount}%): -${totals.discountAmount.toFixed(2)}</p>
          )}
          <h3>Total: ${totals.total.toFixed(2)}</h3>
        </div>

        {/* Discount Input */}
        <div style={{ marginTop: '10px' }}>
          <label>
            Discount %: 
            <input
              type="number"
              value={cartState.discount}
              onChange={(e) => dispatch({ 
                type: 'SET_DISCOUNT', 
                payload: parseFloat(e.target.value) || 0 
              })}
              min="0"
              max="100"
            />
          </label>
        </div>

        <button 
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
          style={{ marginTop: '10px', width: '100%' }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
```

---

## 🌐 REAL-WORLD APPLICATIONS

### 12. Social Media Feed with Real-time Updates
```jsx
import { useState, useEffect, useCallback } from 'react';

function SocialMediaFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [lastPostId, setLastPostId] = useState(null);

  // Effect 1: Initial posts load
  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        const response = await fetch('/api/feed');
        const initialPosts = await response.json();
        setPosts(initialPosts);
        setLastPostId(initialPosts[0]?.id);
      } catch (error) {
        console.error('Failed to load initial posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  // Effect 2: Real-time updates via WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001/feed');
    
    ws.onmessage = (event) => {
      const newPost = JSON.parse(event.data);
      
      // Add new post to the beginning of the array
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      // Increment new posts counter
      setNewPostsCount(prev => prev + 1);
      
      // Update last post ID
      setLastPostId(newPost.id);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup: Close WebSocket connection
    return () => {
      ws.close();
    };
  }, []);

  // Effect 3: Document visibility change (pause updates when tab is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && newPostsCount > 0) {
        // Reset counter when user returns to tab
        setNewPostsCount(0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [newPostsCount]);

  // Effect 4: Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/feed/updates?since=${lastPostId}`);
        const newPosts = await response.json();
        
        if (newPosts.length > 0) {
          setPosts(prevPosts => [...newPosts, ...prevPosts]);
          setNewPostsCount(prev => prev + newPosts.length);
          setLastPostId(newPosts[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch updates:', error);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [lastPostId]);

  const markAsRead = useCallback(() => {
    setNewPostsCount(0);
  }, []);

  if (loading) {
    return <div>Loading your feed...</div>;
  }

  return (
    <div>
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '10px' }}>
        <h1>Social Media Feed</h1>
        {newPostsCount > 0 && (
          <div style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', borderRadius: '5px' }}>
            {newPostsCount} new post{newPostsCount > 1 ? 's' : ''} available
            <button onClick={markAsRead} style={{ marginLeft: '10px' }}>
              Mark as Read
            </button>
          </div>
        )}
      </header>

      <div>
        {posts.map(post => (
          <article key={post.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px' }}>
            <header>
              <h3>{post.author.name}</h3>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </header>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post content" style={{ maxWidth: '100%' }} />}
            <footer>
              <button>👍 Like ({post.likes})</button>
              <button>💬 Comment ({post.comments})</button>
              <button>🔄 Share</button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### 13. E-commerce Product Tracking
```jsx
import { useState, useEffect } from 'react';

function ProductTracker({ productId }) {
  const [product, setProduct] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [isWatching, setIsWatching] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Effect 1: Load product data
  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const productData = await response.json();
        setProduct(productData);
        
        // Load price history
        const historyResponse = await fetch(`/api/products/${productId}/price-history`);
        const historyData = await historyResponse.json();
        setPriceHistory(historyData);
        
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    };

    loadProduct();
  }, [productId]);

  // Effect 2: Check if user is watching this product
  useEffect(() => {
    if (!productId) return;

    const checkWatchStatus = async () => {
      try {
        const response = await fetch(`/api/watchlist/${productId}`);
        const { isWatching } = await response.json();
        setIsWatching(isWatching);
      } catch (error) {
        console.error('Failed to check watch status:', error);
      }
    };

    checkWatchStatus();
  }, [productId]);

  // Effect 3: Set up price monitoring WebSocket
  useEffect(() => {
    if (!productId || !isWatching) return;

    const ws = new WebSocket(`ws://localhost:3001/price-monitor/${productId}`);
    
    ws.onmessage = (event) => {
      const priceUpdate = JSON.parse(event.data);
      
      // Update product price
      setProduct(prev => prev ? { ...prev, price: priceUpdate.newPrice } : null);
      
      // Add to price history
      setPriceHistory(prev => [priceUpdate, ...prev]);
      
      // Create notification
      const notification = {
        id: Date.now(),
        message: `Price changed from $${priceUpdate.oldPrice} to $${priceUpdate.newPrice}`,
        type: priceUpdate.newPrice < priceUpdate.oldPrice ? 'price-drop' : 'price-increase',
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
    };

    return () => ws.close();
  }, [productId, isWatching]);

  // Effect 4: Browser notifications for price drops
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.type === 'price-drop' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Price Drop Alert!', {
          body: notification.message,
          icon: product?.image,
          tag: `price-drop-${productId}` // Prevent duplicate notifications
        });
      }
    });
  }, [notifications, product, productId]);

  // Effect 5: Save viewing history
  useEffect(() => {
    if (!product) return;

    const saveToHistory = () => {
      const viewHistory = JSON.parse(localStorage.getItem('viewHistory') || '[]');
      const newEntry = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        viewedAt: new Date().toISOString()
      };
      
      // Remove existing entry for this product
      const filteredHistory = viewHistory.filter(item => item.productId !== product.id);
      
      // Add to beginning and keep last 20 items
      const updatedHistory = [newEntry, ...filteredHistory].slice(0, 20);
      
      localStorage.setItem('viewHistory', JSON.stringify(updatedHistory));
    };

    saveToHistory();
  }, [product]);

  const toggleWatchlist = async () => {
    try {
      const method = isWatching ? 'DELETE' : 'POST';
      await fetch(`/api/watchlist/${productId}`, { method });
      setIsWatching(!isWatching);
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Product Info */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
            ${product.price}
          </p>
          <p>{product.description}</p>
          
          <button 
            onClick={toggleWatchlist}
            style={{
              padding: '10px 20px',
              backgroundColor: isWatching ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            {isWatching ? '👁️ Stop Watching' : '👁️ Watch Price'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Price Alerts</h3>
          {notifications.map(notif => (
            <div 
              key={notif.id}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: notif.type === 'price-drop' ? '#d4edda' : '#fff3cd',
                border: `1px solid ${notif.type === 'price-drop' ? '#c3e6cb' : '#ffeaa7'}`,
                borderRadius: '5px'
              }}
            >
              <span>{notif.message}</span>
              <small style={{ float: 'right' }}>
                {notif.timestamp.toLocaleTimeString()}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* Price History */}
      <div>
        <h3>Price History</h3>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {priceHistory.map((entry, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px',
                borderBottom: '1px solid #eee'
              }}
            >
              <span>${entry.price}</span>
              <span>{new Date(entry.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 📚 KEY LEARNING POINTS

### useEffect Patterns:
1. **No Dependencies** - `useEffect(() => {})` - Runs on every render
2. **Empty Dependencies** - `useEffect(() => {}, [])` - Runs once on mount
3. **Specific Dependencies** - `useEffect(() => {}, [value])` - Runs when value changes
4. **Cleanup Function** - `return () => {}` - Cleanup side effects

### Common Use Cases:
- **Data Fetching** - API calls, loading data
- **Subscriptions** - WebSocket connections, event listeners
- **Timers** - setTimeout, setInterval
- **DOM Manipulation** - Document title, focus management
- **Local Storage** - Saving/loading user preferences

### Best Practices:
1. **Always include dependencies** that are used inside the effect
2. **Use cleanup functions** to prevent memory leaks
3. **Separate concerns** - Use multiple useEffect hooks for different logic
4. **Handle async operations properly** - Use AbortController for cancellation
5. **Optimize with custom hooks** - Extract reusable effect logic

### Performance Tips:
- **Debounce expensive operations** (API calls, searches)
- **Use AbortController** to cancel outdated requests
- **Memoize expensive calculations** with useMemo
- **Split effects** to minimize unnecessary re-runs

useEffect is the most powerful hook for managing side effects and is essential for building real-world React applications that interact with APIs, handle user events, and manage complex state!