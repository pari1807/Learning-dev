# JSX Rules and Guidelines

## 1. Attribute Naming
- Use `className` instead of `class`
- Use `htmlFor` instead of `for` (in labels)
- Use camelCase for multi-word attributes (e.g., `onClick`, `onChange`)

## 2. Self-Closing Tags
- All tags must be properly closed
- Self-closing tags must include the forward slash: `<img />`, `<br />`, `<hr />`
- Empty elements: `<input />`, `<meta />`, `<link />`

## 3. JavaScript Expressions
- Use curly braces `{}` to embed JavaScript expressions
- Example: `<h1>{title}</h1>`, `<div className={isActive ? 'active' : 'inactive'}>`

## 4. Return Statement Rules
- JSX must return a single parent element
- Use React Fragments `<>...</>` or `<React.Fragment>` to wrap multiple elements
- Example: `return <><h1>Title</h1><p>Content</p></>`

## 5. Style Attribute
- `style` attribute accepts an object, not a string
- Use camelCase for CSS properties
- Example: `<div style={{backgroundColor: 'red', fontSize: '16px'}}>`

## 6. Event Handlers
- Use camelCase: `onClick`, `onSubmit`, `onChange`, `onMouseOver`
- Pass function references, not function calls: `onClick={handleClick}` not `onClick={handleClick()}`

## 7. Conditional Rendering
- Use ternary operator: `{condition ? <ComponentA /> : <ComponentB />}`
- Use logical AND: `{condition && <Component />}`
- Use logical OR for fallbacks: `{value || 'Default'}`

## 8. Comments
- Use `{/* comment */}` for JSX comments
- Regular `//` comments work in JavaScript sections

## 9. Reserved Keywords
- Avoid JavaScript reserved words as attribute names
- Use alternatives like `htmlFor` instead of `for`

## 10. Case Sensitivity
- Component names must start with capital letter: `<MyComponent />`
- HTML elements use lowercase: `<div>`, `<span>`, `<button>`

## 11. String Interpolation
- Use template literals or concatenation within `{}`
- Example: `<p>{`Hello ${name}!`}</p>` or `<p>{'Hello ' + name + '!'}</p>`

## 12. Boolean Attributes
- For `true` values: `<input disabled />` or `<input disabled={true} />`
- For `false` values: `<input disabled={false} />`

## 13. Key Prop
- Always provide `key` prop when rendering lists
- Keys should be unique and stable
- Example: `{items.map(item => <li key={item.id}>{item.name}</li>)}`

## Common Examples:

```jsx
// ❌ Wrong
<div class="container">
  <label for="name">Name:</label>
  <input type="text" id="name">
  <img src="image.jpg">
</div>

// ✅ Correct
<div className="container">
  <label htmlFor="name">Name:</label>
  <input type="text" id="name" />
  <img src="image.jpg" alt="description" />
</div>

// ❌ Wrong - Multiple elements without wrapper
return (
  <h1>Title</h1>
  <p>Content</p>
);

// ✅ Correct - Using Fragment
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
``` 