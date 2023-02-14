import { Label, Intent, ControlGroup, HTMLSelect, Button } from "@blueprintjs/core";
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
  short_name_uz: "",
  short_name_uzl: "",
  short_name_ru: "",
  is_active: true,
};
const initialLangValue = {
  name: "_uz",
  short_name: "_uz",
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
      {translateKey("short_name")} <span className="bp4-text-muted">*</span>
      <ControlGroup>
        <InputGroupWithMessage
              fill={true}
              onChange={handleChange}
              disabled={true}
              value={formValues["short_name" + (langValues?.short_name ?? "_uz")] ?? ""}
              intent={errorMessage.short_name ? Intent.DANGER : intent}
              large={properties.inputLarge}
              message={errorMessage.short_name}
            />
            <Button className="bp4-button bp4-icon-small-cross bp4-intent-danger">
            </Button>
            <Button className="bp4-button bp4-intent-success"
              onClick={{}}
              icon="small-tick"
            >              
            </Button>
      </ControlGroup>
      
    </Label>
    <Label className={props.inline ? "bp4-inline" : ""}>
    {translateKey("short_name")} <span className="bp4-text-muted">*</span>
        <ControlGroup>
          <InputGroupWithMessage
            fill={true}
            onChange={handleChange}
            name={"short_name"}
            value={formValues["short_name" + (langValues?.short_name ?? "_uz")] ?? ""}
            intent={errorMessage.short_name ? Intent.DANGER : intent}
            large={properties.inputLarge}
            message={errorMessage.short_name}
          />
          <HTMLSelect
            onChange={handleLanguage}
            tag="short_name"
            large={properties.inputLarge}
            options={LANGUAGE_OPTIONS}
          />
        </ControlGroup>
      </Label>
      <Label className={props.inline ? "bp4-inline" : ""}>
      {translateKey("name")} <span className="bp4-text-muted">*</span>
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
    </>
    
  );
}

export default function SpTypeOfOrgForm(props) {
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
