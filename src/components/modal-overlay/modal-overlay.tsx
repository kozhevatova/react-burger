import React, { FC, SyntheticEvent } from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay: FC<{
  handleCloseByClickOnOverlay: (e: SyntheticEvent) => void;
}> = (props) => {
  return (
    <section
      className={styles.overlay}
      onClick={props.handleCloseByClickOnOverlay}
    >
      {props.children}
    </section>
  );
};

export default ModalOverlay;
