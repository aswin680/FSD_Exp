import React, { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const pageStyle = {
    backgroundColor: darkMode ? "#222" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    width : "100%",
    height: "97vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={pageStyle}>
      <h1>{darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}</h1>
      <button onClick={toggleTheme}>Toggle Dark Mode</button>
    </div>
  );
}

export default App;
