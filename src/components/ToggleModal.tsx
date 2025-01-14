import React from "react";
import { useState } from "react";
import Modal from "./Modal";

const ToggleModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="add-task" onClick={handleAddTask}>
        Add task
      </button>

      {showModal && <Modal onClose={closeModal} />}
    </>
  );
};

export default ToggleModal;
