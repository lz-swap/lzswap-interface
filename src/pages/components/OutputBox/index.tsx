import { useState } from "react";
import styles from "./index.less";
import { Input } from "antd";

import { ChainList } from "@/constants/chainlist";

interface OutputBoxProps {
  chainId: number;
  showTokenList: () => void;
  showChainList: () => void;
}

export default function OutputBox({
  chainId,
  showTokenList,
  showChainList,
}: OutputBoxProps) {
  // const [] = useState("ETH")
  return (
    <div className={styles.inputBox}>
      <div className={styles.chainBox}>
        <div className={styles.boxLeft}>
          <span>From</span>
          <div className={styles.chainName} onClick={showChainList}>
            <i className={styles.chainIcon}></i>
            <span>{ChainList[chainId].chainName}</span>
            <i className={styles.arrorIcon}></i>
          </div>
        </div>
      </div>

      {/* amount input */}
      <div className={styles.amountInputBox}>
        <div className={styles.inputBox}>
          <Input disabled></Input>
          <div className={styles.tokenInfo} onClick={() => showTokenList()}>
            <i className={styles.coinIcon}></i>
            <span>{ChainList[chainId].nativeCurrency.symbol}</span>
            <i className={styles.arrowIcon}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
