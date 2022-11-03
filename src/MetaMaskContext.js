import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const MetaMaskContext = createContext();

const MetaMaskProvider = ({ children }) => {

    const [accountNo, setAccountNo] = useState();
    const [balance, setBalance] = useState();
    const [connectStatusMsg, setConnectStatusMsg] = useState(
        "Click to connect your MetaMask"
    );

    const navigate = useNavigate();

    const getBalance = async (address) => {
        const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [address, "latest"],
        });
        setBalance(ethers.utils.formatEther(balance));
    };

    const getAccount = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setConnectStatusMsg("MetaMask Connected !!");
        setAccountNo(accounts[0]);
        getBalance(accounts[0]);
        setTimeout(() => {
            navigate("/account")
        }, 1000);
    };

    const checkEthereum = () => {
        if (typeof window.ethereum !== "undefined") {
            getAccount();
        } else {
            setConnectStatusMsg("Install MetaMask first to connect");
        }
    };

    return <MetaMaskContext.Provider value={{ accountNo, connectStatusMsg, balance, checkEthereum }}>
        {children}
    </MetaMaskContext.Provider>
}

const useMetaMask = () => useContext(MetaMaskContext)

export { useMetaMask, MetaMaskProvider }