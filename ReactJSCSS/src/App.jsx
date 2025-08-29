import StyleCard from "./components/StyleCard";
import ProfileCard from "./components/ProfileCard";
import State from "./components/useStates/State";
import Counter from "./components/useStates/Counter";


const App = () => {
  return (
    <section>
      <StyleCard />
      <ProfileCard />
      <State />
      <Counter />
    </section>
  );
}

export default App;