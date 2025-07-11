import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Functions from "./components/Functions";
import Greet from "./components/Greeting";
import ProductInfo from "./components/ProductInfo"
import List from "./components/List";
import Props from "./components/Props";
import Person from "./components/Person";
import Conditional from "./components/Conditional";
// function App(){
//   return (
//     <div className="App">
//       <h1>Welcome to My React App</h1>
//       <p>This is a simple React application.</p>
//     </div>
//   );
// }

// const App =() =>{
//   return <div>
//   <Greet/>
//   </div>
// };

const App =() => {
  return (
    <div>
      <Header/>
      <Main/>
      <Footer/>
      <Functions/>
      <Greet />
      <ProductInfo />
      <List />
      <Props />
      <Person name ="Rahul" age={21}/>
      <Conditional />
    </div>
  );
}

export default App;