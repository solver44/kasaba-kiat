import { AppToaster } from "../components/AppToaster/toaster";
import { setClipboard } from "../store/actions/clipboard";

export function copyToClipboard(dispatch, obj) {
  try {
    dispatch(setClipboard(obj));
  } catch (error) {
    AppToaster({ message: error.message, intent: "danger" });
  }
}

export function copyToClipboard2(obj) {
  try {
    navigator.clipboard.writeText(obj);
  } catch (error) {
    AppToaster({ message: error.message, intent: "danger" });
  }
}
