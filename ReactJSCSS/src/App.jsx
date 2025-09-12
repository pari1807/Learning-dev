import StyleCard from "./components/StyleCard";
import ProfileCard from "./components/ProfileCard";
import State from "./components/useStates/State";
//import Counter from "./components/useStates/Counter";
import CopyInput from "./components/Portals/CopyInput";
import BasicEffect from "./components/useEffects/BasicEffect";
import CounterEffect from "./components/useEffects/CounterEffect";
import FetchDataEffect from "./components/useEffects/FetchDataEffect";
import {UserProvider} from "./components/ContextAPI/UserContext";
import Userprofile from "./components/ContextAPI/Userprofile";
import UpdateUser from "./components/ContextAPI/UpdateUser";
import Counter from "./components/useReducers/Counter";
import FocusInput from "./components/useRef/FocusInput";
import Timer from "./components/useRef/Timer";
const App = () => {
  return (
    <section>
      <StyleCard />
      <ProfileCard />
      <State />
      {/* <Counter /> */}
      <CopyInput />
      <BasicEffect />
      <CounterEffect />
      <FetchDataEffect />

      <UserProvider>
        <Userprofile />
        <UpdateUser />
      </UserProvider>
      
      <Counter />
      <FocusInput />
      <Timer />
    </section>
  );
}

export default App;