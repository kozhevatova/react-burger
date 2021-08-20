import React from 'react';
import overlayStyles from './ModalOverlay.module.css';

const ModalOverlay = (props:any) => {
  return(
    <section className={overlayStyles.overlay} onClick = {props.handleCloseByClickOnOverlay}>
      {props.children}
    </section>
  );
}

export default ModalOverlay;