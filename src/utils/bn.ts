import { BigNumber as BN } from "ethers";
import BigNumber from "bignumber.js";

export type BigNumberLike = BN | BigNumber | number | string;
export type NumType = string | number;

export function toBN(n: BigNumberLike): BigNumber {
  if (!n) return new BigNumber(0);
  return new BigNumber(n.toString(10));
}

export function toPow(decimals: number): BigNumber {
  return new BigNumber(10).pow(decimals);
}

export function expandTo18Decimals(n: BigNumberLike): BigNumber {
  return new BigNumber(toBN(n)).multipliedBy(new BigNumber(10).pow(18));
}

interface onlyNumberProp {
  num: number | string;
  decimals?: number;
  max?: number | string;
  isDown?: true;
}

export function onlyNumber({ num, decimals, max, isDown }: onlyNumberProp) {
  let n = String(num);
  const first = n.charAt(0);
  const second = n.charAt(1);

  n = n.replace(/[^\d\.]/g, "");
  n = n.replace(/^\./g, "");
  n = n.replace(/\.{2,}/g, ".");
  n = n.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

  if (decimals != undefined) {
    const arr = n.split(".");
    if (arr[1] && arr[1].length > decimals) {
      n = toFixed(num, decimals, isDown);
    }
  }

  if (first === "0" && second && second !== ".") {
    n = n.substr(1);
  }
  if (max && new BigNumber(max).lt(n)) {
    return String(max);
  }

  return n;
}

export function toFixed(
  n: BigNumber | string | number,
  decimalsToAppear = 2,
  isDown = true
): string {
  let num = new BigNumber(0);
  n = new BigNumber(n);
  if (new BigNumber(decimalsToAppear).gte(0)) {
    num = new BigNumber(
      n.toFixed(
        decimalsToAppear,
        isDown ? BigNumber.ROUND_DOWN : BigNumber.ROUND_UP
      )
    );
  } else {
    const powNum = new BigNumber(1).div(decimalsToAppear);
    const moduleoNum = n.modulo(powNum);
    const minusNum = n.minus(moduleoNum);
    num = isDown ? minusNum : minusNum.plus(powNum);
  }
  return num.toString(10);
}
