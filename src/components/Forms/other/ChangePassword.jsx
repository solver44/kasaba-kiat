import { Label, Intent, ControlGroup, HTMLSelect } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import translateKey from "../../../services/localization/translateText";
import { AppToaster } from "../../AppToaster/toaster";
import { InputGroupWithMessage } from "../../Widgets/Input";
import FormTemplate from "../Template";

const initialValue = {
  password: "",
  confirm_password: "",
};
function FormBody(props) {
  const properties = useSelector((state) => state.properties);

  const { intent = Intent.NONE, errorMessage = {} } = props;

  const [formValues, setFormValues] = useState(initialValue);

  useEffect(() => {
    setFormValues(props.data);
    props.setValues(props.data, initialValue); //send value to parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    props.setValues({ ...formValues, [name]: value }, initialValue); //send value to parent
  };

  return (
    <>
      <InputGroupWithMessage
        leftIcon="lock"
        type="password"
        label={translateKey("password")}
        required
        fill
        onChange={handleChange}
        name={"password"}
        value={formValues.password ?? ""}
        intent={errorMessage.password ? Intent.DANGER : intent}
        large={properties.inputLarge}
        message={errorMessage.password}
      />
      <InputGroupWithMessage
        leftIcon="lock"
        type="password"
        label={translateKey("confirm_password")}
        required
        fill
        onChange={handleChange}
        name={"confirm_password"}
        value={formValues.confirm_password ?? ""}
        intent={errorMessage.confirm_password ? Intent.DANGER : intent}
        large={properties.inputLarge}
        message={errorMessage.confirm_password}
      />
    </>
  );
}

export default function ChangePasswordDialog(props) {
  const { isOpen, handleClose, isLoading, saveRow, data, ...inprops } = props;

  return (
    <FormTemplate
      title={translateKey("change_password")}
      FormBody={FormBody}
      initialValue={initialValue}
      isOpen={isOpen}
      handleClose={handleClose}
      isLoading={isLoading}
      saveRow={saveRow}
      data={data}
      {...inprops}
    />
  );
}
