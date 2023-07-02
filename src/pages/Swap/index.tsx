import styles from "./index.less";
import { useState } from "react";
import { Input, Button } from "antd";
import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";

import TokenListModal from "@/components/TokenListModal";
import ChainListModal from "@/components/ChainListModal";
import useWallet from "@/hooks/useWallet";
import { onlyNumber } from "@/utils/helper";

export default function Swap() {
  const [isShowTokenList, setIsShowTokenList] = useState(false);
  const [isShowChainList, setIsShowChainList] = useState(false);
  const { account, connect } = useWallet();
  const [amountIn, setAmountIn] = useState(0);
  const [amountOut, setAmountOut] = useState(0);
  return (
    <div className={styles.swapWrapper}>
      <InputBox
        showTokenList={() => setIsShowTokenList(true)}
        showChainList={() => setIsShowChainList(true)}
        onChange={() => {}}
      />
      {/* exchange icon */}
      <i className={styles.exchangeIcon}></i>
      {/* amount out */}
      <OutputBox
        showTokenList={() => setIsShowTokenList(true)}
        showChainList={() => setIsShowChainList(true)}
      />
      <div className={styles.swapButton}>
        {account ? (
          <Button>Swap</Button>
        ) : (
          <Button onClick={() => connect("metamask")}>Connect Wallet</Button>
        )}
      </div>

      <TokenListModal
        open={isShowTokenList}
        onCancel={() => setIsShowTokenList(false)}
        onSelected={(token) => {
          console.log("selected token", token);
        }}
      />

      <ChainListModal
        open={isShowChainList}
        onCancel={() => setIsShowChainList(false)}
        onSelected={(chain) => {
          console.log("selected chain", chain);
          setIsShowChainList(false);
        }}
      />
    </div>
  );
}
