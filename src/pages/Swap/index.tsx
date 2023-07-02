import styles from "./index.less";
import { useState } from "react";
import { Input, Button } from "antd";
import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";

import TokenListModal from "@/components/TokenListModal";
import ChainListModal from "@/components/ChainListModal";
import useWallet, { switchToChainId, useBalance } from "@/hooks/useWallet";
import { onlyNumber, NumType, toBN } from "@/utils/bn";

export default function Swap() {
  const [isShowTokenList, setIsShowTokenList] = useState(false);
  const [isShowChainList, setIsShowChainList] = useState(false);
  const balance = useBalance();
  const { account, connect } = useWallet();
  const [fromChainId, setFromChainId] = useState(11155111);
  const [toChainId, setToChainId] = useState(97);
  const [amountIn, setAmountIn] = useState<string | number>(0);
  const [amountOut, setAmountOut] = useState(0);
  const [currentShowChainList, setCurrentShowChainList] = useState("from");

  const exchangeInputOutput = async () => {
    const tempChainId = fromChainId;
    await switchToChainId(toChainId);
    setFromChainId(toChainId);
    setToChainId(tempChainId);
  };

  const handleInputMax = () => {
    setAmountIn(toBN(balance).div(1e18).toString());
  };

  return (
    <div className={styles.swapWrapper}>
      <InputBox
        showTokenList={() => setIsShowTokenList(true)}
        showChainList={() => {
          setIsShowChainList(true);
          setCurrentShowChainList("from");
        }}
        inputMax={handleInputMax}
        balance={balance}
        value={amountIn}
        chainId={fromChainId}
        onChange={(e) => {
          const value = e.target.value as NumType;
          setAmountIn(onlyNumber({ num: value, decimals: 2 }));
        }}
      />
      {/* exchange icon */}
      <i className={styles.exchangeIcon} onClick={exchangeInputOutput}></i>
      {/* amount out */}
      <OutputBox
        chainId={toChainId}
        showTokenList={() => setIsShowTokenList(true)}
        showChainList={() => {
          setIsShowChainList(true);
          setCurrentShowChainList("to");
        }}
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
        onSelected={(chainId) => {
          if (currentShowChainList === "from") {
            setFromChainId(chainId);
          } else {
            setToChainId(chainId);
          }
          console.log("selected chain", chainId);
          setIsShowChainList(false);
        }}
      />
    </div>
  );
}
