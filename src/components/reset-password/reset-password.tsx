import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  forgotPasswordLinks,
  resetPasswordTitles,
} from "../../utils/constants";
import AuthForm from "../auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetPasswordFormSubmit,
  setResetPasswordFormValue,
} from "../../services/actions/user";
import { Redirect, useHistory, useLocation } from "react-router";
import { useAppDispatch, useSelectorHook } from "../../services/store";
import { LocationState } from "../../types/types";

const ResetPassword:FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const history = useHistory();
  const resetSuccess = useSelectorHook((store) => store.user.resetSuccess);
  const { token, newPassword } = useSelectorHook((store) => ({
    ...store.user.resetPasswordForm,
  }));
  const user  = useSelectorHook((store) => store.user.user.name);
  const dispatch = useAppDispatch();
  const { formTitle, buttonTitle } = resetPasswordTitles;
  const location = useLocation<LocationState>();

  useEffect(() => {
    if (resetSuccess) {
      history.replace({ pathname: "/login" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSuccess]);
  
  if (user) {
    const { from } = location.state ? location.state : { from: { pathname: "/" } };
    return <Redirect to={from} />;
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
