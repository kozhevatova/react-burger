import React, { useEffect } from "react";
import { profileMenuLinks } from "../../utils/constants";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from './profile-menu.module.css';
import {useDispatch}from 'react-redux';
import { logout } from "../../services/actions/user";
import classNames from 'classnames';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const {path, url} = useRouteMatch();
  const linkClassName = classNames(styles.link, "text text_type_main-medium");

  useEffect(()=> {
    console.log(path, url)
  }, [path, url])

  const onClick = (e:any) => {
    if(e.target.id === 'logout') {
      dispatch(logout());
    }
  }
  return (
    <ul className={styles.linkList}>
      {profileMenuLinks.map((link, index) => {
        return (
          <li className={styles.linkListItem} key={index}>
            <NavLink
              id={link.id}
              to={link.link}
              onClick={onClick}
              className={linkClassName}
              activeClassName={`${path === link.link && styles.activeLink}`}
            >
              {link.text}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default ProfileMenu;
