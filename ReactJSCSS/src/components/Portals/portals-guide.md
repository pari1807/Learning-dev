# React Portals - Complete Guide (Beginner to Advanced)

## What are React Portals?
React Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. Think of it as a "teleportation" mechanism for your React components.

---

## 🟢 BASIC LEVEL

### 1. Why Do We Need Portals?
```jsx
// Normal React rendering follows DOM hierarchy:
<div id="root">
  <App>
    <Header>
      <Modal>  {/* Modal renders inside Header */}
        <p>I'm trapped inside the header!</p>
      </Modal>
    </Header>
  </App>
</div>

// With Portals, we can break out of this hierarchy:
<div id="root">
  <App>
    <Header>
      {/* Modal content appears here via portal */}
    </Header>
  </App>
</div>
<div id="modal-root">
  <Modal>  {/* Modal actually renders here! */}
    <p>I'm free to render anywhere!</p>
  </Modal>
</div>
```

### 2. Basic Portal Syntax
```jsx
import { createPortal } from 'react-dom';

// Basic syntax:
// createPortal(children, domNode)

function MyPortal() {
  return createPortal(
    <h1>This renders in a different place!</h1>,
    document.getElementById('portal-target')
  );
}
```

### 3. Simple Modal Example
```jsx
import { createPortal } from 'react-dom';
import { useState } from 'react';

function SimpleModal({ isOpen, onClose, children }) {
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Create portal to render modal outside normal DOM hierarchy
  return createPortal(
    <div style={{
      position: 'fixed',           // Fixed positioning to cover entire screen
      top: 0,                      // Start from top
      left: 0,                     // Start from left
      right: 0,                    // Extend to right
      bottom: 0,                   // Extend to bottom
      backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent overlay
      display: 'flex',             // Use flexbox for centering
      alignItems: 'center',        // Center vertically
      justifyContent: 'center'     // Center horizontally
    }}>
      <div style={{
        backgroundColor: 'white',   // White background for modal content
        padding: '20px',           // Inner spacing
        borderRadius: '8px',       // Rounded corners
        maxWidth: '500px',         // Maximum width
        width: '90%'               // Responsive width
      }}>
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{ float: 'right' }}
        >
          ×
        </button>
        {/* Modal content */}
        {children}
      </div>
    </div>,
    document.body  // Render directly into document.body
  );
}

// Usage Example:
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>My App</h1>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      
      <SimpleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <h2>Hello from Portal!</h2>
        <p>This modal is rendered outside the normal DOM tree.</p>
      </SimpleModal>
    </div>
  );
}
```

---

## 🟡 INTERMEDIATE LEVEL

### 4. Custom Portal Hook
```jsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Custom hook to create and manage portal container
function usePortal(id) {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    // Check if container already exists
    let element = document.getElementById(id);
    
    // If not, create it
    if (!element) {
      element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }
    
    setContainer(element);
    
    // Cleanup function to remove container when component unmounts
    return () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [id]);

  return container;
}

// Using the custom hook:
function PortalComponent({ children, id = 'portal-root' }) {
  const container = usePortal(id);
  
  // Return null if container is not ready
  if (!container) return null;
  
  // Create portal when container is ready
  return createPortal(children, container);
}
```

### 5. Advanced Modal with State Management
```jsx
import { createPortal } from 'react-dom';
import { useState, useEffect, useCallback } from 'react';

function AdvancedModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  closable = true,
  overlay = true 
}) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closable) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closable]);

  // Handle overlay click
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget && closable) {
      onClose();
    }
  }, [onClose, closable]);

  // Don't render if not open
  if (!isOpen) return null;

  // Size configurations
  const sizeStyles = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '600px' },
    large: { maxWidth: '800px' },
    fullscreen: { width: '100vw', height: '100vh', maxWidth: 'none', borderRadius: 0 }
  };

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: overlay ? 'rgba(0,0,0,0.6)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={handleOverlayClick}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          ...sizeStyles[size]
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Modal Header */}
        {(title || closable) && (
          <div style={{
            padding: '20px 20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee'
          }}>
            <h2 style={{ margin: 0, color: '#333' }}>{title}</h2>
            {closable && (
              <button 
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
            )}
          </div>
        )}
        
        {/* Modal Content */}
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

// Usage Example:
function ModalDemo() {
  const [modals, setModals] = useState({
    info: false,
    warning: false,
    fullscreen: false
  });

  const openModal = (type) => {
    setModals(prev => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModals(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Advanced Modal Examples</h1>
      
      <button onClick={() => openModal('info')}>Open Info Modal</button>
      <button onClick={() => openModal('warning')}>Open Warning Modal</button>
      <button onClick={() => openModal('fullscreen')}>Open Fullscreen Modal</button>

      {/* Info Modal */}
      <AdvancedModal
        isOpen={modals.info}
        onClose={() => closeModal('info')}
        title="Information"
        size="medium"
      >
        <p>This is an informational modal with medium size.</p>
        <button onClick={() => closeModal('info')}>Got it!</button>
      </AdvancedModal>

      {/* Warning Modal */}
      <AdvancedModal
        isOpen={modals.warning}
        onClose={() => closeModal('warning')}
        title="Warning"
        size="small"
        overlay={true}
      >
        <p style={{ color: 'red' }}>This is a warning modal!</p>
        <div>
          <button onClick={() => closeModal('warning')}>Cancel</button>
          <button onClick={() => closeModal('warning')}>Confirm</button>
        </div>
      </AdvancedModal>

      {/* Fullscreen Modal */}
      <AdvancedModal
        isOpen={modals.fullscreen}
        onClose={() => closeModal('fullscreen')}
        title="Fullscreen Experience"
        size="fullscreen"
      >
        <h2>Fullscreen Content</h2>
        <p>This modal takes up the entire screen!</p>
        <div style={{ height: '500px', backgroundColor: '#f0f0f0', padding: '20px' }}>
          <p>Lots of content here...</p>
        </div>
      </AdvancedModal>
    </div>
  );
}
```

---

## 🔴 ADVANCED LEVEL

### 6. Tooltip Portal System
```jsx
import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from 'react';

function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);

  // Calculate tooltip position based on trigger element
  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let x, y;

    switch (position) {
      case 'top':
        x = rect.left + scrollLeft + rect.width / 2;
        y = rect.top + scrollTop - 10;
        break;
      case 'bottom':
        x = rect.left + scrollLeft + rect.width / 2;
        y = rect.bottom + scrollTop + 10;
        break;
      case 'left':
        x = rect.left + scrollLeft - 10;
        y = rect.top + scrollTop + rect.height / 2;
        break;
      case 'right':
        x = rect.right + scrollLeft + 10;
        y = rect.top + scrollTop + rect.height / 2;
        break;
      default:
        x = rect.left + scrollLeft;
        y = rect.top + scrollTop;
    }

    setTooltipPosition({ x, y });
  };

  // Show tooltip
  const showTooltip = () => {
    calculatePosition();
    setIsVisible(true);
  };

  // Hide tooltip
  const hideTooltip = () => {
    setIsVisible(false);
  };

  // Recalculate position on scroll/resize
  useEffect(() => {
    if (isVisible) {
      const handleScroll = () => calculatePosition();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [isVisible, position]);

  return (
    <>
      {/* Trigger element */}
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </span>

      {/* Tooltip portal */}
      {isVisible && createPortal(
        <div
          style={{
            position: 'absolute',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: position === 'top' || position === 'bottom' 
              ? 'translateX(-50%)' 
              : position === 'left' 
                ? 'translate(-100%, -50%)' 
                : 'translateY(-50%)',
            backgroundColor: '#333',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}

// Usage:
function TooltipDemo() {
  return (
    <div style={{ padding: '100px' }}>
      <h2>Tooltip Examples</h2>
      
      <p>
        Hover over this 
        <Tooltip content="This is a top tooltip!" position="top">
          <strong style={{ color: 'blue', cursor: 'help' }}> blue text </strong>
        </Tooltip>
        to see a tooltip.
      </p>

      <p>
        <Tooltip content="Bottom tooltip with more content!" position="bottom">
          <button>Hover me (bottom)</button>
        </Tooltip>
      </p>

      <p>
        <Tooltip content="Left side tooltip" position="left">
          <span style={{ backgroundColor: 'yellow', padding: '5px' }}>Left tooltip</span>
        </Tooltip>
      </p>
    </div>
  );
}
```

### 7. Notification System with Portals
```jsx
import { createPortal } from 'react-dom';
import { useState, useEffect, createContext, useContext } from 'react';

// Context for notification system
const NotificationContext = createContext();

// Notification provider component
function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Function to add notification
  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);

    // Auto remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  };

  // Function to remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ 
      addNotification, 
      removeNotification, 
      clearAll 
    }}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  );
}

// Hook to use notifications
function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

// Notification container (rendered via portal)
function NotificationContainer({ notifications, onRemove }) {
  if (notifications.length === 0) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      maxWidth: '400px'
    }}>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => onRemove(notification.id)}
        />
      ))}
    </div>,
    document.body
  );
}

// Individual notification component
function NotificationItem({ notification, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);

  // Handle remove with animation
  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(onRemove, 300); // Wait for animation to complete
  };

  // Auto-remove timer visualization
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (notification.duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (notification.duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [notification.duration]);

  // Notification type styles
  const typeStyles = {
    success: { backgroundColor: '#4CAF50', borderLeft: '4px solid #2E7D32' },
    error: { backgroundColor: '#f44336', borderLeft: '4px solid #C62828' },
    warning: { backgroundColor: '#FF9800', borderLeft: '4px solid #E65100' },
    info: { backgroundColor: '#2196F3', borderLeft: '4px solid #1565C0' }
  };

  return (
    <div
      style={{
        ...typeStyles[notification.type],
        color: 'white',
        padding: '16px',
        margin: '8px 0',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
        opacity: isExiting ? 0 : 1,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onClick={handleRemove}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{notification.message}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0 0 0 10px'
          }}
        >
          ×
        </button>
      </div>
      
      {/* Progress bar */}
      {notification.duration > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            width: `${progress}%`,
            transition: 'width 0.1s linear'
          }}
        />
      )}
    </div>
  );
}

// Demo component
function NotificationDemo() {
  const { addNotification, clearAll } = useNotifications();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notification System Demo</h2>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => addNotification('Success! Operation completed.', 'success')}>
          Success Notification
        </button>
        
        <button onClick={() => addNotification('Error! Something went wrong.', 'error')}>
          Error Notification
        </button>
        
        <button onClick={() => addNotification('Warning! Please check your input.', 'warning')}>
          Warning Notification
        </button>
        
        <button onClick={() => addNotification('Info: New update available.', 'info')}>
          Info Notification
        </button>
        
        <button onClick={() => addNotification('This notification stays forever!', 'info', 0)}>
          Persistent Notification
        </button>
        
        <button onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
}

// Main app with notification provider
function App() {
  return (
    <NotificationProvider>
      <NotificationDemo />
    </NotificationProvider>
  );
}
```

---

## 🌐 REAL-WORLD APPLICATIONS

### 8. How Portals + State Work in Real Websites

#### E-commerce Product Gallery
```jsx
// Real-world example: Amazon-style product image viewer
function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div>
      {/* Main product image */}
      <img 
        src={product.images[selectedImage]}
        onClick={() => setIsLightboxOpen(true)}
        style={{ cursor: 'zoom-in' }}
      />
      
      {/* Thumbnail gallery */}
      <div className="thumbnails">
        {product.images.map((img, index) => (
          <img 
            key={index}
            src={img}
            onClick={() => setSelectedImage(index)}
            className={selectedImage === index ? 'active' : ''}
          />
        ))}
      </div>

      {/* Lightbox modal (rendered via portal) */}
      {isLightboxOpen && createPortal(
        <div className="lightbox-overlay">
          <div className="lightbox-content">
            <img 
              src={product.images[selectedImage]}
              className={isZoomed ? 'zoomed' : ''}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            <button onClick={() => setIsLightboxOpen(false)}>Close</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
```

#### Dashboard Notification System
```jsx
// Real-world example: Admin dashboard with live notifications
function AdminDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New order #${Math.floor(Math.random() * 1000)}`,
        type: 'info',
        timestamp: new Date()
      };
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      {/* Main dashboard content */}
      <header>
        <button onClick={() => setSidebarOpen(true)}>☰ Menu</button>
        <NotificationBell 
          count={notifications.length}
          onClick={() => setActiveModal('notifications')}
        />
      </header>

      {/* Sidebar (portal) */}
      {sidebarOpen && createPortal(
        <div className="sidebar-overlay">
          <div className="sidebar">
            <button onClick={() => setSidebarOpen(false)}>×</button>
            <nav>
              <a href="/dashboard">Dashboard</a>
              <a href="/orders">Orders</a>
              <a href="/customers">Customers</a>
            </nav>
          </div>
        </div>,
        document.body
      )}

      {/* Notification modal (portal) */}
      {activeModal === 'notifications' && createPortal(
        <div className="modal-overlay">
          <div className="notification-modal">
            <h3>Recent Notifications</h3>
            {notifications.map(notif => (
              <div key={notif.id} className="notification-item">
                <span>{notif.message}</span>
                <small>{notif.timestamp.toLocaleTimeString()}</small>
              </div>
            ))}
            <button onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
```

---

## 📚 KEY LEARNING POINTS

### When to Use Portals:
1. **Modals and Dialogs** - Break out of parent container constraints
2. **Tooltips** - Render above all other content
3. **Notifications/Toasts** - Fixed positioning outside normal flow
4. **Dropdown Menus** - Avoid z-index and overflow issues
5. **Lightboxes** - Full-screen image/video viewers

### Portal + State Best Practices:
1. **State Management** - Keep modal state in parent components
2. **Event Handling** - Events bubble up through React tree, not DOM tree
3. **Cleanup** - Always clean up event listeners and timeouts
4. **Accessibility** - Manage focus and keyboard navigation
5. **Performance** - Use React.memo for expensive portal content

### Common Patterns:
```jsx
// 1. Conditional Portal Rendering
{isOpen && createPortal(<Modal />, document.body)}

// 2. Dynamic Portal Targets
createPortal(<Component />, document.getElementById(targetId))

// 3. Portal with Cleanup
useEffect(() => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return () => document.body.removeChild(container);
}, []);

// 4. Portal Context Pattern
const PortalContext = createContext();
const usePortal = () => useContext(PortalContext);
```

### Real Website Integration:
- **E-commerce**: Product galleries, shopping cart overlays, quick view modals
- **SaaS Apps**: Dashboard notifications, help tooltips, settings modals
- **Social Media**: Image lightboxes, comment modals, share dialogs
- **Gaming**: Achievement notifications, game menus, inventory overlays

React Portals are essential for creating professional, user-friendly interfaces that break free from normal DOM constraints while maintaining React's component model and state management!