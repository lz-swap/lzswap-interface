import { Link, Outlet } from "umi";
import styles from "./index.less";
import { Button } from "antd";
import WalletProvider from "@/components/WalletProvider";
import useWallet from "@/hooks/useWallet";

export default function Layout() {
  return (
    <>
      <WalletProvider>
        <div>
          <ConnectWallet />
        </div>
      </WalletProvider>
    </>
  );
}

function ConnectWallet() {
  const { connect, account } = useWallet();
  const connectWallet = () => {
    connect("metamask");
  };
  return (
    <div>
      <Button type="primary" onClick={connectWallet}>
        ConnectWallet
      </Button>
      <div>account: {account}</div>
    </div>
  );
}
