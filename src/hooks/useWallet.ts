import { useWeb3React } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";

import { metamask } from "@/connectors/metamask";
import { walletconnect } from "@/connectors/walletconnect";
import { useEffect, useMemo } from "react";
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

  const shortAddress = useMemo(() => {
    if (account) {
      return `${account.slice(0, 6)}...${account.slice(-4)}`;
    }
  }, [account]);

  return {
    connect,
    provider: provider as Web3Provider,
    account,
    shortAddress,
    chainId,
  };
}

function getConnector(connectType: ConnectType): MetaMask | WalletConnect {
  if (connectType === "metamask") {
    return metamask;
  } else if (connectType === "walletconnect") {
    return walletconnect;
  }
  return metamask;
}
