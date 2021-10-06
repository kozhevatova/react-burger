import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  forgotPasswordLinks,
  resetPasswordTitles,
} from "../../utils/constants";
import AuthForm from "../auth-form/auth-form";
import { useDispatch } from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetPasswordFormSubmit,
  setResetPasswordFormValue,
} from "../../services/actions/user";
import { Redirect, useHistory } from "react-router";
import { AppDispatch, useSelectorHook } from "../../services/store";
import { getCookie } from "../../utils/utils";

const ResetPassword:FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const history = useHistory();
  const resetSuccess = useSelectorHook((store) => store.user.resetSuccess);
  const { token, newPassword } = useSelectorHook((store) => ({
    ...store.user.resetPasswordForm,
  }));
  const user  = useSelectorHook((store) => store.user);
  const dispatch: AppDispatch = useDispatch();
  const { formTitle, buttonTitle } = resetPasswordTitles;

  useEffect(() => {
    if (resetSuccess) {
      history.replace({ pathname: "/login" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSuccess]);
  
  if (getCookie("token") && user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  if (!localStorage.getItem("emailSent")) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(setResetPasswordFormValue(name, value));
  };

  const onIconClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPasswordFormSubmit());
  };

  return (
    <AuthForm
      title={formTitle}
      buttonTitle={buttonTitle}
      links={forgotPasswordLinks}
      onSubmit={onSubmit}
    >
      <Input
        type={isPasswordShown ? "text" : "password"}
        value={newPassword}
        name="newPassword"
        onChange={onChange}
        size="default"
        icon={isPasswordShown ? "HideIcon" : "ShowIcon"}
        placeholder="Введите новый пароль"
        onIconClick={onIconClick}
      />
      <Input
        type="text"
        value={token}
        name="token"
        onChange={onChange}
        size="default"
        placeholder="Введите код из письма"
      />
    </AuthForm>
  );
};

export default ResetPassword;
