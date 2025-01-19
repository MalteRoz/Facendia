import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ToggleModal from "../components/ToggleModal";
import DisplayTask from "../components/DisplayTask";
import { Task } from "../models/ITask";

const HomePage = () => {
  //setData här
  //skicka setData till DisplayTask -> klar
  //skicka setData till ToggleModal -> klar
  //ToggleModal skickar Modal -> klar

  const [data, setData] = useState<Task[]>([]);

  return (
    <>
      <NavBar />
      <DisplayTask data={data} setData={setData} />
      <ToggleModal data={data} setData={setData} />
    </>
  );
};

export default HomePage;
