import React, { useEffect } from "react";
import styles from "./profile.module.css";
import ProfileMenu from "../profile-menu/profile-menu";
import PropTypes from "prop-types";
import { WS_CONNECTION_START } from "../../services/actions/ws";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/utils";

const Profile = ({ children }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie("token")) {
      dispatch({ type: WS_CONNECTION_START, payload: "withAuth" });
    }
  }, [dispatch]);

  return (
    <section className={styles.profile}>
      <ProfileMenu />
      {children}
    </section>
  );
};

Profile.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Profile;
