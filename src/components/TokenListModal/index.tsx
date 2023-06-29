import c from "classnames";
import { ModalFuncProps, Input } from "antd";
import BaseModal from "../BaseModal";

import styles from "./index.less";

export default function TokenListModal(props: ModalFuncProps) {
  const { ...rest } = props;
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
          {[2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3].map(
            (item) => (
              <li>
                <TokenListItem />
              </li>
            )
          )}
        </ul>
      </div>
    </BaseModal>
  );
}

function TokenListItem() {
  return (
    <div className={c(["flex-row", styles["token-list-item"]])}>
      <div className={c(styles["token-info"])}>
        <i></i>
        <span>Tether USD</span>
      </div>
      <div className={c(styles["price-info"])}>
        <span>0.03</span>
        <span>USDT</span>
      </div>
    </div>
  );
}
