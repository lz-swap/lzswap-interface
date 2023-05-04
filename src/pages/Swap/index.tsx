import { useState } from "react";
import { Button, message } from "antd";
import { BigNumber } from "ethers";

import InputBox from "../components/InputBox";

import useSwapAndBrdige from "@/hooks/useSwapAndBridge";
import useUniswap from "@/hooks/useUniswap";
import useWallet from "@/hooks/useWallet";
import useOFT from "@/hooks/useOFT";

import { switchChain } from "@/utils";
import { onlyNumber, toFixed } from "@/utils/helper";
import { ContractAddress, LZChainIds } from "@/constants";
import { ChainList, AddEthereumChainParameter } from "@/constants/chainlist";
import { useGlobalStore } from "@/models";
import { toBN } from "@/utils/bn";
import { parseEther } from "ethers/lib/utils";
import styles from "./index.less";

export default function Swap() {
  const { swapAndBridge } = useSwapAndBrdige();
  const { getAmountsOut } = useUniswap();
  const { estimateSendFee } = useOFT();
  const { chainId, account } = useWallet();
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [dstChainId, setDstChainId] = useState(0);
  const [loading, setLoading] = useState(false);
  const { balance } = useGlobalStore();
  const [nativeFee, setNativeFee] = useState<BigNumber>(BigNumber.from(0));
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

  const handleAmountIn = async (value: string) => {
    message.destroy();
    if (!inputChainInfo) {
      message.error("Please select input chain");
      return;
    }
    if (!outputChainInfo) {
      message.error("Please select to chain");
      return;
    }
    const formatValue = onlyNumber({
      num: value,
      max: toBN(balance).div(1e18).toString(),
    });
    setAmountIn(formatValue);

    if (Number(formatValue) > 0) {
      extimatNativeFee(formatValue);
    }
  };

  const extimatNativeFee = async (value: string): Promise<BigNumber> => {
    const WETH = ContractAddress[Number(chainId)].WETH;
    const OFTAddress = ContractAddress[Number(chainId)].oft;
    const [, amountOut] = await getAmountsOut(parseEther(value), [
      WETH,
      OFTAddress,
    ]);
    setAmountOut(toBN(amountOut).div(1e18).toString());

    let nativeFee = (
      await estimateSendFee(
        LZChainIds[Number(outputChainInfo?.chainId)].lzChainId,
        account!,
        toBN(amountIn).multipliedBy(1e18).toString()
      )
    ).nativeFee;
    nativeFee = nativeFee.mul(5).div(4); // increase 20%
    setNativeFee(nativeFee);
    return nativeFee;
  };

  const handleSwap = async () => {
    try {
      setLoading(true);
      const tx = await swapAndBridge(amountIn, dstChainId, nativeFee);
      if (tx) {
        console.log({ tx: tx.hash });
      }
    } catch (error) {
      message.error("swap failed");
    } finally {
      setLoading(false);
    }
  };

  const chainOptions = Object.values(ChainList).map(
    (item: AddEthereumChainParameter) => {
      return {
        value: item.chainId,
        label: `${item.chainName} (${item.nativeCurrency.symbol})`,
      };
    }
  );

  return (
    <div className={styles.swapContainer}>
      <div>
        <InputBox
          onInputValueChange={handleAmountIn}
          onSelect={handleAmountInSelect}
          symbol={inputChainInfo?.nativeCurrency.symbol}
          value={amountIn}
          options={chainOptions}
        />
      </div>
      <div>
        <InputBox
          disableInput
          onSelect={handleAmountOutSelect}
          symbol={outputChainInfo?.nativeCurrency.symbol}
          value={amountOut}
          options={chainOptions}
        />
      </div>
      <div className={styles.fees}>
        <div>
          <span>NativeFee:</span>
          <span>
            {toFixed(toBN(nativeFee).div(1e18), 8)}{" "}
            {inputChainInfo ? inputChainInfo.nativeCurrency.symbol : ""}
          </span>
        </div>
      </div>
      <div className={styles.swapBtn}>
        <Button type="primary" onClick={handleSwap} loading={loading}>
          Swap
        </Button>
      </div>
    </div>
  );
}
