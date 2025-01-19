import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import { Task } from "../models/ITask";
import "./scss/_toggleNavBar.scss";

const ToggleModal = ({
  data,
  setData,
}: {
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="add-task-container">
      <button className="add-task" onClick={handleAddTask}>
        Add task
      </button>

      {showModal && (
        <Modal onClose={closeModal} data={data} setData={setData} />
      )}
    </div>
  );
};

export default ToggleModal;
