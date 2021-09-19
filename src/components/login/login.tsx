import React, { useEffect } from "react";
import { loginLinks, loginTitles } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import AuthForm from "../auth-form/auth-form";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginFormSubmit, setLoginFormValue } from "../../services/actions/user";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const { email, password } = useSelector((store: any) => ({
    ...store.user.loginForm,
  }));
  const loginSuccess = useSelector((store:any) => store.user.loginSuccess);
  const dispatch = useDispatch();
  const { formTitle, buttonTitle } = loginTitles;
  const onChange = (e: any) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value));
  };

  useEffect(() => {
    if(loginSuccess) {
      history.replace({pathname: '/'})
    }
  }, [loginSuccess, history]);
 
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
