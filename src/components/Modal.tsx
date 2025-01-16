import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import "./scss/_modal.scss";
import { Task } from "../models/ITask";
import apiServices from "../services/apiServices";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  //spara data från formuläret - klar
  //onclick på submitknappen - klar
  //skapa interface -> klar
  //spara data från varje input antingen i en useState - klar
  //skicka förfrågan till backend -> klar
  //stänga modal

  const [newTask, setNewTask] = useState<Task>({
    title: "",
    dueDate: "",
    description: "",
    priority: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("FORMDATA: ", JSON.stringify(newTask, null, 2));
    try {
      const response = await apiServices.post("/add", { newTask });
    } catch (error) {
      console.error("POST METHOD FAILED: " + error);
    }
    onClose();
  };

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
            onChange={handleChange}
          />
          <label htmlFor="due-date">Due by:</label>
          <input
            type="date"
            name="dueDate"
            id="due-date"
            onChange={handleChange}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Add description"
            className="textarea"
            onChange={handleChange}
          />
          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority" onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="submit-task" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
