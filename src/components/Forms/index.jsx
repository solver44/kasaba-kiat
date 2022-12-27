import { Button, Classes, Dialog, Divider, Drawer } from "@blueprintjs/core";
import React from "react";
import { useSelector } from "react-redux";
import translateKey from "../../services/localization/translateText";

function FormFooter({ handleSave, handleClose, isLoading, editable }) {
  const properties = useSelector((state) => state.properties);

  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button
          disabled={isLoading}
          large={properties.buttonLarge}
          outlined={properties.buttonOutlined}
          onClick={handleClose}
        >
          {translateKey("close")}
        </Button>
        {editable && (
          <Button
            onClick={handleSave}
            loading={isLoading}
            large={true}
            outlined={properties.buttonOutlined}
            type="submit"
            intent="primary"
          >
            {translateKey("save")}
          </Button>
        )}
      </div>
    </div>
  );
}

const empty = () => {};

export default function index({
  divider = false,
  isLoading,
  dialogBody,
  isOpen,
  title = null,
  handleClose = empty,
  customFooter,
  handleSave = empty,
  editable,
  ...other
}) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      canOutsideClickClose={false}
      title={editable ? title : ""}
      style={{ minWidth: "50%" }}
      {...other}
    >
      <div
        onKeyDown={(e) => {
          e.key === "Enter" ? handleSave(e) : empty();
        }}
        className="dialog-form"
      >
        <div className={Classes.DIALOG_BODY}>{dialogBody}</div>
        <Divider
          style={{ marginBottom: "10px", opacity: divider ? "1" : "0" }}
        />
        {customFooter ?? (
          <FormFooter
            handleSave={handleSave}
            editable={editable}
            isLoading={isLoading}
            handleClose={handleClose}
          />
        )}
      </div>
    </Dialog>
  );
}
