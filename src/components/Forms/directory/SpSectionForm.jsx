import { Label, Intent, ControlGroup, HTMLSelect } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import translateKey from "../../../services/localization/translateText";
import { LANGUAGE_OPTIONS } from "../../../shared/Constants";
import { InputGroupWithMessage } from "../../Widgets/Input";
import FormTemplate from "../Template";

const initialValue = {
  name_uz: "",
  name_uzl: "",
  name_ru: "",
  is_active: true,
};
const initialLangValue = {
  name: "_uz",
};
function FormBody({ isOpen, ...props }) {
  const properties = useSelector((state) => state.properties);

  const { intent = Intent.NONE, errorMessage = {} } = props;

  const [formValues, setFormValues] = useState(initialValue);
  const [langValues, setLangValues] = useState(initialLangValue);

  useEffect(() => {
    setLangValues(initialLangValue);
    setFormValues(props.data);
    // props.setValues(props.data, initialLangValue); //send value to parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const res = { ...formValues, [name + langValues.name]: value };
    setFormValues(res);
    // console.log(langValues);
    props.setValues(res, langValues); //send value to parent
  };
  const handleLanguage = (e) => {
    console.log("handle");
    const value = e.target.value;
    const lang = { ...langValues, [e.target.getAttribute("tag")]: value };
    setLangValues(lang);
    props.setValues(formValues, lang); //send value to parent
  };

  return (
    <Label className={props.inline ? "bp4-inline" : ""}>
      Номи <span className="bp4-text-muted">*</span>
      <ControlGroup>
        <InputGroupWithMessage
          fill={true}
          onChange={handleChange}
          name={"name"}
          value={formValues["name" + (langValues?.name ?? "_uz")] ?? ""}
          intent={errorMessage.name ? Intent.DANGER : intent}
          large={properties.inputLarge}
          message={errorMessage.name}
        />
        <HTMLSelect
          onChange={handleLanguage}
          tag="name"
          large={properties.inputLarge}
          options={LANGUAGE_OPTIONS}
        />
      </ControlGroup>
    </Label>
  );
}

export default function SpSectionForm(props) {
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
