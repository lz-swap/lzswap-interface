import styles from "./index.less";

import { Input, Button } from "antd";

export default function Swap() {
  return (
    <div className={styles.swapWrapper}>
      <div className={styles.chainBox}>
        <div className={styles.boxLeft}>
          <span>From</span>
          <div className={styles.chainName}>
            <i className={styles.chainIcon}></i>
            <span>Ethereum Mainnet</span>
            <i className={styles.arrorIcon}></i>
          </div>
        </div>
        <i></i>
      </div>

      {/* amount input */}
      <div className={styles.amountInputBox}>
        <div className={styles.balanceInfo}>
          <span>Send</span>
          <span>MAX: 0</span>
        </div>
        <div className={styles.inputBox}>
          <Input></Input>
          <div className={styles.tokenInfo}>
            <i className={styles.coinIcon}></i>
            <span>USDC</span>
            <i className={styles.arrowIcon}></i>
          </div>
        </div>
      </div>

      {/* exchange icon */}
      <i className={styles.exchangeIcon}></i>

      {/* amount out */}
      <div className={styles.chainBox}>
        <div className={styles.boxLeft}>
          <span>To</span>
          <div className={styles.chainName}>
            <i className={styles.chainIcon}></i>
            <span>Ethereum Mainnet</span>
            <i className={styles.arrorIcon}></i>
          </div>
        </div>
        {/* <i></i> */}
      </div>
      <div className={styles.amountInputBox}>
        <div className={styles.inputBox}>
          <Input disabled></Input>
          <div className={styles.tokenInfo}>
            <i className={styles.coinIcon}></i>
            <span>USDC</span>
          </div>
        </div>
      </div>

      <div className={styles.swapButton}>
        <Button>Swap</Button>
      </div>
    </div>
  );
}
