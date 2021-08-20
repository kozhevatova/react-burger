import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import modalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

const Modal = (props: any) => {
  const modalRoot = document.getElementById("react-modals");
  const titleClassName = classNames(
    modalStyles.title,
    "text text_type_main-large"
  );
  return modalRoot
    ? ReactDOM.createPortal(
        <ModalOverlay handleCloseByClickOnOverlay={props.handleCloseByClickOnOverlay}>
          <div className={modalStyles.modal}>
            <div className={modalStyles.modalHeader}>
              <h2 className={titleClassName}>{props.title}</h2>
              <CloseIcon type="primary" onClick={props.handleModalClose} />
            </div>
            {props.children}
          </div>
        </ModalOverlay>,
        modalRoot
      )
    : null;
};

export default Modal;
