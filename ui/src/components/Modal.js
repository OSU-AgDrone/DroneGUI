import React from 'react';
import '../renderer/App.css';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
        <br/>
        {children}
    </div>
  );
}; 

export default Modal;