import styles from "./index.less";
import { Input, InputProps } from "antd";
import { ChainList } from "@/constants/chainlist";
import { BigNumberLike, toBN } from "@/utils/bn";
import { BigNumber } from "ethers";

interface InputBoxProps extends InputProps {
  chainId: number;
  balance: BigNumberLike;
  showTokenList: () => void;
  showChainList: () => void;
  inputMax: () => void;
}

export default function InputBox({
  chainId,
  balance,
  showTokenList,
  showChainList,
  inputMax,
  ...rest
}: InputBoxProps) {
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
        <i></i>
      </div>

      {/* amount input */}
      <div className={styles.amountInputBox}>
        <div className={styles.balanceInfo}>
          <span>Send</span>
          <span onClick={inputMax}>
            MAX: {toBN(balance).div(1e14).integerValue(1).div(10000).toString()}
          </span>
        </div>
        <div className={styles.inputBox}>
          <Input {...rest}></Input>
          <div className={styles.tokenInfo} onClick={showTokenList}>
            <i className={styles.coinIcon}></i>
            <span>{ChainList[chainId].nativeCurrency.symbol}</span>
            <i className={styles.arrowIcon}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
