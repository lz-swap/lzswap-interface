import styles from "./index.less";
import { Input } from "antd";
export default function InputBox() {
  return (
    <div>
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
    </div>
  );
}
