import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import "./scss/_modal.scss";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="go-back-container" onClick={onClose}>
          <IoChevronBackOutline />
          <span>go back</span>
        </div>
        <p className="modal-header">Add a task</p>
        <form id="task-form" className="form">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Add title"
            required
          />
          <label htmlFor="due-date">Due by:</label>
          <input type="date" name="dueDate" id="due-date" />
          <textarea
            id="description"
            name="description"
            placeholder="Add description"
            className="textarea"
          ></textarea>
          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="submit-task">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
