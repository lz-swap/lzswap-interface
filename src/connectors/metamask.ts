import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

export const metamaskConnector = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

export const [metamask, hooks] = metamaskConnector;
