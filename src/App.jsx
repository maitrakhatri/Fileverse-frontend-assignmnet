import { useState } from "react";
import "./App.css";

function App() {

  const [accountNo, setAccountNo] = useState()
  const [connectStatus, setConnectStatus] = useState("Click to connect your MetaMask")

  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    setAccountNo(accounts[0])
    setConnectStatus("MetaMask Connected !!")
  }

  const checkEthereum = () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      getAccount()
    }
    else {
      setConnectStatus("Install MetaMask first to connect")
    }
  }
  return (
    <div className="App">
      <button onClick={checkEthereum}>
        <h1>Connect</h1>
      </button>
      <h3>{connectStatus}</h3>
      <h2>Account: {accountNo}</h2>
    </div>
  );
}

export default App;
