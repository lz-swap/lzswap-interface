import { ChainIds } from "./chainIds";
interface ContractAddressConfig {
  swapAndBridge: string;
  oft: string;
}
export const ContractAddress: { [chainId: number]: ContractAddressConfig } = {
  [ChainIds.SEPOLIA]: {
    swapAndBridge: "0xcAEA67c52F8423e476C535421720aAA98D543027",
    oft: "0x25E962fAF6Dfbe7C889f046F3a539892174bc91E",
  },
  [ChainIds.BSC_TESTNET]: {
    swapAndBridge: "0x2B2dfdcfE7186420DEb19a2c4C296D126bf3e1fc",
    oft: "0x3c782fbf76e5bd902Ebca9a8B86668DA05BBc108",
  },
};
