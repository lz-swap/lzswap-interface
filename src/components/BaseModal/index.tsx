import { Input, Modal, ModalProps } from "antd";
import styles from "./index.less";

interface BaseModalProps extends ModalProps {}

export default function BaseModal(props: BaseModalProps) {
  const { children, ...rest } = props;
  return (
    <div className={styles.modalWrapper}>
      <Modal width={468} className={styles.modalWrapper} {...rest}>
        {children}
      </Modal>
    </div>
  );
}
