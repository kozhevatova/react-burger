import React, { FC, SyntheticEvent } from "react";
import { loginLinks, loginTitles } from "../../utils/constants";
import AuthForm from "../../components/auth-form/auth-form";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  loginFormSubmit,
  setLoginFormValue,
} from "../../services/actions/user";
import { useAppDispatch, useSelectorHook } from "../../services/store";
import { Redirect, useLocation } from "react-router-dom";
import { LocationState } from "../../types/types";

const Login: FC = () => {
  const { email, password } = useSelectorHook((store) => ({
    ...store.user.loginForm,
  }));
  const user = useSelectorHook((store) => store.user.user.name);
  const location = useLocation<LocationState>();

  const dispatch = useAppDispatch();

  const { formTitle, buttonTitle } = loginTitles;

  if (user) {
    console.log('redirect')
    const { from } = location.state ? location.state : { from: { pathname: "/" } };
    return <Redirect to={from} />;
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
