import { useWeb3React } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { BigNumber, ethers } from "ethers";
import { ChainList } from "@/constants/chainlist";

import { metamask } from "@/connectors/metamask";
import { walletconnect } from "@/connectors/walletconnect";
import { useEffect, useMemo, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";

type ConnectType = "metamask" | "walletconnect";

export default function useWallet() {
  const { account, provider, chainId } = useWeb3React();

  useEffect(() => {
    const connectType = localStorage.getItem("connectType");
    if (!connectType) return;
    const connector = getConnector(connectType as ConnectType);
    connector.connectEagerly();
  }, []);

  function connect(connectType: ConnectType): Promise<void> {
    if (connectType) {
      localStorage.setItem("connectType", connectType);
    }
    const connector = getConnector(connectType);
    return connector.activate();
  }

  const disconnect = (connectType: ConnectType) => {
    if (connectType) {
      localStorage.setItem("connectType", connectType);
    }
    const connector = getConnector(connectType);
    connector.resetState();

    localStorage.removeItem("connectType");
  };

  const shortAddress = useMemo(() => {
    if (account) {
      return `${account.slice(0, 6)}...${account.slice(-4)}`;
    }
  }, [account]);

  return {
    connect,
    disconnect,
    provider: provider as Web3Provider,
    account,
    shortAddress,
    chainId,
  };
}

export function useBalance(): BigNumber {
  const { account, provider, chainId } = useWeb3React();
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  useMemo(() => {
    if (account && provider) {
      provider.getBalance(account).then((b) => {
        setBalance(b);
      });
    }
  }, [chainId]);
  return balance;
}

function getConnector(connectType: ConnectType): MetaMask | WalletConnect {
  if (connectType === "metamask") {
    return metamask;
  } else if (connectType === "walletconnect") {
    return walletconnect;
  }
  return metamask;
}

export function addChainId(chainId: number) {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [ChainList[chainId]],
  });
}

export async function switchToChainId(chainId: number): Promise<void> {
  await addChainId(chainId);

  return window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: ethers.utils.hexlify(chainId),
      },
    ],
  });
}
