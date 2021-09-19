import React, { useEffect, useState } from "react";
import {
  forgotPasswordLinks,
  resetPasswordTitles,
} from "../../utils/constants";
import AuthForm from "../auth-form/auth-form";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetPasswordFormSubmit,
  setResetPasswordFormValue,
} from "../../services/actions/user";
import { Redirect, useHistory } from "react-router";

const ResetPassword = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const history = useHistory();
  const resetSuccess = useSelector((store: any) => store.user.resetSuccess);
  const { token, newPassword } = useSelector((store: any) => ({
    ...store.user.resetPasswordForm,
  }));

  const dispatch = useDispatch();
  const { formTitle, buttonTitle } = resetPasswordTitles;

  useEffect(() => {
    if (resetSuccess) {
      history.replace({ pathname: "/login" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSuccess]);

  if (!localStorage.getItem("emailSent")) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  const onChange = (e: any) => {
    dispatch(setResetPasswordFormValue(e.target.name, e.target.value));
  };
  const onIconClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(resetPasswordFormSubmit());
    // if(localStorage.getItem('resetSuccess')) {
    //   history.replace({pathname:'/login'});
    // }
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
