import { Web3ReactProvider, Web3ReactHooks } from "@web3-react/core";
import { metamask, hooks as metamaskHooks } from "@/connectors/metamask";
import {
  walletconnect,
  hooks as walletConnectHooks,
} from "@/connectors/walletconnect";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";

const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metamask, metamaskHooks],
  [walletconnect, walletConnectHooks],
];

export default function WalletProvider({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
