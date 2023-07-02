import moment from "moment";
import BigNumber from "bignumber.js";
/**
 * delay
 * @param timeout time
 * @returns Promise callback
 */
export async function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export function getTimestamp() {
  return Date.parse(new Date().toString()) / 1000;
}

export function getToken() {
  const tokenStr = localStorage.getItem("token");
  if (!tokenStr) return "";
  const tokenInfo = JSON.parse(tokenStr);
  return tokenInfo.access_token;
}

export async function toBase64(str: string) {
  const blob = new Blob([str], { type: "text/plain" });
  const base64: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e: any) => resolve(e.target.result);
    reader.onerror = (error) => reject(error);
  });
  return base64.replace("data:text/plain;base64,", "");
}

export function formatTime(time: number, formatr = "MM.DD hh:mm") {
  return moment(time * 1000).format(formatr);
}

export function sleep(time = 5000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
