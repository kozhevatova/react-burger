import React, {useCallback, useRef, useState} from "react";
import styles from "./profile.module.css";
import { profileMenuLinks } from "../../utils/constants";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { setProfileFormValue } from "../../services/actions/form";

const Profile = () => {
  const user = useSelector((store:any) => store.form.user);
  const { email, password, name } = useSelector((store: any) => ({
    ...store.form.profileForm,
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
  const formRef = useRef<HTMLFormElement>(null);

  const buttonClassName = classNames(
    styles.button,
    'text_type_main-default'
  )

  const onChange = (e: any) => {
    dispatch(setProfileFormValue(e.target.name, e.target.value));
  };

  const clearField = (name:any) => {
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

  const resetChanges = () => {
    console.log('reset')
  }

  const onSubmit = useCallback((e:any) => {
    e.preventDefault();
    console.log('submit', email, name, password);
  }, [email,password,name]);

  const linkClassName = classNames(styles.link, "text text_type_main-medium");
  return (
    <section className={styles.profile}>
      <ul className={styles.linkList}>
        {profileMenuLinks.map((link, index) => {
          return (
            <li className={styles.linkListItem} key={index}>
              <NavLink
                to={link.link}
                className={linkClassName}
                activeClassName={styles.activeLink}
              >
                {link.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <form onSubmit={onSubmit} ref={formRef}>
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
              onIconClick={() => isInputInFocus.name ? clearField("name") : onIconClick(nameRef)}
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
              onIconClick={() => isInputInFocus.email ? clearField("email") : onIconClick(emailRef)}
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
              onIconClick={() => isInputInFocus.password ? clearField("password") : onIconClick(passwordRef)}
            />
          </li>
        </ul>
        <div className={styles.buttons}>
          <Button type="secondary" onClick={resetChanges}>Отменить</Button>
          <Button type="primary">Сохранить</Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
