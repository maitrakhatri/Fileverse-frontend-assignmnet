const NFTCard = ({ address, name, tokenType, description, src }) => {
  return (
    <div className="NFTCard">
      <img src={src} alt={name} />

      <div className="details">
        <div className="links">
          <div className="address">
            <p>
              {" "}
              {`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
            </p>

            <a href={`https://etherscan.io/token/${address}`} target="_blank">
              {`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
            </a>
          </div>
        </div>
        <div>
          <b>Name:</b> {name}
        </div>
        <div>
          <b>Description:</b> {description}
        </div>
        <div>
          <b>Token Type:</b> {tokenType}
        </div>
      </div>
    </div>
  );
};

export { NFTCard };
