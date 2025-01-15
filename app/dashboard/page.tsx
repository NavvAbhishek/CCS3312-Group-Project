"use client";
import React, { useState, useEffect } from "react";
import { Button, Navbar, ViewTask } from "../components";
import axios from "axios";
import moment from "moment-timezone";
import toast from "react-hot-toast";

type TaskData = {
  _id: string;
  name: string;
  category: string;
  priority: string;
  date: string;
};

const Dashboard = () => {
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    date: moment().tz("Asia/Kolkata").startOf("day").format("YYYY-MM-DD"),
    priority: "low",
    category: "Personal",
  });
  const [todayTasks, setTodayTasks] = useState<TaskData[]>([]);
  const [otherTasks, setOtherTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Sending task data:", taskDetails);
      const response = await axios.post("/api/create-task", taskDetails);
      const newTask: TaskData = response.data.savedTask;
      console.log("Task Data added successfully", newTask);

      const taskDate = moment(newTask.date).tz("Asia/Kolkata").startOf("day");
      const today = moment().tz("Asia/Kolkata").startOf("day");

      // set data to localstorge
      const updatedTodayTasks = taskDate.isSame(today)
        ? [...todayTasks, newTask]
        : todayTasks;
      const updatedOtherTasks = !taskDate.isSame(today)
        ? [...otherTasks, newTask]
        : otherTasks;

      setTodayTasks(updatedTodayTasks);
      setOtherTasks(updatedOtherTasks);

      localStorage.setItem(
        "tasks",
        JSON.stringify([...updatedTodayTasks, ...updatedOtherTasks])
      );

      setTaskDetails({
        name: "",
        date: new Date().toISOString().split("T")[0],
        priority: "low",
        category: "Personal",
      });

      toast("Task Successfully created!", {
        icon: "👏",
      });
    } catch (error: any) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.log("Task add failed");
    }
  };

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const cachedTasks = localStorage.getItem("tasks");
        const today = moment().tz("Asia/Kolkata").startOf("day");
        const todayTasksTemp: TaskData[] = [];
        const otherTasksTemp: TaskData[] = [];

        if (cachedTasks) {
          const allTasks = JSON.parse(cachedTasks);
          allTasks.forEach((task: TaskData) => {
            const taskDate = moment(task.date)
              .tz("Asia/Kolkata")
              .startOf("day");
            if (taskDate.isSame(today)) {
              todayTasksTemp.push(task);
            } else {
              otherTasksTemp.push(task);
            }
          });

          setTodayTasks(todayTasksTemp);
          setOtherTasks(otherTasksTemp);
        } else {
          const res = await axios.get("/api/get-tasks");
          if (Array.isArray(res.data.data)) {
            res.data.data.forEach((task: TaskData) => {
              const taskDate = moment(task.date)
                .tz("Asia/Kolkata")
                .startOf("day");
              if (taskDate.isSame(today)) {
                todayTasksTemp.push(task);
              } else {
                otherTasksTemp.push(task);
              }
            });

            setTodayTasks(todayTasksTemp);
            setOtherTasks(otherTasksTemp);

            localStorage.setItem(
              "tasks",
              JSON.stringify([...todayTasksTemp, ...otherTasksTemp])
            );
          } else {
            console.error("Data is not an array", res.data);
          }
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getTaskData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-grow justify-center items-center md:items-start md:justify-evenly pt-14 dark:bg-black">
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="input_field" className="text-purple font-medium dark:text-yellow">
              📝 Add Task
            </label>
            <input
              id="input_field"
              type="text"
              value={taskDetails.name}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, name: e.target.value })
              }
              className="p-2 w-96 rounded-md text-blue dark:bg-white dark:text-black bg-yellow focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="date" className="text-purple font-medium mb-2 dark:text-yellow">
              📅 Pick Date
            </label>
            <input
              className="p-2 w-96 rounded-md dark:bg-white dark:text-black bg-yellow focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
              type="date"
              id="date"
              value={taskDetails.date}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, date: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mt-5">
            <label
              htmlFor="priority_select"
              className="text-purple font-medium dark:text-yellow"
            >
              📊 Set Priority
            </label>
            <select
              id="priority-select"
              value={taskDetails.priority}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, priority: e.target.value })
              }
              className="p-2 w-96 mt-2 rounded-md dark:bg-white dark:text-black bg-yellow focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col mt-5">
            <label
              htmlFor="priority_select"
              className="text-purple font-medium dark:text-yellow"
            >
              🗂️ Category
            </label>
            <select
              id="priority-select"
              value={taskDetails.category}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, category: e.target.value })
              }
              className="p-2 w-96 mt-2 rounded-md dark:bg-white dark:text-black bg-yellow focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
            >
              <option value="Personal">personal</option>
              <option value="Work">work</option>
              <option value="Home">home</option>
              <option value="Education">education</option>
              <option value="Health">health</option>
            </select>
          </div>
          <Button name="Add task" className="mt-5 py-[0.6rem] px-3 dark:bg-yellow" />
        </form>
        {loading ? (
          <div className="text-pink text-2xl font-semibold">
            Tasks Loading...
          </div>
        ) : (
          <ViewTask
            todayTasks={todayTasks}
            otherTasks={otherTasks}
            setTodayTasks={setTodayTasks}
            setOtherTasks={setOtherTasks}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
