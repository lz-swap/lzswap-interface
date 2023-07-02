import { useState } from "react";
import styles from "./index.less";
import { Input } from "antd";

interface OutputBoxProps {
  showTokenList: () => void;
  showChainList: () => void;
}

export default function OutputBox({
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
            <span>Ethereum Mainnet</span>
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
            <span>USDC</span>
            <i className={styles.arrowIcon}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
