import React, { useEffect, useState } from "react";
import apiServices from "../services/apiServices";
import { Task } from "../models/ITask";
import "./scss/_displayTask.scss";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniArrowDown } from "react-icons/hi2";

const DisplayTask = ({
  data,
  setData,
}: {
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  //GET METOD för att hämta sparade tasks från databasen
  //spara i en variabel av något slag
  //OM inga hittas visa ett meddelande -> "You have no tasks in progress, get productive!"
  //mapa igenom svaret och skriv ut kort från datan
  //styla korten
  //när en ny task skapas måste allt renderas om

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
                  <FaRegTrashCan size={16} />
                  <FaRegCheckCircle size={16} />
                </div>
              </div>
              <div className="lower-task-card">
                <p className="title">{task.title}</p>
                <p className="description">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayTask;
