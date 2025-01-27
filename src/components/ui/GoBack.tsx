import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import "./scss/_goBack.scss";

interface GoBackProps {
  onClose: () => void;
}

const GoBack: React.FC<GoBackProps> = ({ onClose }) => {
  return (
    <div className="go-back-container" onClick={onClose}>
      <IoChevronBackOutline />
      <span>go back</span>
    </div>
  );
};

export default GoBack;
