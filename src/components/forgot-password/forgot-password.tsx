import React, { FC, SyntheticEvent, useEffect } from "react";
import {
  forgotPasswordLinks,
  forgotPasswordTitles,
} from "../../utils/constants";
import AuthForm from "../auth-form/auth-form";
import { useDispatch } from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  forgotPasswordFormSubmit,
  setForgotPasswordFormValue,
} from "../../services/actions/user";
import { Redirect, useHistory } from "react-router-dom";
import { AppDispatch, useSelectorHook } from "../../services/store";
import { getCookie } from "../../utils/utils";

const ForgotPassword:FC = () => {
  const history = useHistory();
  const { email } = useSelectorHook((store) => ({
    ...store.user.forgotPasswordForm,
  }));
  const user  = useSelectorHook((store) => store.user);
  const emailSent = useSelectorHook((store) => store.user.emailSent);
  const dispatch: AppDispatch = useDispatch();

  const { formTitle, buttonTitle } = forgotPasswordTitles;
  
  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const {name, value} = e.target as HTMLInputElement;
    dispatch(setForgotPasswordFormValue(name, value));
  };

  useEffect(() => {
    if (emailSent) {
      history.replace({ pathname: "/reset-password" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSent]);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordFormSubmit());
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
      links={forgotPasswordLinks}
      onSubmit={onSubmit}
    >
      <Input
        type="email"
        value={email}
        name={"email"}
        onChange={onChange}
        size="default"
        placeholder="Укажите e-mail"
      />
    </AuthForm>
  );
};

export default ForgotPassword;
