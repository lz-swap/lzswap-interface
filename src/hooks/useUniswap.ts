import useWallet from "./useWallet";
import { makeContract } from "./useContract";
import { ContractAddress } from "@/constants";
import UNISWAP_ROUTER_V2_ABI from "@/abi/uniswapRouterV2.abi.json";
import { Contract, BigNumber } from "ethers";

export default function useUniswap() {
  const { provider, account, chainId } = useWallet();

  async function getAmountsOut(
    amountIn: BigNumber,
    path: string[]
  ): Promise<BigNumber[]> {
    if (provider && account && chainId) {
      const routerV2 = makeContract<UniswapRouterContract>(
        ContractAddress[Number(chainId)].routerV2,
        UNISWAP_ROUTER_V2_ABI,
        provider,
        account
      );

      return routerV2.getAmountsOut(amountIn, path);
    }
    return new Array(path.length).fill(0);
  }

  return {
    getAmountsOut,
  };
}

export interface UniswapRouterContract extends Contract {
  getAmountsOut: (amountIn: BigNumber, path: string[]) => Promise<BigNumber[]>;
}
