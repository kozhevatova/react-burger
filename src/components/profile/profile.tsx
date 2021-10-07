import React, { FC, useEffect } from "react";
import styles from "./profile.module.css";
import ProfileMenu from "../profile-menu/profile-menu";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/ws";
import { useAppDispatch, useSelectorHook } from "../../services/store";

const Profile:FC = (props) => {
  const dispatch = useAppDispatch();
  const user  = useSelectorHook((store) => store.user.user.name);

  useEffect(() => {
    if (user) {
      dispatch({ type: WS_CONNECTION_START, payload: "withAuth" });
    }
    return(() => {
      dispatch({type: WS_CONNECTION_CLOSED});
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className={styles.profile}>
      <ProfileMenu />
      {props.children}
    </section>
  );
};

export default Profile;
