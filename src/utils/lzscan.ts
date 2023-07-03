import { createClient } from "@layerzerolabs/scan-client";
const client = createClient("testnet");

export default function getMessagesBySrcTxHash(hash: string) {
  return client.getMessagesBySrcTxHash(hash);
}

interface IMessage {
  srcChainId: number;
  srcUaAddress: string;
  dstChainId: number;
  dstUaAddress: string;
  srcUaNonce: number;
}
export function generateLZScanUrl(message: IMessage) {
  const { srcChainId, srcUaAddress, dstChainId, dstUaAddress, srcUaNonce } =
    message;
  return `https://testnet.layerzeroscan.com/${srcChainId}/address/${srcUaAddress}/message/${dstChainId}/address/${dstUaAddress}/nonce/${srcUaNonce}`;
}
