import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = (props: any) => {
  return (
    <section
      className={styles.overlay}
      onClick={props.handleCloseByClickOnOverlay}
    >
      {props.children}
    </section>
  );
};

ModalOverlay.propTypes = {
  handleCloseByClickOnOverlay: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
