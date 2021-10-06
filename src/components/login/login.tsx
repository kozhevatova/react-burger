import React, { FC, SyntheticEvent } from "react";
import { loginLinks, loginTitles } from "../../utils/constants";
import { useDispatch } from "react-redux";
import AuthForm from "../auth-form/auth-form";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  loginFormSubmit,
  setLoginFormValue,
} from "../../services/actions/user";
import { AppDispatch, useSelectorHook } from "../../services/store";
import { getCookie } from "../../utils/utils";
import { Redirect } from "react-router-dom";

const Login: FC = () => {
  const { email, password } = useSelectorHook((store) => ({
    ...store.user.loginForm,
  }));
  const user  = useSelectorHook((store) => store.user);

  const dispatch: AppDispatch = useDispatch();

  const { formTitle, buttonTitle } = loginTitles;

  if (getCookie("token") && user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(setLoginFormValue(name, value));
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginFormSubmit());
  };
  return (
    <AuthForm
      title={formTitle}
      buttonTitle={buttonTitle}
      links={loginLinks}
      onSubmit={onSubmit}
    >
      <Input
        type="email"
        onChange={onChange}
        value={email}
        name={"email"}
        placeholder="E-mail"
      />
      <PasswordInput
        value={password}
        name={"password"}
        onChange={onChange}
        size="default"
      />
    </AuthForm>
  );
};

export default Login;
