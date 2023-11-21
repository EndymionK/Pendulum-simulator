// AlertModal.js

import React from 'react';
import styles from '../../styles/AlertModal.module.css'; // Asegúrate de tener un archivo de estilos para tu modal

const AlertModal = ({ closeModal, message }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Alerta</h2>
        </div>
        <div className={styles.modalContent}>
          <p>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
