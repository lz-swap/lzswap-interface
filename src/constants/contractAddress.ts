import { ChainIds } from "./chainIds";
interface ContractAddressConfig {
  swapAndBridge: string;
  oft: string;
  routerV2: string;
  WETH: string;
}
export const ContractAddress: { [chainId: number]: ContractAddressConfig } = {
  [ChainIds.SEPOLIA]: {
    swapAndBridge: "0xcAEA67c52F8423e476C535421720aAA98D543027",
    oft: "0x25E962fAF6Dfbe7C889f046F3a539892174bc91E",
    routerV2: "0x67099583A536913Fc4F2e09eE8e5831c76453DaC",
    WETH: "0xBDFFB5C4F47036ABE048A1DC964B84E45767B3d2",
  },
  [ChainIds.BSC_TESTNET]: {
    swapAndBridge: "0x2B2dfdcfE7186420DEb19a2c4C296D126bf3e1fc",
    oft: "0x3c782fbf76e5bd902Ebca9a8B86668DA05BBc108",
    routerV2: "0x3a150EC62384d040f43a3a82837AF75B15574C31",
    WETH: "0xf5eA2ffCf53f896251F966C1Ad165C19dD687c80",
  },
};
