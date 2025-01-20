import React, { useEffect, useState } from "react";
import apiServices from "../services/apiServices";
import { Task } from "../models/ITask";
import "./scss/_displayTask.scss";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiMiniArrowDown } from "react-icons/hi2";

const DisplayTask = ({
  data,
  setData,
}: {
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  //DELETE metod för att ta bort task från DB
  //göra funktion som hanterar click på soptunnan -> klar
  //apiServices.delete -> klar
  //modal som popar upp och frågar om man verkligen vill ta bort tasken
  //useState som kontrollerar ifall showModal är true eller inte -> klar
  //visar popUpmodal

  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiServices.get("/");
        setData(response);
      } catch (error) {
        console.error("GET METHOD FAILED: " + error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteCheck = (id: number) => {
    setShowPopUp(true);
    setSelectedTaskId(id);
  };

  const handleDeleteTask = async (id: number) => {
    console.log(id);
    try {
      const response = await apiServices.delete("/delete", { id });
      console.log(response);
      setData(data.filter((task) => task.id !== id));
    } catch (error) {
      console.error("DELETE METHOD FAILED: " + error);
    }
  };

  return (
    <div className="task-container">
      {data.length === 0 ? (
        <div className="no-tasks">
          <p>You have no tasks in progress, get productive!</p>
          {/* <IoIosArrowDown /> */}
          <HiMiniArrowDown size={20} style={{ marginTop: "1rem" }} />
        </div>
      ) : (
        <div>
          {data.map((task, index) => (
            <div key={index} className="task-card">
              <div className="upper-task-card">
                <div className="due-date-priority">
                  <p className="date">Due {task.dueDate}</p>
                  <p className={`${task.priority}-prio`}>{task.priority}</p>
                </div>
                <div className="icon-container">
                  <FaRegTrashCan
                    size={16}
                    onClick={() => handleDeleteCheck(task.id)}
                  />
                  <FaRegCheckCircle size={16} />
                </div>
              </div>
              <div className="lower-task-card">
                <p className="title">{task.title}</p>
                <p className="description">{task.description}</p>
              </div>
            </div>
          ))}

          {showPopUp && (
            <div className="overlay">
              <div className="popUp-container">
                <p>
                  Do you want to{" "}
                  <span style={{ color: "red", fontWeight: "600" }}>
                    delete
                  </span>{" "}
                  this task?
                </p>
                <div className="popUp-button-container">
                  <button
                    onClick={() => {
                      if (selectedTaskId !== null) {
                        handleDeleteTask(selectedTaskId);
                      }
                      setSelectedTaskId(0);
                      setShowPopUp(false);
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowPopUp(false)}>No, close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayTask;
