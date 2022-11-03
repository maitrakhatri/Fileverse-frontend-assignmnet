import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { Network, Alchemy } from "alchemy-sdk";

const MetaMaskContext = createContext();

const MetaMaskProvider = ({ children }) => {

    const [accountNo, setAccountNo] = useState(undefined);
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
            fetchNFTs();
        } else {
            setConnectStatusMsg("Install MetaMask first to connect");
        }
    };

    const [allNFTs, setAllNFTs] = useState([])
    const [displayedNFTs, setDisplayedNFTs] = useState([])

    const settings = {
        apiKey: "demo",
        network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(settings);

    const fetchNFTs = async () => {
        const allFetchedNFTs = await alchemy.nft.getNftsForOwner("0x983110309620D911731Ac0932219af06091b6744");
        setAllNFTs(allFetchedNFTs.ownedNfts)
    }

    useEffect(() => {
        setDisplayedNFTs(allNFTs.slice(0, 10))
    }, [allNFTs])

    return <MetaMaskContext.Provider value={{ accountNo, connectStatusMsg, balance, checkEthereum, displayedNFTs }}>
        {children}
    </MetaMaskContext.Provider>
}

const useMetaMask = () => useContext(MetaMaskContext)

export { useMetaMask, MetaMaskProvider }