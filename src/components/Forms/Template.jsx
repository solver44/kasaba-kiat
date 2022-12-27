import React, { useEffect, useRef, useState } from "react";
import Form from ".";
import translateKey from "../../services/localization/translateText";
import { NOT_REQUIRED_COLUMNS } from "../../shared/Constants";
import { AppToaster, ToasterWithDrawer } from "../AppToaster/toaster";

export default function FormTemplate(props) {
  const {
    FormBody,
    title,
    initialValue,
    requiredField,
    isOpen,
    handleClose,
    isLoading = false,
    saveRow,
    data,
    editable = true,
    ...other
  } = props;

  const values = useRef();
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validate(values.current);
    console.log(result);

    if (
      result === null ||
      JSON.stringify(values.current.value) === JSON.stringify(data)
    ) {
      AppToaster({
        message: translateKey("no_new_information"),
        intent: "warning",
      });
      return;
    }
    setFormErrors(result);
    if (Object.keys(result).length <= 0 && saveRow)
      saveRow(values.current.value);
  };

  const isBoolean = (val) => "boolean" === typeof val;
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validate = (values) => {
    let errors = {};

    // console.log(Object.keys(data), Object.keys(values.lang));
    // if (data) {
    //   const keysData = Object.keys(data);
    //   Object.keys(values.lang).map((inputName) =>
    //     !keysData.includes(inputName) ? delete values.lang[inputName] : null
    //   );
    // }

    try {
      const key_names = Object.keys(values.lang).filter(
        (col) => !NOT_REQUIRED_COLUMNS.includes(col)
      );

      const value_key_names = key_names.map(
        (item) =>
          item + (!isBoolean(values.lang[item]) ? values.lang[item] : "")
      );

      for (let i = 0; i < value_key_names.length; i++) {
        const key = value_key_names[i];

        if (
          !values ||
          isBoolean(values.value[key]) ||
          (requiredField && !requiredField.includes(key_names[i]))
        )
          continue;

        if (key.includes("confirm")) {
          const ind = value_key_names.indexOf(key.split("_")[1]);

          if (
            ind > -1 &&
            values.value[key] !== values.value[value_key_names[ind]]
          ) {
            errors[key_names[i]] = translateKey("confirm_does_not_match");
            errors[key_names[ind]] = translateKey("confirm_does_not_match");

            continue;
          }
        }

        if (!values.value[key])
          errors[key_names[i]] = translateKey("field_was_not_filled");
        else if (values.value[key]?.length <= 0)
          errors[key_names[i]] = translateKey("data_was_not_selected");
        else if (
          key.toLowerCase().includes("email") &&
          !validateEmail(values.value[key])
        )
          errors[key_names[i]] = translateKey("email_is_not_valid");
      }
    } catch (e) {
      // console.log(e);
      errors = null;
    }

    return errors;
  };

  return (
    <Form
      editable={editable}
      isLoading={isLoading}
      title={title}
      isOpen={isOpen}
      handleSave={handleSubmit}
      handleClose={handleClose}
      dialogBody={FormBody({
        isOpen,
        hasData: data ? true : false,
        data: data ?? initialValue,
        errorMessage: formErrors,
        setValues: (value, lang) => {
          values.current = { value, lang };
        },
      })}
      {...other}
    />
  );
}
