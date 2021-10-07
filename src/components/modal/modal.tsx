import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useHistory, useLocation } from "react-router-dom";
import { IModal, LocationState } from "../../types/types";

const Modal: FC<IModal> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation<LocationState>();

  const modalRoot = document.getElementById("react-modals");
  const titleClassName = classNames(styles.title, "text text_type_main-large");

  const changeIconType = () => {
    setIsHovered(!isHovered);
  };

  const handleClose = () => {
    props.handleModalClose();
    history.replace({
      pathname:
        location.state && location.state.background
          ? `${location.state.background.pathname}`
          : "/",
    });
  };

  const handleEscClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClickOnOverlay = (e: SyntheticEvent) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleClose();
  };
  return modalRoot
    ? ReactDOM.createPortal(
        <ModalOverlay handleCloseByClickOnOverlay={handleClickOnOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={titleClassName}>{props.title}</h2>
              <div
                className={styles.closeButton}
                onMouseOver={changeIconType}
                onMouseLeave={changeIconType}
                onClick={handleClose}
              >
                {isHovered ? (
                  <CloseIcon type="secondary" />
                ) : (
                  <CloseIcon type="primary" />
                )}
              </div>
            </div>
            {props.children}
          </div>
        </ModalOverlay>,
        modalRoot
      )
    : null;
};

export default Modal;
