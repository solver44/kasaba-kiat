import {
  Label,
  Intent,
  ControlGroup,
  HTMLSelect,
  TextArea,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import translateKey from "../../../services/localization/translateText";
import { InputGroupWithMessage } from "../../Widgets/Input";
import MultiSelectInput from "../../Widgets/MultiSelectInput";
import FormTemplate from "../Template";
import { getAll } from "../../../services/http/admin/permissions";

const initialValue = {
  name: "",
  permissions: [],
  comment: "",
  is_active: true,
};
function FormBody(props) {
  const properties = useSelector((state) => state.properties);

  const { intent = Intent.NONE, errorMessage = {} } = props;

  const [formValues, setFormValues] = useState(initialValue);

  useEffect(() => {
    setFormValues(props.data);
    props.setValues(props.data, initialValue); //send value to parent
  }, [props.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    props.setValues({ ...formValues, [name]: value }, initialValue); //send value to parent
  };

  const handlePermissionSelect = (data) => {
    setFormValues({ ...formValues, permissions: data });
    props.setValues({ ...formValues, permissions: data }, initialValue); //send value to parent
  };

  return (
    <>
      <Label className={props.inline ? "bp4-inline" : ""}>
        {translateKey("name")} <span className="bp4-text-muted">*</span>
        <InputGroupWithMessage
          fill={true}
          onChange={handleChange}
          name={"name"}
          value={formValues.name}
          intent={errorMessage.name ? Intent.DANGER : intent}
          large={properties.inputLarge}
          message={errorMessage.name}
        />
      </Label>
      <MultiSelectInput
        defaultValues={formValues.permissions.map((i) => i.id)}
        errorMessage={errorMessage.permissions}
        label={translateKey("permissions")}
        required={true}
        fetchData={getAll}
        handleDataSelect={handlePermissionSelect}
      />
      <Label className={props.inline ? "bp4-inline" : ""}>
        {translateKey("comment")}
        <TextArea
          name={"comment"}
          growVertically={true}
          fill={true}
          onChange={handleChange}
          value={formValues.comment}
        />
      </Label>
    </>
  );
}

export default function RolesForm(props) {
  const { isOpen, handleClose, isLoading, saveRow, error, data, ...inprops } =
    props;

  return (
    <FormTemplate
      title={translateKey("add_role")}
      FormBody={FormBody}
      initialValue={initialValue}
      isOpen={isOpen}
      handleClose={handleClose}
      isLoading={isLoading}
      saveRow={saveRow}
      error={error}
      data={data}
      {...inprops}
    />
  );
}
