import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UniqueListTaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    status: "",
    createdDate: "",
    completedDate: "",
    employeeId: "",
    userId: ""
  });

  useEffect(() => {
    fetchTasks(status);
  }, [status]);

  const fetchTasks = (status) => {
    const url = `http://localhost:8080/api/v1/getAllTaskDetails/${status}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const deleteTask = (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchTasks(status);
          toast.success("Task deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          toast.error("Failed to delete task.");
        });
    } else {
      toast.info("Task deletion canceled.");
    }
  };
  

  const updateTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setFormData({
        taskName: task.taskName,
        status: task.status,
        createdDate: task.createdDate,
        completedDate: task.completedDate,
        employeeId: task.employee ? task.employee.id : "",
        userId: task.user ? task.user.id : ""
      });
      setSelectedTask(taskId);
      setShowModal(true);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleSubmit = () => {
    const updatedTask = {
      taskName: formData.taskName,
      status: formData.status,
      createdDate: formData.createdDate,
      completedDate: formData.completedDate,
      employee: { id: formData.employeeId },
      user: { id: formData.userId }
    };

    fetch(`http://localhost:8080/api/v1/tasks/${selectedTask}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
        setShowModal(false);
        fetchTasks(status);
        toast.success("Task updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        toast.error("Failed to update task");
      });
  };

  return (
    <div className="unique-container p-4">
      <h2 className="text-2xl font-bold mb-4">List Tasks</h2>
      <Link to="/add-task/_add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition mb-4 inline-block">
        Add Task
      </Link>

      <div className="w-max mx-auto bg-gray-200 border divide-x divide-white flex rounded overflow-hidden mb-4">
        {["All", "Pending", "Processing", "Completed"].map((stat) => (
          <button
            key={stat}
            type="button"
            onClick={() => handleStatusChange(stat)}
            className={`px-5 py-2.5 flex items-center text-sm outline-none hover:bg-gray-300 transition-all ${
              status === stat ? "bg-gray-300" : ""
            }`}
          >
            {stat}
          </button>
        ))}
      </div>

      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Completed Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-100">
              <td>{task.id}</td>
              <td>{task.taskName}</td>
              <td>{task.employee ? task.employee.id : "N/A"}</td>
              <td>
                {task.user
                  ? `${task.user.userFirstname || ""} ${
                      task.user.userLastname || ""
                    }`
                  : "N/A"}
              </td>
              <td>{task.employee ? task.employee.emailId : "N/A"}</td>
              <td>{task.createdDate}</td>
              <td>{task.status}</td>
              <td>{task.completedDate}</td>
              <td>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex items-center text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => updateTask(task.id)}
                    className="flex items-center text-blue-500 hover:text-blue-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Task</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Name
                </label>
                <input
                  type="text"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleFormChange}
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created Date
                </label>
                <input
                  type="date"
                  name="createdDate"
                  value={formData.createdDate}
                  onChange={handleFormChange}
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Completed Date
                </label>
                <input
                  type="date"
                  name="completedDate"
                  value={formData.completedDate}
                  onChange={handleFormChange}
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UniqueListTaskComponent;
