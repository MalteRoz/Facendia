import React, { useEffect, useState } from "react";
import GoBack from "./GoBack";
import "./scss/_modal.scss";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div
      className={`modal-component-container ${isVisible ? "active" : ""} ${
        isClosing ? "closing" : ""
      } `}
    >
      <div className="modal-component-content">
        <GoBack onClose={handleClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
