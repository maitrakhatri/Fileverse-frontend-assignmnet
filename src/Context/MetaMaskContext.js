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
        }); // returns balance in wei
        setBalance(ethers.utils.formatEther(balance));// converts wei into Ether
    };

    const getAccount = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });// returns an array of all the account linked with MetaMask
        setConnectStatusMsg("MetaMask Connected !!");
        setAccountNo(accounts[0]);// selecting the first account
        getBalance(accounts[0]);// fetching balace of the first account
        setTimeout(() => {
            navigate("/account")
        }, 1000);// delayed redirect so that users can see the message "MetaMask Connected !!"
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
        const allFetchedNFTs = await alchemy.nft.getNftsForOwner("0x983110309620D911731Ac0932219af06091b6744");// static as of right now, can be made dynamic by passing accountNo
        setAllNFTs(allFetchedNFTs.ownedNfts)
    }

    useEffect(() => {
        setDisplayedNFTs(allNFTs.slice(0, 10))// displaying only first 10 NFTs
    }, [allNFTs])

    return <MetaMaskContext.Provider value={{ accountNo, connectStatusMsg, balance, checkEthereum, displayedNFTs }}>
        {children}
    </MetaMaskContext.Provider>
}

const useMetaMask = () => useContext(MetaMaskContext)

export { useMetaMask, MetaMaskProvider }