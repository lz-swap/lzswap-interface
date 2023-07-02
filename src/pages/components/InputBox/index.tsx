import styles from "./index.less";
import { Input, InputProps } from "antd";

interface InputBoxProps extends InputProps {
  showTokenList: () => void;
  showChainList: () => void;
}

export default function InputBox({
  showTokenList,
  showChainList,
  ...rest
}: InputBoxProps) {
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
        <i></i>
      </div>

      {/* amount input */}
      <div className={styles.amountInputBox}>
        <div className={styles.balanceInfo}>
          <span>Send</span>
          <span>MAX: 0</span>
        </div>
        <div className={styles.inputBox}>
          <Input {...rest}></Input>
          <div className={styles.tokenInfo} onClick={showTokenList}>
            <i className={styles.coinIcon}></i>
            <span>USDC</span>
            <i className={styles.arrowIcon}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
