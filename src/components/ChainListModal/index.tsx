import c from "classnames";
import { ModalFuncProps, Input } from "antd";
import BaseModal from "../BaseModal";

import { ChainList } from "@/constants/chainlist";
import styles from "./index.less";

interface ChainListModalProps extends ModalFuncProps {
  onSelected: (chainId: number) => void;
}

export default function ChainListModal(props: ChainListModalProps) {
  const { onSelected, ...rest } = props;
  return (
    <BaseModal title="Select a token" footer={false} {...rest}>
      <div className={c([styles["token-list-modal"]])}>
        <Input placeholder="Search token by name or address" allowClear />
        <div className={c("flex-row", styles["notice"])}>
          <i></i>
          <p>
            Below is the supported token list from Ethereum Mainnet to BNB
            Chain. More tokens can be found if you select other chains.
          </p>
        </div>
        <ul className={c(styles["token-list"])}>
          {Object.values(ChainList).map(({ chainName, chainId }) => (
            <li key={chainName} onClick={() => onSelected(Number(chainId))}>
              <ChainListItem title={chainName} />
            </li>
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}

interface ChainListItemProps {
  title: string;
}
function ChainListItem({ title }: ChainListItemProps) {
  return (
    <div className={c(["flex-row", styles["token-list-item"]])}>
      <div className={c(styles["token-info"])}>
        <i></i>
        <span>{title}</span>
      </div>
    </div>
  );
}
