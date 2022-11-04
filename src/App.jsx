import { Route, Routes } from "react-router-dom";
import { Account, Home } from "./Pages";
import "./App.css";
import { useMetaMask } from "./Context/MetaMaskContext.js";

function App() {
  const { accountNo } = useMetaMask();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account"
          element={accountNo !== undefined ? <Account /> : <Home />} //if not connected with MetaMask and tries to access account page from URL then show the Homepage instead of account page
        />
      </Routes>
    </div>
  );
}

export default App;
