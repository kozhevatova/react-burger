import React from 'react';
import {forgotPasswordLinks, forgotPasswordTitles} from '../../utils/constants';
import AuthForm from '../auth-form/auth-form';
import { useSelector, useDispatch } from "react-redux";
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {setForgotPasswordFormValue} from '../../services/actions/form';

const ForgotPassword = () => {
  const { email } = useSelector((store: any) => ({ ...store.form.forgotPasswordForm }));
  const dispatch = useDispatch();
  const { formTitle, buttonTitle } = forgotPasswordTitles;
  const onChange = (e: any) => {
    dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
  };
  return(
    <AuthForm title={formTitle} buttonTitle={buttonTitle} links={forgotPasswordLinks}>
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
}

export default ForgotPassword;