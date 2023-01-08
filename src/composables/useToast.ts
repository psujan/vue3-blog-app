import { useToast, TYPE } from "vue-toastification";
import {
  SWR,
  createMessage,
  updateMessage,
  deleteMessage,
} from "@/common/constant";
const toast = useToast();

const useMessage = (title: string, crudType: string | undefined) => {
  switch (crudType) {
    case "create":
      return createMessage(title);
    case "update":
      return updateMessage(title);
    case "delete":
      return deleteMessage(title);
    default:
      return SWR;
  }
};

const showToast = (message: string, type: string) => {
  switch (type) {
    case "success":
      return toast(message, {
        type: TYPE.SUCCESS,
        timeout: 2000,
      });
    case "error":
      return toast(message, {
        type: TYPE.ERROR,
        timeout: 2000,
      });
    case "warning":
      return toast(message, {
        type: TYPE.WARNING,
        timeout: 2000,
      });
    case "info":
      return toast(message, {
        type: TYPE.INFO,
        timeout: 2000,
      });
    default:
      return toast(message, {
        type: TYPE.DEFAULT,
        timeout: 2000,
      });
  }
};

export { useMessage, showToast };
