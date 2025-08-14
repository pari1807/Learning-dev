// Advanced Props Examples

// 1. ADVANCED - Children Props
function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", margin: "10px" }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// 2. ADVANCED - Function Props (Event Handlers)
function ClickButton({ label, onButtonClick }) {
  return (
    <button onClick={onButtonClick}>
      {label}
    </button>
  );
}

// 3. ADVANCED - Complex Object Props
function UserProfile({ user, settings }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <h4>Settings:</h4>
      <p>Theme: {settings.theme}</p>
      <p>Notifications: {settings.notifications ? "On" : "Off"}</p>
      <p>Language: {settings.language}</p>
    </div>
  );
}

// 4. ADVANCED - Nested Components with Props
function CommentList({ comments }) {
  return (
    <div>
      <h3>Comments ({comments.length})</h3>
      {comments.map(comment => (
        <Comment 
          key={comment.id} 
          author={comment.author} 
          text={comment.text} 
          date={comment.date} 
        />
      ))}
    </div>
  );
}

function Comment({ author, text, date }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "5px" }}>
      <strong>{author}</strong>
      <p>{text}</p>
      <small>{date}</small>
    </div>
  );
}

// 5. ADVANCED - Spread Operator with Props
function ContactInfo(props) {
  return (
    <div>
      <h3>Contact Information</h3>
      <PersonDetails {...props} />
    </div>
  );
}

function PersonDetails({ name, email, phone, address }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
    </div>
  );
}

// 6. ADVANCED - Props with Complex Logic
function TaskManager({ tasks, onTaskComplete, onTaskDelete }) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div>
      <h2>Task Manager</h2>
      <p>Total: {tasks.length} | Completed: {completedTasks} | Pending: {pendingTasks}</p>
      
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={() => onTaskComplete(task.id)}
          onDelete={() => onTaskDelete(task.id)}
        />
      ))}
    </div>
  );
}

function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div style={{ 
      padding: "10px", 
      margin: "5px", 
      backgroundColor: task.completed ? "#d4edda" : "#fff3cd" 
    }}>
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </span>
      <div>
        <button onClick={onComplete}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={onDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

// Main Advanced Demo Component
function AdvancedPropsDemo() {
  // Sample data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    age: 28
  };

  const userSettings = {
    theme: "dark",
    notifications: true,
    language: "English"
  };

  const sampleComments = [
    { id: 1, author: "Alice", text: "Great post!", date: "2024-01-01" },
    { id: 2, author: "Bob", text: "Very helpful, thanks!", date: "2024-01-02" },
    { id: 3, author: "Charlie", text: "Looking forward to more content.", date: "2024-01-03" }
  ];

  const contactData = {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, State"
  };

  const taskList = [
    { id: 1, title: "Learn React Props", completed: true },
    { id: 2, title: "Build a Todo App", completed: false },
    { id: 3, title: "Practice State Management", completed: false },
    { id: 4, title: "Deploy Application", completed: false }
  ];

  // Event handlers
  const handleButtonClick = (buttonName) => {
    alert(`${buttonName} button was clicked!`);
  };

  const handleTaskComplete = (taskId) => {
    alert(`Task ${taskId} completion toggled!`);
  };

  const handleTaskDelete = (taskId) => {
    alert(`Task ${taskId} deleted!`);
  };

  return (
    <div>
      <h1>Advanced React Props Examples</h1>
      
      {/* Children Props */}
      <Card title="User Information">
        <p>This content is passed as children to the Card component.</p>
        <p>You can put any JSX here!</p>
        <button>Action Button</button>
      </Card>

      {/* Function Props */}
      <div>
        <h3>Function Props Example:</h3>
        <ClickButton 
          label="Save" 
          onButtonClick={() => handleButtonClick("Save")} 
        />
        <ClickButton 
          label="Cancel" 
          onButtonClick={() => handleButtonClick("Cancel")} 
        />
        <ClickButton 
          label="Delete" 
          onButtonClick={() => handleButtonClick("Delete")} 
        />
      </div>

      {/* Complex Object Props */}
      <UserProfile user={userData} settings={userSettings} />

      {/* Nested Components */}
      <CommentList comments={sampleComments} />

      {/* Spread Operator */}
      <ContactInfo {...contactData} />

      {/* Complex Logic with Props */}
      <TaskManager 
        tasks={taskList}
        onTaskComplete={handleTaskComplete}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
}

export default AdvancedPropsDemo;