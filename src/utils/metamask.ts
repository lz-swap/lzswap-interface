import { ChainList } from "@/constants/chainlist";
import { ethers } from "ethers";

export function addChain(chainId: number) {
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: ChainList[Number(chainId)],
  });
}

export async function switchChain(chainId: number) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ethers.utils.hexValue(chainId) }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      // chain not add to metamask
      addChain(chainId);
    }
  }
}
