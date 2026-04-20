import { useContext } from "react";
import CountContext from "./context/context";

function App() {
  const { count, increment, decrement, reset } = useContext(CountContext);

  return (
    <div
      style={{
        width: "fit-content",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1>Count: {count} </h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;