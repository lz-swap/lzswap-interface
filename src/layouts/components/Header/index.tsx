import styles from "./index.less";
import { Button, message } from "antd";

import useWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { BigNumberLike, toBN } from "@/utils/bn";
import { toFixed } from "@/utils/helper";
import { ChainList, AddEthereumChainParameter } from "@/constants/chainlist";

import { useGlobalStore } from "@/models";

export default function Header() {
  const { setBalanceStore, balance } = useGlobalStore();
  const [chainInfo, setChainInfo] = useState<
    AddEthereumChainParameter | undefined
  >();
  const { connect, account, shortAddress, provider, chainId } = useWallet();
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

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div>
          <h1>OmniSwap</h1>
        </div>
        <div className={styles.headerRight}>
          {shortAddress ? (
            <div>
              <span>{chainInfo ? chainInfo.chainName : "unknow chain"}</span>
              <div>
                <span>
                  {toFixed(toBN(balance).div(1e18), 4).toString()}{" "}
                  {chainInfo ? chainInfo.nativeCurrency.symbol : ""}
                </span>
                <span className={styles.address}>{shortAddress}</span>
              </div>
            </div>
          ) : (
            <Button type="primary" onClick={connectWallet}>
              ConnectWallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
