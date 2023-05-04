import { Outlet } from "umi";
import styles from "./index.less";
import WalletProvider from "@/components/WalletProvider";
import Header from "./components/Header";

import { HoxRoot } from "hox";

export default function Layout() {
  return (
    <>
      <WalletProvider>
        <HoxRoot>
          <div className={styles.container}>
            <Header />
            <div className={styles.containerWraper}>
              <Outlet />
            </div>
          </div>
        </HoxRoot>
      </WalletProvider>
    </>
  );
}
