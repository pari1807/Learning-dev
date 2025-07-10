import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";


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
    </div>
  )
}

export default App;