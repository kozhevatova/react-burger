import React from "react";
import { registerLinks, registerTitles } from "../../utils/constants";
import AuthForm from "../auth-form/auth-form";
import { useSelector, useDispatch } from "react-redux";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  registerFormSubmit,
  setRegisterFormValue,
} from "../../services/actions/user";

const Register = () => {
  const { email, password, name } = useSelector((store: any) => ({
    ...store.user.registerForm,
  }));
  const dispatch = useDispatch();
  const { formTitle, buttonTitle } = registerTitles;
  const onChange = (e: any) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(registerFormSubmit());
  };

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
