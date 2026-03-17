import { useState } from "react";
import Navbar from "./components/Navbar";
import "./styles/theme.css";
import AppRouter from "./router/AppRouter";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <AppRouter />

    </div>
  );
}

export default App;