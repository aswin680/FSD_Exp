import { createContext, useState } from "react";

const CountContext = createContext(null);

export function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider
      value={{
        count,
        increment: () => setCount((count) => count + 1),
        decrement: () => setCount((count) => count - 1),
        reset: () => setCount(0),
      }}
    >
      {children}
    </CountContext.Provider>
  );
}

export default CountContext;