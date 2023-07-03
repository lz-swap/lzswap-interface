import styles from "./index.less";
import { useState } from "react";
import { Button, message } from "antd";

import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";
import TokenListModal from "@/components/TokenListModal";
import ChainListModal from "@/components/ChainListModal";
import useWallet, { switchToChainId, useBalance } from "@/hooks/useWallet";
import { onlyNumber, NumType, toBN } from "@/utils/bn";
import { LZChainIds } from "@/constants";
import useSwapAndBrdige from "@/hooks/useSwapAndBridge";
import useOFT from "@/hooks/useOFT";
import useNotification from "@/components/Notification";
import getMessagesBySrcTxHash, { generateLZScanUrl } from "@/utils/lzscan";

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
  const { swapAndBridge } = useSwapAndBrdige();
  const { estimateSendFee } = useOFT();
  const [loading, setLoading] = useState(false);
  const { notify, contextHolder } = useNotification();

  const exchangeInputOutput = async () => {
    const tempChainId = fromChainId;
    await switchToChainId(toChainId);
    setFromChainId(toChainId);
    setToChainId(tempChainId);
  };

  const handleInputMax = () => {
    setAmountIn(toBN(balance).div(1e18).minus(0.003).toString());
  };

  const loopScanUrl = (txhash: string) => {
    const interval = setInterval(async () => {
      const { messages } = await getMessagesBySrcTxHash(txhash);
      if (messages.length > 0) {
        const lzscanUrl = generateLZScanUrl(messages[0]);
        notify("swap success", lzscanUrl, "success");
        clearInterval(interval);
      }
    }, 2000);
  };

  const handleSwap = async () => {
    try {
      const destChainId = LZChainIds[toChainId].lzChainId;
      const nativeFee = (
        await estimateSendFee(
          destChainId,
          account!,
          toBN(amountIn).multipliedBy(1e18).toString()
        )
      ).nativeFee;
      setLoading(true);
      const tx = await swapAndBridge(
        toBN(amountIn).toString(),
        destChainId,
        nativeFee
      );
      await tx?.wait();
      message.success("swap and bridge success");
      loopScanUrl(tx?.hash);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const SwapButton = () => {
    if (!account) {
      return (
        <Button onClick={() => connect("metamask")}>Connect Wallet</Button>
      );
    } else {
      if (toBN(amountIn).multipliedBy(1e18).gt(toBN(balance))) {
        return <Button disabled>Invalid Amount In</Button>;
      } else {
        return (
          <Button loading={loading} onClick={handleSwap}>
            Swap
          </Button>
        );
      }
    }
  };

  return (
    <div className={styles.swapWrapper}>
      {contextHolder}
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
          setAmountIn(onlyNumber({ num: value }));
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
        {SwapButton()}
        {/* {account ? (
          <Button onClick={handleSwap}>Swap</Button>
        ) : (
          <Button onClick={() => connect("metamask")}>Connect Wallet</Button>
        )} */}
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
          setIsShowChainList(false);
        }}
      />
    </div>
  );
}
