import React, { useState } from "react";

import { Button, Intent } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/actions";
import { useAuth } from "../services/auth";
import { InputGroupWithMessage } from "../components/Widgets/Input";
import { useRouter } from "next/router";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const disabled = false;
  const large = false;

  const dispatch = useDispatch();

  const router = useRouter();
  const auth = useAuth();

  const { from } = { from: { pathname: "/" } };
  const login = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const token = await auth.authenticate({ email: username, password });
    await new Promise((res) => setTimeout(res, 500));
    dispatch(setLoading(false));
    if (token) router.push(from.pathname);
  };

  return (
    <div className="login-wrapper">
      <div className="login-panel">
        <h4 className="login-title">КасабаКИАТ</h4>
        <form onSubmit={login} className="login-forms">
          <InputGroupWithMessage
            // type="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            disabled={disabled}
            large={large}
            placeholder="Login"
            leftIcon={"person"}
          />
          <InputGroupWithMessage
            onChange={(e) => setPassword(e.target.value)}
            disabled={disabled}
            large={large}
            placeholder="Паролни киритинг..."
            leftIcon="lock"
            type="password"
          />
          <Button
            type="submit"
            className="login-btn"
            rightIcon="arrow-right"
            intent={Intent.PRIMARY}
            text="Кириш"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
