import React, { useEffect, useState } from "react";
import apiServices from "../services/apiServices";
import { Task } from "../models/ITask";
import "./scss/_displayTask.scss";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiMiniArrowDown } from "react-icons/hi2";
import PopUp from "./PopUp";
import TaskModal from "./TaskModal";

const DisplayTask = ({
  data,
  setData,
}: {
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTask, setShowTask] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiServices.get("/");
        console.log("API Response:", response);
        setData(response);
      } catch (error) {
        console.error("GET METHOD FAILED: " + error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteCheck = (id: string) => {
    setSelectedTaskId(id);
    setShowPopUp(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await apiServices.delete("/delete", { id });
      console.log(response);
      setData(data.filter((task) => task.id !== id));
    } catch (error) {
      console.error("DELETE METHOD FAILED: " + error);
    }
  };

  const handleCompletedTask = async (taskId: string, currentState: boolean) => {
    try {
      const newState = !currentState;
      const response = await apiServices.put("/task-status", {
        id: taskId,
        completed: newState,
      });

      setData((prevData) =>
        prevData.map((task) =>
          task.id === taskId ? { ...task, completed: newState } : task
        )
      );
    } catch (error) {
      console.error("PUT METHOD FAILED: " + error);
    }
  };

  const closePopUp = () => setShowPopUp(false);

  const closeTaskModal = () => setShowTask(false);

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setShowTask(true);
  };
  return (
    <div className="task-container">
      {data.length === 0 ? (
        <div className="no-tasks">
          <p>You have no tasks in progress, get productive!</p>
          <HiMiniArrowDown size={20} style={{ marginTop: "1rem" }} />
        </div>
      ) : (
        <div>
          {data.map((task, index) => (
            <div
              key={index}
              className="task-card"
              onClick={() => openTaskModal(task)}
            >
              <div className="upper-task-card">
                <div className="due-date-priority">
                  <p
                    className={
                      task.completed === true ? "completed date" : "date"
                    }
                  >
                    Due {task.dueDate}
                  </p>
                  <p
                    className={
                      task.completed === true
                        ? `completed ${task.priority}-prio`
                        : `${task.priority}-prio`
                    }
                  >
                    {task.priority} prio
                  </p>
                </div>
                <div className="icon-container">
                  <FaRegTrashCan
                    size={16}
                    onClick={() => handleDeleteCheck(task.id)}
                  />
                  <FaRegCheckCircle
                    size={16}
                    onClick={() => handleCompletedTask(task.id, task.completed)}
                  />
                </div>
              </div>
              <div className="lower-task-card">
                <p
                  className={
                    task.completed === true ? "completed title" : "title"
                  }
                >
                  {task.title}
                </p>
                <p
                  className={
                    task.completed === true
                      ? "completed description"
                      : "description"
                  }
                >
                  {task.description}
                </p>
              </div>
            </div>
          ))}

          <PopUp isVisible={showPopUp} onClose={closePopUp}>
            <p className="popUp-text">
              Do you want to{" "}
              <span style={{ color: "red", fontWeight: "600" }}>delete</span>{" "}
              this task?
            </p>
            <div className="popUp-button-container">
              <button
                onClick={() => {
                  if (selectedTaskId !== null) {
                    handleDeleteTask(selectedTaskId);
                  }
                  closePopUp();
                }}
              >
                Yes
              </button>
              <button onClick={() => closePopUp()}>No, close</button>
            </div>
          </PopUp>

          {showTask && selectedTask && (
            <TaskModal onClose={closeTaskModal} task={selectedTask}></TaskModal>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayTask;
