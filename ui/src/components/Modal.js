import React from 'react';
import '../renderer/App.css';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <br/>
        {children}
      </div>
    </div>
  );
};

export default Modal;