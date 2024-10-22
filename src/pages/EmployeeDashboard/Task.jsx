import React, { useEffect, useState } from "react";
import { CheckIcon, CogIcon } from "@heroicons/react/24/outline";
import ApiService from "../../components/service/ApiService";
import axios from "axios";

export default function Task() {
  const [tasks, setTasks] = useState([]);

  // Fetch the task details from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await ApiService.getTaskDetails();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, []);

  // Mark task as completed
  const markTaskAsCompleted = async (taskId) => {
    try {
      await axios.get(
        `http://localhost:8080/api/v1/markTaskAsCompleted/${taskId}`
      );
      alert("Task marked as completed");
      // Optionally, you can re-fetch the task details after status change
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error.message);
    }
  };

  // Mark task as processing
  const markTaskAsProcessing = async (taskId) => {
    try {
      await axios.get(
        `http://localhost:8080/api/v1/markTaskAsProcessing/${taskId}`
      );
      alert("Task marked as processing");
      // Optionally, you can re-fetch the task details after status change
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "Processing" } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as processing:", error.message);
    }
  };

  return (
    <div className="font-[sans-serif] overflow-x-auto mt-12">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">
              Task Name
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Status
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Created Date
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Completed Date
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {tasks.map((task, index) => (
            <tr
              key={task.id}
              className={index % 2 === 0 ? "even:bg-blue-50" : ""}
            >
              <td className="p-4 text-sm text-black">{task.taskName}</td>
              <td className="p-4 text-sm text-black">{task.status}</td>
              <td className="p-4 text-sm text-black">{task.createdDate}</td>
              <td className="p-4 text-sm text-black">
                {task.completedDate || "N/A"}
              </td>
              <td className="p-4 text-sm text-black flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded flex items-center"
                  onClick={() => markTaskAsProcessing(task.id)}
                >
                  <CogIcon className="h-5 w-5 mr-1" />
                  Mark as Processing
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded flex items-center"
                  onClick={() => markTaskAsCompleted(task.id)}
                >
                  <CheckIcon className="h-5 w-5 mr-1" />
                  Mark as Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
