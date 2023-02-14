import { Label, Intent, ControlGroup, HTMLSelect } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import translateKey from "../../../services/localization/translateText";
import { LANGUAGE_OPTIONS } from "../../../shared/Constants";
import { InputGroupWithMessage } from "../../Widgets/Input";
import FormTemplate from "../Template";

const initialValue = {
  code: "",
  nomination: "",
  is_active: true,
};
const initialLangValue = {
  nomination: "",
  code: "",
};
function FormBody({ isOpen, ...props }) {
  const properties = useSelector((state) => state.properties);

  const { intent = Intent.NONE, errorMessage = {} } = props;

  const [formValues, setFormValues] = useState(initialValue);
  const [langValues, setLangValues] = useState(initialLangValue);

  useEffect(() => {
    setLangValues(initialLangValue);
    setFormValues(props.data);
    props.setValues(props.data, initialLangValue); //send value to parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name + langValues[name]]: value });

    props.setValues(
      { ...formValues, [name + langValues[name]]: value },
      langValues
    ); //send value to parent
  };
  const handleLanguage = (e) => {
    const value = e.target.value;
    setLangValues({ ...langValues, [e.target.getAttribute("tag")]: value });
    props.setValues(formValues, {
      ...langValues,
      [e.target.getAttribute("tag")]: value,
    }); //send value to parent
  };

  return (
    <>
    <Label className={props.inline ? "bp4-inline" : ""}>
        {translateKey("code")} <span className="bp4-text-muted">*</span>
        <InputGroupWithMessage
            fill={true}
            onChange={handleChange}
            name={"code"}
            value={formValues.code}
            intent={errorMessage.code ? Intent.DANGER : intent}
            large={properties.inputLarge}
            message={errorMessage.code}
          />
      </Label>
      <Label className={props.inline ? "bp4-inline" : ""}>
      {translateKey("nomination")} <span className="bp4-text-muted">*</span>
        <ControlGroup>
          <InputGroupWithMessage
            fill={true}
            onChange={handleChange}
            name={"nomination"}
            value={formValues.nomination}
            intent={errorMessage.nomination ? Intent.DANGER : intent}
            large={properties.inputLarge}
            message={errorMessage.nomination}
          />
        </ControlGroup>
      </Label>
    </>
    
  );
}

export default function SpEngineGoupForm(props) {
  const { isOpen, handleClose, isLoading, saveRow, error, data, ...inprops } =
    props;

  return (
    <FormTemplate
      title={translateKey("add_section")}
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
