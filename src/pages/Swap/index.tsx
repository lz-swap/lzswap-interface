import { useState } from "react";
import { Button } from "antd";
import useSwapAndBrdige from "@/hooks/useSwapAndBridge";
import InputBox from "../components/InputBox";
import useWallet from "@/hooks/useWallet";
import { switchChain } from "@/utils";
import { onlyNumber } from "@/utils/helper";
import { LZChainIds } from "@/constants";

import styles from "./index.less";
import { ChainList, AddEthereumChainParameter } from "@/constants/chainlist";

export default function Swap() {
  const { swapAndBridge } = useSwapAndBrdige();
  const { chainId } = useWallet();
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [dstChainId, setDstChainId] = useState(0);
  const [inputChainInfo, setInputChainInfo] = useState<
    AddEthereumChainParameter | undefined
  >();
  const [outputChainInfo, setOutputChainInfo] = useState<
    AddEthereumChainParameter | undefined
  >();

  const handleAmountInSelect = async (value: string, option: any) => {
    if (Number(value) != Number(chainId)) {
      switchChain(Number(value));
    }
    setInputChainInfo(ChainList[Number(value)]);
  };

  const handleAmountOutSelect = (value: string, option: any) => {
    setOutputChainInfo(ChainList[Number(value)]);
    setDstChainId(LZChainIds[Number(value)].lzChainId);
  };

  const handleAmountIn = (value: string) => {
    setAmountIn(onlyNumber({ num: value }));
    setAmountOut(`${Number(value) * 0.01}`);
  };

  const handleSwap = async () => {
    const tx = await swapAndBridge(amountIn, dstChainId);
    if (tx) {
      console.log({ tx: tx.hash });
    }
  };

  return (
    <div className={styles.swapContainer}>
      <div>
        <InputBox
          onInputValueChange={handleAmountIn}
          onSelect={handleAmountInSelect}
          symbol={inputChainInfo?.nativeCurrency.symbol}
          value={amountIn}
        />
      </div>
      <div>
        <InputBox
          disableInput
          onSelect={handleAmountOutSelect}
          symbol={outputChainInfo?.nativeCurrency.symbol}
          value={amountOut}
        />
      </div>
      <div className={styles.swapBtn}>
        <Button type="primary" onClick={handleSwap}>
          Swap
        </Button>
      </div>
    </div>
  );
}
