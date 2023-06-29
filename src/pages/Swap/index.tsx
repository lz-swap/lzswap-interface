import styles from "./index.less";

import { Input, Button } from "antd";
import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";

import TokenListModal from "@/components/TokenListModal";

export default function Swap() {
  return (
    <div className={styles.swapWrapper}>
      <InputBox />
      {/* exchange icon */}
      <i className={styles.exchangeIcon}></i>
      {/* amount out */}
      <OutputBox />
      <div className={styles.swapButton}>
        <Button>Swap</Button>
      </div>
      <TokenListModal open={true} />
    </div>
  );
}
