# React Conditional Rendering - Complete Guide

## What is Conditional Rendering?
Conditional rendering in React allows you to render different components or elements based on certain conditions. It's like using if-else statements in JavaScript, but within JSX.

---

## 🟢 BASIC LEVEL

### 1. If-Else Statement (Traditional Way)
```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

// Usage
<Greeting isLoggedIn={true} />  // Shows: Welcome back!
<Greeting isLoggedIn={false} /> // Shows: Please sign in.
```

### 2. Ternary Operator (Most Common)
```jsx
function UserStatus({ isOnline }) {
  return (
    <div>
      <p>User is {isOnline ? "Online" : "Offline"}</p>
    </div>
  );
}

// Usage
<UserStatus isOnline={true} />  // User is Online
<UserStatus isOnline={false} /> // User is Offline
```

### 3. Logical AND (&&) Operator
```jsx
function Notification({ hasMessage, message }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {hasMessage && <p>New message: {message}</p>}
    </div>
  );
}

// Usage
<Notification hasMessage={true} message="Hello!" />  // Shows message
<Notification hasMessage={false} />                  // No message shown
```

---

## 🟡 MEDIUM LEVEL

### 4. Multiple Conditions with Ternary
```jsx
function UserRole({ role }) {
  return (
    <div>
      <h3>
        {role === "admin" ? "Administrator" : 
         role === "user" ? "Regular User" : 
         "Guest"}
      </h3>
    </div>
  );
}

// Usage
<UserRole role="admin" />  // Administrator
<UserRole role="user" />   // Regular User
<UserRole role="guest" />  // Guest
```

### 5. Complex Conditions with Variables
```jsx
function ProductCard({ product, user }) {
  const isOwner = user.id === product.ownerId;
  const isAdmin = user.role === "admin";
  const canEdit = isOwner || isAdmin;
  const isExpired = new Date(product.expiry) < new Date();

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      
      {isExpired && <p style={{color: 'red'}}>EXPIRED</p>}
      {canEdit && <button>Edit Product</button>}
      {isAdmin && <button>Delete Product</button>}
    </div>
  );
}
```

### 6. Conditional CSS Classes
```jsx
function Button({ isActive, isPrimary, children }) {
  const buttonClass = `btn ${isActive ? 'btn-active' : 'btn-inactive'} ${isPrimary ? 'btn-primary' : 'btn-secondary'}`;
  
  return (
    <button className={buttonClass}>
      {children}
    </button>
  );
}

// Usage
<Button isActive={true} isPrimary={true}>Save</Button>
```

### 7. Early Return Pattern
```jsx
function UserProfile({ user }) {
  // Early return for loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  // Early return for error state
  if (user.error) {
    return <div>Error: {user.error}</div>;
  }

  // Main render
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## 🔴 ADVANCED LEVEL

### 8. Switch-Case Pattern with Objects
```jsx
function StatusIcon({ status }) {
  const statusConfig = {
    success: { icon: "✅", color: "green", text: "Success" },
    error: { icon: "❌", color: "red", text: "Error" },
    warning: { icon: "⚠️", color: "orange", text: "Warning" },
    info: { icon: "ℹ️", color: "blue", text: "Info" }
  };

  const config = statusConfig[status] || statusConfig.info;

  return (
    <div style={{ color: config.color }}>
      {config.icon} {config.text}
    </div>
  );
}
```

### 9. Conditional Rendering with Arrays
```jsx
function PermissionsList({ userPermissions, allPermissions }) {
  return (
    <div>
      <h3>Your Permissions:</h3>
      <ul>
        {allPermissions.map(permission => (
          <li key={permission}>
            {permission}
            {userPermissions.includes(permission) ? " ✅" : " ❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 10. Nested Conditional Rendering
```jsx
function Dashboard({ user, notifications, settings }) {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          
          {user.isPremium ? (
            <div>
              <h3>Premium Features</h3>
              {settings.showAdvanced && (
                <div>
                  <h4>Advanced Settings</h4>
                  {settings.features.map(feature => (
                    feature.enabled && <p key={feature.name}>{feature.name}</p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3>Upgrade to Premium</h3>
              <button>Upgrade Now</button>
            </div>
          )}
          
          {notifications && notifications.length > 0 && (
            <div>
              <h3>Notifications ({notifications.length})</h3>
              {notifications.map(notification => (
                <div key={notification.id}>
                  {notification.priority === "high" ? (
                    <strong style={{color: 'red'}}>{notification.message}</strong>
                  ) : (
                    <span>{notification.message}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
          <button>Login</button>
        </div>
      )}
    </div>
  );
}
```

---

## 📝 Best Practices and Common Patterns

### 1. Loading States
```jsx
function DataComponent({ isLoading, data, error }) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  
  return <div>Data: {data}</div>;
}
```

### 2. Authentication Guards
```jsx
function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <div>Access Denied</div>;
}

// Usage
<ProtectedRoute isAuthenticated={user.isLoggedIn}>
  <AdminPanel />
</ProtectedRoute>
```

### 3. Feature Flags
```jsx
function App({ features }) {
  return (
    <div>
      <Header />
      
      {features.showNewFeature && <NewFeature />}
      {features.enableChat && <ChatWidget />}
      {features.beta && <BetaFeatures />}
      
      <MainContent />
    </div>
  );
}
```

### 4. Conditional Form Fields
```jsx
function RegistrationForm({ userType }) {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      
      {userType === "business" && (
        <>
          <input type="text" placeholder="Company Name" />
          <input type="text" placeholder="Tax ID" />
        </>
      )}
      
      {userType === "individual" && (
        <input type="date" placeholder="Date of Birth" />
      )}
      
      <button type="submit">Register</button>
    </form>
  );
}
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Wrong: Using && with Numbers
```jsx
// ❌ Wrong - Will render 0 if count is 0
{count && <p>Count: {count}</p>}

// ✅ Correct - Explicitly check for truthy values
{count > 0 && <p>Count: {count}</p>}
// Or use ternary
{count ? <p>Count: {count}</p> : null}
```

### 2. Wrong: Complex Logic in JSX
```jsx
// ❌ Wrong - Hard to read
{user && user.permissions && user.permissions.includes('admin') && user.active && <AdminPanel />}

// ✅ Correct - Extract to variable
const canShowAdmin = user?.permissions?.includes('admin') && user?.active;
return (
  <div>
    {canShowAdmin && <AdminPanel />}
  </div>
);
```

### 3. Wrong: Forgetting Keys in Conditional Lists
```jsx
// ❌ Wrong - Missing keys
{items.map(item => 
  item.visible && <div>{item.name}</div>
)}

// ✅ Correct - Always include keys
{items.map(item => 
  item.visible && <div key={item.id}>{item.name}</div>
)}
```

---

## 🎯 Quick Reference

| Pattern | Use Case | Example |
|---------|----------|---------|
| `if/else` | Simple binary conditions | `if (isLoggedIn) return <Dashboard />` |
| `? :` | Inline binary conditions | `{isOnline ? "Online" : "Offline"}` |
| `&&` | Show/hide elements | `{hasData && <DataComponent />}` |
| `\|\|` | Fallback values | `{name \|\| "Guest"}` |
| Early return | Loading/error states | `if (loading) return <Spinner />` |
| Switch/Object | Multiple conditions | `statusConfig[status]` |

Remember: Keep conditions simple and readable. Extract complex logic into variables or separate functions!