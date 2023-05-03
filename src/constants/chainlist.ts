export interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export const ChainList: { [chainId: number]: AddEthereumChainParameter } = {
  97: {
    chainId: "0x61", // 97
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB Testnet",
      symbol: "TBNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-testnet.public.blastapi.io"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
  11155111: {
    chainId: "0xaa36a7", // 11155111
    chainName: "Sepolia",
    nativeCurrency: {
      name: "Sepolia ETH",
      symbol: "SETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.sepolia.org"],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
};
