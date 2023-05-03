import styles from "./index.less";
import { Input, Select } from "antd";
import { ChainList, AddEthereumChainParameter } from "@/constants/chainlist";

const { Option } = Select;

const symbolOptions = Object.values(ChainList).map((item) => {
  return {
    value: item.chainId,
    label: item.nativeCurrency.symbol,
  };
});
const chainOptions = Object.values(ChainList).map(
  (item: AddEthereumChainParameter) => {
    return {
      value: item.chainId,
      label: `${item.chainName} (${item.nativeCurrency.symbol})`,
    };
  }
);

interface InputBoxProps {
  onSelect?: (value: string, option: any) => void;
  onInputValueChange?: (value: string) => void;
  disableInput?: boolean;
  symbol?: string;
  value?: string | number;
}

export default function InputBox({
  onSelect,
  onInputValueChange,
  disableInput,
  symbol,
  value,
}: InputBoxProps) {
  return (
    <div className={styles.inputBox}>
      <Input
        value={value}
        onChange={(e) =>
          onInputValueChange && onInputValueChange(e.target.value)
        }
        disabled={disableInput}
        addonAfter={symbol}
      ></Input>
      {/* <div>
        <Select
          placeholder="select token"
          options={symbolOptions}
          onSelect={onSelect}
        ></Select>
      </div> */}
      <div>
        <Select
          placeholder="select chain"
          options={chainOptions}
          onSelect={onSelect}
        ></Select>
      </div>
    </div>
  );
}
