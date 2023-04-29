import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { URLS } from "./chains";

export const walletConnectConnector = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: {
          1: ["https://rpc.ankr.com/eth"],
        },
      },
    })
);

export const [walletconnect, hooks] = walletConnectConnector;
