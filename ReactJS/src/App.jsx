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
import PropsLearning from "./components/Props/PropsLearning";
import AdvancedPropsDemo from "./components/Props/AdvancedProps";
import Persons from "./components/Props/Persons";
import Weather from "./components/Conditionals/Weather";
import UserStatus from "./components/Conditionals/UserStatus";
import ConditionalGreeting from "./components/Conditionals/ConditionalGreeting";
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
      <PropsLearning />
      <AdvancedPropsDemo />
      <Persons name="John" age={30} />
      <Persons name="Jane" age={25} />
      <Persons name="Doe" age={28} />
      <Weather />
      <UserStatus loggedIn={true} isAdmin={False} />
      <ConditionalGreeting timeOfDay={morning} />
    </div>
  );
}

export default App;