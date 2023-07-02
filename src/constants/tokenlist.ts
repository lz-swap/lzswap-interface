interface ITokenList {
  symbol: string;
  desc: string;
}

const TokenList: ITokenList[] = [
  {
    symbol: "SETH",
    desc: "Sepolia ETH",
  },
  {
    symbol: "TBNB",
    desc: "BSC Testnet",
  },
];

export default TokenList;
