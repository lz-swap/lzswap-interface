import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

export default function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  function notify(
    message: string,
    description: string,
    type: NotificationType
  ) {
    api[type]({
      message,
      description: (
        <a target="_blank" href={description}>
          View on layerzero scan
        </a>
      ),
    });
  }

  return {
    contextHolder,
    notify,
  };
}
