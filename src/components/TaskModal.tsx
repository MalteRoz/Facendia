import React, { useState } from "react";
import Modal from "./ui/Modal";
import { Task } from "../models/ITask";
import "./scss/_taskModal.scss";
import { formatDate } from "../functions/functions";

interface TaskModalProps {
  onClose: () => void;
  task: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, task }) => {
  //användaren gör sina ändringar på tasken och sedan trycker på submit changes för att spara uppdateringen
  //en put metod kallas och skickar med den uppdaterade datan till mongoDB
  //om inga ändringar görs så ge ett meddelande under knappen för att förklara att det behövs finnas ändringar för att det ska gå igenom

  //fixa så att det går att ändra
  //Priority
  //Due Date
  // Task Status
  //textarea onChange useState -> klar

  const [showSelect, setShowSelect] = useState(false);

  const HandleShowSelect = () => setShowSelect(!showSelect);

  const [changedTask, setChangedTask] = useState<Task>({
    id: task.id,
    title: task.title,
    dueDate: task.dueDate,
    description: task.description,
    priority: task.priority,
    completed: task.completed,
    createdAt: task.createdAt,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setChangedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(changedTask);
  };

  return (
    <>
      <Modal onClose={onClose}>
        <div className="task-modal-container">
          <p className="task-modal-title">{task.title}</p>

          <div className="task-modal-content">
            <div className="priority-container">
              <p className="label">Priority</p>
              <div className="custom-dropdown">
                <p className="dropdown-toggle" onClick={HandleShowSelect}>
                  {task.priority} prio
                </p>
                {showSelect && (
                  <ul className="dropdown-menu">
                    <li>low prio</li>
                    <li>medium prio</li>
                    <li>high prio</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="createdAt-container">
              <p className="label">Created At </p>
              <p>{formatDate(task.createdAt)}</p>
            </div>

            <div className="date-container">
              <p className="label">Due date</p>
              <p className="date">{task.dueDate}</p>
            </div>

            <div className="completed-container">
              <p className="label">Task status</p>
              <p>{task.completed === true ? "completed" : "not completed"}</p>
            </div>
          </div>
          <div className="task-modal-desc-container">
            <textarea
              name="description"
              onChange={handleChange}
              value={changedTask.description}
            />
          </div>
          <button className="submit">submit changes</button>
        </div>
      </Modal>
    </>
  );
};

export default TaskModal;
