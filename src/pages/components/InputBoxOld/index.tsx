import styles from "./index.less";
import { Input, Select } from "antd";

interface InputBoxProps {
  onSelect?: (value: string, option: any) => void;
  onInputValueChange?: (value: string) => void;
  disableInput?: boolean;
  symbol?: string;
  value?: string | number;
  options: { label: string; value: string | number }[];
  defaultValue?: string | undefined;
}

export default function InputBox({
  onSelect,
  onInputValueChange,
  disableInput,
  symbol,
  value,
  defaultValue,
  options,
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
      <div>
        <Select
          placeholder="select chain"
          options={options}
          onSelect={onSelect}
          defaultValue={defaultValue}
        ></Select>
      </div>
    </div>
  );
}
