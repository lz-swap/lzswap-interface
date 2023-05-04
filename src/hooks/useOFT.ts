import { BigNumber } from "ethers";
import useWallet from "./useWallet";
import { OFTContract, makeContract } from "./useContract";
import { ContractAddress } from "@/constants";

import OFT_ABI from "@/abi/oft.abi.json";
import { parseEther } from "ethers/lib/utils";

export default function useOFT() {
  const { account, provider, chainId } = useWallet();

  async function estimateSendFee(
    dstChainId: number,
    to: string,
    amount: string
  ): Promise<{ nativeFee: BigNumber; zroFee: BigNumber }> {
    if (account && provider && chainId) {
      const oft = makeContract<OFTContract>(
        ContractAddress[Number(chainId)].oft,
        OFT_ABI,
        provider,
        account
      );

      return oft.estimateSendFee(
        dstChainId,
        to,
        parseEther(amount),
        false,
        "0x"
      );
    }
    return { nativeFee: BigNumber.from(0), zroFee: BigNumber.from(0) };
  }

  return {
    estimateSendFee,
  };
}
