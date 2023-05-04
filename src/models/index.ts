import { useState } from "react";
import { createStore, createGlobalStore } from "hox";

import { BigNumberLike } from "@/utils/bn";

export const [useGlobalStore, getGlobalStore] = createGlobalStore(() => {
  const [balance, setBalance] = useState<BigNumberLike>("0");

  function setBalanceStore(balance: BigNumberLike) {
    setBalance(balance);
  }

  return {
    balance,

    setBalanceStore,
  };
});
