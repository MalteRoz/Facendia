import React, { Children } from "react";
import "./scss/_popUp.scss";

interface PopUpProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ isVisible, children, onClose }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <>
      {isVisible && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="popUp-container">{children}</div>
        </div>
      )}
    </>
  );
};

export default PopUp;
