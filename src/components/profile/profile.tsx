import React from "react";
import styles from "./profile.module.css";
import ProfileMenu from "../profile-menu/profile-menu";
import PropTypes from "prop-types";

const Profile = ({children}:any) => {
  return (
    <section className={styles.profile}>
      <ProfileMenu />
      {children}
    </section>
  );
};

Profile.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Profile;
