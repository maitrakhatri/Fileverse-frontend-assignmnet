import { useMetaMask } from "./MetaMaskContext.js";

function Account() {
  const { accountNo, balance } = useMetaMask();
  return (
    <div className="Account">
      <nav>
        <h3>Acoount: {accountNo}</h3>
        <h3 id="right">Balance : {balance} ETH </h3>
      </nav>
    </div>
  );
}

export { Account };
