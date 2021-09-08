import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal-window.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import ModalOverlay from "../modal-overlay/modal-overlay";

const ModalWindow = (props: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const modalRoot = document.getElementById("react-modals");
  const titleClassName = classNames(styles.title, "text text_type_main-large");
  const changeIconType = () => {
    setIsHovered(!isHovered);
  };

  return modalRoot
    ? ReactDOM.createPortal(
        <ModalOverlay
          handleCloseByClickOnOverlay={props.handleCloseByClickOnOverlay}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={titleClassName}>{props.title}</h2>
              <button
                className={styles.closeButton}
                type="button"
                onMouseOver={changeIconType}
                onMouseLeave={changeIconType}
                onClick={props.handleModalClose}
              >
                {isHovered ? (
                  <CloseIcon type="secondary" />
                ) : (
                  <CloseIcon type="primary" />
                )}
              </button>
            </div>
            {props.children}
          </div>
        </ModalOverlay>,
        modalRoot
      )
    : null;
};

ModalWindow.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  handleCloseByClickOnOverlay: PropTypes.func.isRequired,
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
};

export default ModalWindow;
