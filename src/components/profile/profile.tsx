import React, { FC, useEffect } from "react";
import styles from "./profile.module.css";
import ProfileMenu from "../profile-menu/profile-menu";
import PropTypes from "prop-types";
import { WS_CONNECTION_START } from "../../services/actions/ws";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/utils";
import { AppDispatch } from "../../services/store";

const Profile:FC = (props) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (getCookie("token")) {
      dispatch({ type: WS_CONNECTION_START, payload: "withAuth" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.profile}>
      <ProfileMenu />
      {props.children}
    </section>
  );
};

Profile.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Profile;
