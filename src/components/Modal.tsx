import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import "./scss/_modal.scss";
import { Task } from "../models/ITask";
import apiServices from "../services/apiServices";

interface ModalProps {
  onClose: () => void;
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Modal: React.FC<ModalProps> = ({ onClose, data, setData }) => {
  //spara data från formuläret - klar
  //onclick på submitknappen - klar
  //skapa interface -> klar
  //spara data från varje input antingen i en useState - klar
  //skicka förfrågan till backend -> klar
  //stänga modal

  const [error, setError] = useState<string>("");

  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    title: "",
    dueDate: "",
    description: "",
    priority: "",
    createdAT: "jibbery",
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

    try {
      if (
        !newTask.title ||
        !newTask.dueDate ||
        !newTask.description ||
        !newTask.priority
      ) {
        setError("You need to fill in all fields to create a Task!");
        return;
      }
      const response = await apiServices.post("/add", newTask);
      setData([...data, response]);
      console.log("TASK ADDED: ", response);
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
          <select
            id="priority"
            name="priority"
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              Choose Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="submit-task" onClick={handleSubmit}>
            Submit
          </button>
          {error && (
            <p style={{ color: "#FF746C", fontWeight: "bold" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
