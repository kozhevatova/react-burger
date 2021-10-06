import React, { FC, SyntheticEvent, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { NavLink, useHistory } from "react-router-dom";
import { IModal } from "../../types/types";

const Modal:FC<IModal> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const history = useHistory();

  const modalRoot = document.getElementById("react-modals");
  const titleClassName = classNames(styles.title, "text text_type_main-large");

  const changeIconType = () => {
    setIsHovered(!isHovered);
  };

  const handleClickOnOverlay = (e:SyntheticEvent) => {
    props.handleCloseByClickOnOverlay(e);
    history.replace({pathname: '/'})
  }
  return modalRoot
    ? ReactDOM.createPortal(
        <ModalOverlay
          handleCloseByClickOnOverlay={handleClickOnOverlay}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={titleClassName}>{props.title}</h2>
              <NavLink
                to="/"
                className={styles.closeButton}
                onMouseOver={changeIconType}
                onMouseLeave={changeIconType}
                onClick={props.handleModalClose}
              >
                {isHovered ? (
                  <CloseIcon type="secondary" />
                ) : (
                  <CloseIcon type="primary" />
                )}
              </NavLink>
            </div>
            {props.children}
          </div>
        </ModalOverlay>,
        modalRoot
      )
    : null;
};

export default Modal;
