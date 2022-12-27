import {
  Label,
  Intent,
  TextArea,
  Divider,
  Checkbox,
  Button,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import translateKey from "../../../services/localization/translateText";
import { InputGroupWithMessage } from "../../Widgets/Input";
import FormTemplate from "../Template";
import { getAll } from "../../../services/http/admin/roles";
import { updateData } from "../../../services/http/admin/users";

import SelectInput from "../../Widgets/SelectInput";
import ChangePasswordDialog from "../other/ChangePassword";
import { AppToaster, ToasterWithDrawer2 } from "../../AppToaster/toaster";

const initialValue = {
  username: "",
  email: "",
  password: "",
  account_expired: false,
  account_locked: false,
  is_super_admin: false,
  roles: [],
  comment: "",
  is_active: true,
};
function FormBody(props) {
  const properties = useSelector((state) => state.properties);

  const { intent = Intent.NONE, errorMessage = {} } = props;

  const [formValues, setFormValues] = useState(initialValue);
  const [showChangePass, setShowChangePass] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setFormValues(props.data);
    props.setValues(props.data, initialValue); //send value to parent
  }, [props.data]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const type = e.target.type;

    const result = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormValues(result);
    props.setValues(result, initialValue); //send value to parent
  };

  const handleRoleSelect = (data) => {
    setFormValues({ ...formValues, roles: data });
    props.setValues({ ...formValues, roles: data }, initialValue); //send value to parent
  };

  const changePassword = () => {
    setShowChangePass(true);
  };
  const saveChangingPassword = async (data) => {
    setLoading(true);
    try {
      await updateData(props.data.id, { password: data.password });
      AppToaster({
        message: translateKey("password_changed_successfully"),
        intent: "success",
        detailed: data,
      });
    } catch (error) {
      ToasterWithDrawer2({
        title: error.message,
        body: error.response.data.error,
      });
    }
    setLoading(false);
    setShowChangePass(false);
  };

  return (
    <>
      <ChangePasswordDialog
        handleClose={() => setShowChangePass(false)}
        isOpen={showChangePass}
        isLoading={isLoading}
        saveRow={saveChangingPassword}
        style={{ minWidth: "auto" }}
      />
      <div className="d-flex g-10">
        <div className="w-100">
          <InputGroupWithMessage
            leftIcon="person"
            label={translateKey("username")}
            required
            fill
            onChange={handleChange}
            name={"username"}
            type="username"
            value={formValues?.username}
            intent={errorMessage.username ? Intent.DANGER : intent}
            large={properties.inputLarge}
            message={errorMessage.username}
          />
          <InputGroupWithMessage
            leftIcon="envelope"
            label={translateKey("email")}
            required
            type="email"
            fill
            onChange={handleChange}
            name={"email"}
            value={formValues.email}
            intent={errorMessage?.email ? Intent.DANGER : intent}
            large={properties.inputLarge}
            message={errorMessage.email}
          />
          {!props.hasData ? (
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
          ) : (
            <Button onClick={changePassword} fill>
              {translateKey("change_password")}
            </Button>
          )}
        </div>
        <Divider />
        <div className="w-100">
          <SelectInput
            leftIcon="cog"
            defaultValues={formValues.roles.map((i) => i.id)}
            errorMessage={errorMessage.roles}
            label={translateKey("roles")}
            required
            fetchData={getAll}
            handleDataSelect={handleRoleSelect}
          />
          <Checkbox
            defaultChecked={formValues.is_super_admin}
            onChange={handleChange}
            label={translateKey("is_super_admin")}
            name="is_super_admin"
          />
          <Checkbox
            defaultChecked={formValues.account_locked}
            onChange={handleChange}
            label={translateKey("account_locked")}
            name="account_locked"
          />
        </div>
      </div>
      <Label
        style={{ marginTop: "20px" }}
        className={props.inline ? "bp4-inline" : ""}
      >
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

export default function UsersForm(props) {
  const { isOpen, handleClose, isLoading, saveRow, error, data, ...inprops } =
    props;

  return (
    <FormTemplate
      title={translateKey("add_user")}
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
