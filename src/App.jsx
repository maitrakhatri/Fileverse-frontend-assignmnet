import { useState } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {

  const [accountNo, setAccountNo] = useState()
  const [connectStatusMsg, setConnectStatusMsg] = useState("Click to connect your MetaMask")
  const [balance, setBalance] = useState()

  const getBalance = async (address) => {
    const balance = await window.ethereum.request({
      method: "eth_getBalance", params: [address, "latest"]
    })
    setBalance(ethers.utils.formatEther(balance))
    console.log(balance)
  }

  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    setConnectStatusMsg("MetaMask Connected !!")
    setAccountNo(accounts[0])
    getBalance(accounts[0])
  }

  const checkEthereum = () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      getAccount()
    }
    else {
      setConnectStatusMsg("Install MetaMask first to connect")
    }
  }
  return (
    <div className="App">
      <button onClick={checkEthereum}>
        <h1>Connect</h1>
      </button>
      <h3>{connectStatusMsg}</h3>
      <h2>Account: {accountNo}</h2>
      <h2>Balance: {balance} ETH</h2>
    </div>
  );
}

export default App;
