import React from "react";
import { loginLinks, loginTitles } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import AuthForm from "../auth-form/auth-form";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginFormSubmit, setLoginFormValue } from "../../services/actions/form";

const Login = () => {
  const { email, password } = useSelector((store: any) => ({
    ...store.form.loginForm,
  }));
  const dispatch = useDispatch();
  const { formTitle, buttonTitle } = loginTitles;
  const onChange = (e: any) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value));
  };

  const onSubmit = (e:any) => {
    e.preventDefault();
    dispatch(loginFormSubmit());
  }
  return (
    <AuthForm title={formTitle} buttonTitle={buttonTitle} links={loginLinks} onSubmit={onSubmit}>
      <Input type="email" onChange={onChange} value={email} name={"email"} placeholder="E-mail"/>
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
