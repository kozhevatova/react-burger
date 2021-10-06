import React, { FC, SyntheticEvent } from "react";
import { registerLinks, registerTitles } from "../../utils/constants";
import AuthForm from "../auth-form/auth-form";
import { useDispatch } from "react-redux";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  registerFormSubmit,
  setRegisterFormValue,
} from "../../services/actions/user";
import { AppDispatch, useSelectorHook } from "../../services/store";
import { getCookie } from "../../utils/utils";
import { Redirect } from "react-router-dom";

const Register:FC = () => {
  const { email, password, name } = useSelectorHook((store) => ({
    ...store.user.registerForm,
  }));
  const user  = useSelectorHook((store) => store.user);
  const dispatch:AppDispatch = useDispatch();
  const { formTitle, buttonTitle } = registerTitles;

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(setRegisterFormValue(name, value));
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerFormSubmit());
  };

  if (getCookie("token") && user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <AuthForm
      title={formTitle}
      buttonTitle={buttonTitle}
      links={registerLinks}
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        onChange={onChange}
        value={name}
        name={"name"}
        placeholder={"Имя"}
      />
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

export default Register;
