import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Functions from "./components/Functions";
import Greet from "./components/Greeting";
import ProductInfo from "./components/ProductInfo"
import List from "./components/List";
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
    </div>
  );
}

export default App;