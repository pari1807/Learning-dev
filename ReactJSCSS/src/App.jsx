import StyleCard from "./components/StyleCard";
import ProfileCard from "./components/ProfileCard";
import State from "./components/useStates/State";
import Counter from "./components/useStates/Counter";
import CopyInput from "./components/Portals/CopyInput";
import BasicEffect from "./components/useEffects/BasicEffect";
import CounterEffect from "./components/useEffects/CounterEffect";
import FetchDataEffect from "./components/useEffects/FetchDataEffect";

const App = () => {
  return (
    <section>
      <StyleCard />
      <ProfileCard />
      <State />
      <Counter />
      <CopyInput />
      <BasicEffect />
      <CounterEffect />
      <FetchDataEffect />
    </section>
  );
}

export default App;