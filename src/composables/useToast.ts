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
      });
    case "error":
      return toast(message, {
        type: TYPE.ERROR,
      });
    case "warning":
      return toast(message, {
        type: TYPE.WARNING,
      });
    case "info":
      return toast(message, {
        type: TYPE.INFO,
      });
    default:
      return toast(message, {
        type: TYPE.DEFAULT,
      });
  }
};

export { useMessage, showToast };
