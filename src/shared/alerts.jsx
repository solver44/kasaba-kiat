import { Alert, Intent } from "@blueprintjs/core";
import translateKey from "../services/localization/translateText";

export const confirmAlert = ({
  isOpen,
  isLoading,
  handleMoveCancel,
  handleMoveConfirm,

  confirmButtonText,
  intent,
  text,
  icon,
}) => (
  <Alert
    style={{ minWidth: "auto" }}
    cancelButtonText={translateKey("close")}
    confirmButtonText={confirmButtonText}
    icon={icon}
    intent={intent}
    isOpen={isOpen}
    loading={isLoading}
    onCancel={handleMoveCancel}
    onConfirm={handleMoveConfirm}
    canEscapeKeyCancel={true}
  >
    <p>{text}</p>
  </Alert>
);
