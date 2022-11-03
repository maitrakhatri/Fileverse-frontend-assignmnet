import { useMetaMask } from "./MetaMaskContext.js";

function Home() {
  const { checkEthereum, connectStatusMsg } = useMetaMask();

  return (
    <div className="Home">
      <button onClick={checkEthereum}>
        <h1>Connect</h1>
      </button>
      <h3>{connectStatusMsg}</h3>
    </div>
  );
}

export { Home };
