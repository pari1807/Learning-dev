# Props Exercises and Practice

## Basic Exercises

### Exercise 1: Create a Book Component
Create a component that displays book information with these props:
- title (string)
- author (string)
- pages (number)
- isAvailable (boolean)

```jsx
function Book({ title, author, pages, isAvailable }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>By: {author}</p>
      <p>Pages: {pages}</p>
      <p>Status: {isAvailable ? "Available" : "Not Available"}</p>
    </div>
  );
}

// Usage:
<Book title="React Guide" author="John Doe" pages={250} isAvailable={true} />
```

### Exercise 2: Create a Weather Component
Make a component that shows weather with props:
- city (string)
- temperature (number)
- condition (string)
- humidity (number)

### Exercise 3: Create a MenuItem Component
Build a component for restaurant menu with props:
- name (string)
- price (number)
- category (string)
- isVegetarian (boolean)

## Medium Exercises

### Exercise 4: Create a BlogPost Component
Build a component with object props:
```jsx
const post = {
  title: "Learning React",
  content: "Props are amazing...",
  author: "Jane Smith",
  publishDate: "2024-01-01",
  tags: ["react", "javascript", "tutorial"]
};
```

### Exercise 5: Create a ShoppingCart Component
Build a component that takes an array of products and displays them:
```jsx
const products = [
  { id: 1, name: "Laptop", price: 999, quantity: 1 },
  { id: 2, name: "Mouse", price: 25, quantity: 2 }
];
```

### Exercise 6: Create a UserCard with Default Props
Create a component with default values:
- name (default: "Anonymous")
- role (default: "User")
- avatar (default: "default-avatar.png")

## Advanced Exercises

### Exercise 7: Create a Modal Component
Build a modal that uses children props:
```jsx
<Modal title="Confirm Action" isOpen={true}>
  <p>Are you sure you want to delete this item?</p>
  <button>Yes</button>
  <button>No</button>
</Modal>
```

### Exercise 8: Create a Table Component
Build a reusable table component:
```jsx
const columns = ["Name", "Age", "City"];
const data = [
  ["John", 25, "NYC"],
  ["Jane", 30, "LA"]
];

<Table columns={columns} data={data} />
```

### Exercise 9: Create a Form Component with Function Props
Build a form that uses function props for events:
```jsx
<ContactForm 
  onSubmit={(data) => console.log(data)}
  onCancel={() => console.log("cancelled")}
/>
```

## Practice Projects

### Project 1: Student Dashboard
Create a student dashboard that shows:
- Student info (name, id, grade)
- List of courses
- GPA calculation
- Actions (edit, delete)

### Project 2: Product Catalog
Build a product catalog with:
- Product grid
- Filtering by category
- Search functionality
- Add to cart buttons

### Project 3: Social Media Post
Create a social media post component with:
- User profile info
- Post content
- Like/comment buttons
- Timestamp
- Share functionality

## Solutions Tips

1. **Start Simple**: Begin with basic props before moving to complex ones
2. **Use Destructuring**: Always destructure props for cleaner code
3. **Provide Defaults**: Use default values for optional props
4. **Validate Types**: Consider what data types you expect
5. **Think Reusability**: Make components flexible and reusable

## Common Patterns to Practice

```jsx
// 1. Conditional Classes
function Button({ type, children }) {
  const className = `btn ${type === 'primary' ? 'btn-primary' : 'btn-secondary'}`;
  return <button className={className}>{children}</button>;
}

// 2. Prop Spreading
function EnhancedInput(props) {
  return <input className="enhanced-input" {...props} />;
}

// 3. Function Props with Parameters
function ListItem({ item, onEdit, onDelete }) {
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onEdit(item.id)}>Edit</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
}
```

Try to implement these exercises step by step. Start with the basic ones and gradually move to more complex examples!