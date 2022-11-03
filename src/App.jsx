import { Route, Routes } from "react-router-dom";
import { Account } from "./Account";
import "./App.css";
import { Home } from "./Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
