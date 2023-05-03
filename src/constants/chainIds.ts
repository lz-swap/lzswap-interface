export enum ChainIds {
  SEPOLIA = 11155111,
  BSC_TESTNET = 97,
}

interface ILZChainId {
  lzChainId: number;
  endpoint: string;
}
export const LZChainIds: { [chainId: number]: ILZChainId } = {
  97: {
    lzChainId: 10102,
    endpoint: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
  },
  11155111: {
    lzChainId: 10161,
    endpoint: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
  },
};
