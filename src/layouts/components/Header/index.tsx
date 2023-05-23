import styles from "./index.less";
import { message, Popover } from "antd";

import useWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { ChainList, AddEthereumChainParameter } from "@/constants/chainlist";

import { useGlobalStore } from "@/models";
import { Link, useSelectedRoutes } from "umi";

const menus = [
  {
    path: "/",
    label: "Swap",
  },
  {
    path: "/bridge",
    label: "Bridge",
  },
  {
    path: "/liquidity",
    label: "Liquidity",
  },
];

export default function Header() {
  const { setBalanceStore, balance } = useGlobalStore();
  const [path, setPath] = useState("/");
  const routes = useSelectedRoutes();
  const lastRoute = routes.at(-1);

  useEffect(() => {
    if (lastRoute) {
      setPath(lastRoute.pathname);
    }
  }, [lastRoute]);

  const [chainInfo, setChainInfo] = useState<
    AddEthereumChainParameter | undefined
  >();
  const { connect, account, shortAddress, provider, chainId, disconnect } =
    useWallet();
  const connectWallet = async () => {
    try {
      await connect("metamask");
    } catch (error) {
      message.error("Connect Walet Failed");
    }
  };

  useEffect(() => {
    if (account && provider) {
      provider.getBalance(account).then((res) => {
        setBalanceStore(res);
      });
    }
  }, [account, provider]);

  useEffect(() => {
    if (chainId) {
      const chainInfo: AddEthereumChainParameter = ChainList[Number(chainId)];
      setChainInfo(chainInfo);
    }
  }, [chainId]);

  const handleDisconnect = () => {
    console.log("handleDisconnect");
    disconnect("metamask");
  };

  const disconnectPopover = () => (
    <div
      style={{ color: "#fff", cursor: "pointer" }}
      onClick={handleDisconnect}
    >
      Disconnect
    </div>
  );

  return (
    <div className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        <i></i>
        <span>OmniSwap</span>
      </Link>
      <div className={styles.menu}>
        <ul>
          {menus.map((item) => (
            <Link
              to={item.path}
              key={item.label}
              className={path === item.path ? styles.select : ""}
            >
              {item.label} {path === item.path}
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.accountBox}>
        <div className={styles.historyButton}>
          <i className={styles.iconHistory}></i>
          History
        </div>

        <div className={styles.network}>
          <i></i>
          <span>Ethereum Mainnet</span>
        </div>

        {shortAddress ? (
          <Popover placement="bottom" content={disconnectPopover}>
            <div className={`${styles.historyButton} ${styles.accountButton}`}>
              <i className={styles.iconHistory}></i>
              <span>{shortAddress}</span>
            </div>
          </Popover>
        ) : (
          <div className={styles.connectWallet}>
            <div onClick={connectWallet}>Connect Wallet</div>
          </div>
        )}
      </div>
    </div>
  );
}
