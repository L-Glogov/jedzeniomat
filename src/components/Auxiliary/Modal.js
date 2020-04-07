import React, { Fragment } from 'react';
import styles from './Modal.module.css';
import Backdrop from './Backdrop';

const Modal = (props) => (
    <Fragment>
      <Backdrop/>
      <div className={styles.Modal}>
        {props.children}
      </div>
    </Fragment>
    
);

export default Modal;