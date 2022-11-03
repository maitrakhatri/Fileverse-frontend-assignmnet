import { Route, Routes } from "react-router-dom";
import { Account } from "./Account";
import "./App.css";
import { Home } from "./Home";
import { useMetaMask } from "./MetaMaskContext";

function App() {

  const { accountNo } = useMetaMask()

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={accountNo!==undefined?<Account/> : <Home/> } />
      </Routes>
    </div>
  );
}

export default App;
