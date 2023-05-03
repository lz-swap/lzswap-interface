import {
  Contract,
  ContractInterface,
  ContractTransaction,
  BigNumber,
} from "ethers";
import { BigNumberLike } from "@/utils/bn";

import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? library.getSigner(account) : library;
}

export function makeContract<T extends Contract>(
  contractAddress: string,
  ABI: ContractInterface,
  library: Web3Provider,
  account?: string
): T {
  const provider = getProviderOrSigner(library, account) as Web3Provider;
  return new Contract(contractAddress, ABI, provider) as T;
}

export interface ERC20Contract extends Contract {
  approve: (spender: string, amount: string) => Promise<ContractTransaction>;
}

export interface SwapAndBridge extends Contract {
  swapAndBridge: (
    amountIn: BigNumberLike,
    amountOutMin: BigNumberLike,
    dstChainId: number,
    to: string,
    refundAddress: string,
    zroPaymentAddress: string,
    adapterParams: string,
    ...rest: any[]
  ) => Promise<ContractTransaction>;
}
