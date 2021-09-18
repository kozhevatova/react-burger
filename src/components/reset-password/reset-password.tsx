import React, {useState} from "react";
import {
  forgotPasswordLinks,
  resetPasswordTitles,
} from "../../utils/constants";
import AuthForm from "../auth-form/auth-form";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { setResetPasswordFormValue } from "../../services/actions/form";

const ResetPassword = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { token, newPassword } = useSelector((store: any) => ({
    ...store.form.resetPasswordForm,
  }));

  const dispatch = useDispatch();
  const { formTitle, buttonTitle } = resetPasswordTitles;
  const onChange = (e: any) => {
    dispatch(setResetPasswordFormValue(e.target.name, e.target.value));
  };
  const onIconClick = () => {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <AuthForm
      title={formTitle}
      buttonTitle={buttonTitle}
      links={forgotPasswordLinks}
    >
      <Input
        type={isPasswordShown ? "text" : "password"}
        value={newPassword}
        name={"newPassword"}
        onChange={onChange}
        size="default"
        icon={isPasswordShown ? "HideIcon" : "ShowIcon"}
        placeholder="Введите новый пароль"
        onIconClick={onIconClick}
      />
      <Input
        type="text"
        value={token}
        name={"code"}
        onChange={onChange}
        size="default"
        placeholder="Введите код из письма"
      />
    </AuthForm>
  );
};

export default ResetPassword;
