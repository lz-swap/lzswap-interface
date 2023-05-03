import { Outlet } from "umi";
import styles from "./index.less";
import WalletProvider from "@/components/WalletProvider";
import Header from "./components/Header";

export default function Layout() {
  return (
    <>
      <WalletProvider>
        <div className={styles.container}>
          <Header />
          <div className={styles.containerWraper}>
            <Outlet />
          </div>
        </div>
      </WalletProvider>
    </>
  );
}
