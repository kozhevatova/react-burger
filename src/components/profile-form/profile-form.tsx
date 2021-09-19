import React, { useRef, useState } from 'react';
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserInfo,
  setProfileFormValue,
  updateUserInfo,
} from "../../services/actions/user";
import styles from './profile-form.module.css';

const ProfileForm = () => {
  const { email, password, name } = useSelector((store: any) => ({
    ...store.user.profileForm,
  }));

  const initialIconState = {
    name: false,
    email: false,
    password: false,
  };
  const [isInputInFocus, setIsInputInFocus] = useState(initialIconState);
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onChange = (e: any) => {
    dispatch(setProfileFormValue(e.target.name, e.target.value));
  };

  const clearField = (name: any) => {
    dispatch(setProfileFormValue(name, ""));
  };

  const onIconClick = (ref: any) => {
    setIsInputInFocus({
      ...initialIconState,
      [ref.current?.name]: true,
    });
    setTimeout(() => {
      ref.current?.focus();
    }, 0);
  };

  const resetChanges = (e: any) => {
    e.preventDefault();
    dispatch(getUserInfo());
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUserInfo());
  };

  return( <form onSubmit={onSubmit}>
    <ul className={styles.inputList}>
      <li className={styles.inputListItem}>
        <Input
          type="text"
          name={"name"}
          value={name}
          onChange={onChange}
          placeholder="Имя"
          ref={nameRef}
          icon={isInputInFocus.name ? "CloseIcon" : "EditIcon"}
          onIconClick={() =>
            isInputInFocus.name ? clearField("name") : onIconClick(nameRef)
          }
        />
      </li>
      <li className={styles.inputListItem}>
        <Input
          type="email"
          name={"email"}
          value={email}
          onChange={onChange}
          placeholder="Логин"
          ref={emailRef}
          icon={isInputInFocus.email ? "CloseIcon" : "EditIcon"}
          onIconClick={() =>
            isInputInFocus.email
              ? clearField("email")
              : onIconClick(emailRef)
          }
        />
      </li>
      <li className={styles.inputListItem}>
        <Input
          type="password"
          name={"password"}
          value={password}
          onChange={onChange}
          placeholder="Пароль"
          ref={passwordRef}
          icon={isInputInFocus.password ? "CloseIcon" : "EditIcon"}
          onIconClick={() =>
            isInputInFocus.password
              ? clearField("password")
              : onIconClick(passwordRef)
          }
        />
      </li>
    </ul>
    <div className={styles.buttons}>
      <Button type="secondary" onClick={resetChanges}>
        Отменить
      </Button>
      <Button type="primary">Сохранить</Button>
    </div>
  </form>)
}

export default ProfileForm;