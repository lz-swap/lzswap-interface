import styles from "./index.less";
import { Input } from "antd";
export default function OutputBox() {
  return (
    <div className={styles.inputBox}>
      <div className={styles.chainBox}>
        <div className={styles.boxLeft}>
          <span>From</span>
          <div className={styles.chainName}>
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
          <div className={styles.tokenInfo}>
            <i className={styles.coinIcon}></i>
            <span>USDC</span>
            <i className={styles.arrowIcon}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
