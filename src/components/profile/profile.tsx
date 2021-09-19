import React from "react";
import styles from "./profile.module.css";
import ProfileMenu from "../profile-menu/profile-menu";

const Profile = ({children}:any) => {
  return (
    <section className={styles.profile}>
      <ProfileMenu />
      {children}
    </section>
  );
};

export default Profile;
