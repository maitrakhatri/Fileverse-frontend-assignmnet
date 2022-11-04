import { useMetaMask } from "../Context/MetaMaskContext.js";
import { NFTCard } from "../Components/NFTCard.jsx";

function Account() {
  const { accountNo, balance, displayedNFTs } = useMetaMask();

  return (
    <div className="Account">
      <nav>
        <h3>Acoount: {accountNo}</h3>
        <h3 id="right">Balance : {balance} ETH </h3>
      </nav>

      <h1>My NFTs</h1>

      <div className="NFT-Display">
        {displayedNFTs.map((item) => (
          <NFTCard
            address={item.contract?.address}
            name={item.contract?.name}
            tokenType={item?.contract?.tokenType}
            description={item?.description}
            src={item.media[0]?.gateway}
          />
        ))}
      </div>
    </div>
  );
}

export { Account };
