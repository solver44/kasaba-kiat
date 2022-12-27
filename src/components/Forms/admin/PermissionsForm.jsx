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
import { LANGUAGE_OPTIONS } from "../../../shared/Constants";
import { InputGroupWithMessage } from "../../Widgets/Input";
import FormTemplate from "../Template";

const initialValue = {
  name: "",
  translate_uz: "",
  translate_uzl: "",
  translate_ru: "",
  comment: "",
  is_active: true,
};
const initialLangValue = {
  translate: "_uz",
  name: "",
  comment: "",
};
function FormBody(props) {
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
      <Label className={props.inline ? "bp4-inline" : ""}>
        {translateKey("translate")}
        <ControlGroup>
          <InputGroupWithMessage
            fill={true}
            onChange={handleChange}
            name={"translate"}
            value={formValues["translate" + langValues.translate] ?? ""}
            intent={errorMessage.translate ? Intent.DANGER : intent}
            large={properties.inputLarge}
            message={errorMessage.translate}
          />
          <HTMLSelect
            onChange={handleLanguage}
            tag="translate"
            large={properties.inputLarge}
            options={LANGUAGE_OPTIONS}
          />
        </ControlGroup>
      </Label>
      <Label className={props.inline ? "bp4-inline" : ""}>
        {translateKey("comment")}
        <TextArea
          name={"comment"}
          growVertically={true}
          fill={true}
          onChange={handleChange}
          value={formValues.comment ?? ""}
        />
      </Label>
    </>
  );
}

export default function PermissionsForm(props) {
  const { isOpen, handleClose, isLoading, saveRow, error, data, ...inprops } =
    props;

  return (
    <FormTemplate
      title={translateKey("add_permission")}
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
