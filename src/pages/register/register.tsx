import React, { FC, SyntheticEvent } from "react";
import { registerLinks, registerTitles } from "../../utils/constants";
import AuthForm from "../../components/auth-form/auth-form";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  registerFormSubmit,
  setRegisterFormValue,
} from "../../services/actions/user";
import { useAppDispatch, useSelectorHook } from "../../services/store";
import { Redirect, useLocation } from "react-router-dom";
import { LocationState } from "../../types/types";

const Register:FC = () => {
  const { email, password, name } = useSelectorHook((store) => ({
    ...store.user.registerForm,
  }));
  const user  = useSelectorHook((store) => store.user.user.name);
  const dispatch = useAppDispatch();
  const { formTitle, buttonTitle } = registerTitles;
  const location = useLocation<LocationState>();


  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(setRegisterFormValue(name, value));
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerFormSubmit());
  };

  if (user) {
    const { from } = location.state ? location.state : { from: { pathname: "/" } };
    return <Redirect to={from} />;
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
