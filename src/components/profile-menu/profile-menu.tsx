import React, { FC, SyntheticEvent } from "react";
import { profileMenuLinks } from "../../utils/constants";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./profile-menu.module.css";
import { logout } from "../../services/actions/user";
import classNames from "classnames";
import { chooseMenuCaption } from "../../utils/utils";
import { useAppDispatch } from "../../services/store";

const ProfileMenu:FC = () => {
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();
  const linkClassName = classNames(styles.link, "text text_type_main-medium");
  const textClassName = classNames(
    styles.text,
    "text text_type_main-default text_color_inactive"
  );

  const onClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    const { id } = e.target as HTMLAnchorElement;
    if (id === "logout") {
      dispatch(logout());
    }
  };
  return (
    <nav>
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
      <p className={textClassName}>{chooseMenuCaption(path)}</p>
    </nav>
  );
};

export default ProfileMenu;
