import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskService from '../../services/TaskService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../../styles/ListTaskComponent.css';

const UniqueListTaskComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null); 

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        TaskService.getTasks()
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
                toast.error('Error fetching tasks');
            });
    };

    const deleteTask = (taskId) => {
        TaskService.deleteTask(taskId)
            .then(() => {
                fetchTasks();
                toast.success('Task deleted successfully!');
                setConfirmDelete(null); 
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
                toast.error('Error deleting task!');
            });
    };

    const handleDeleteClick = (taskId) => {
        setConfirmDelete(taskId); 
    };

    const handleConfirmDelete = () => {
        if (confirmDelete) {
            deleteTask(confirmDelete);
        }
    };

    return (
        <div className="unique-container">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            
            <h2 className="unique-task-title">List Tasks</h2>
            <Link to="/add-task/_add" className="unique-btn-primary mb-2">Add Task</Link>
            <table className="unique-task-table">
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
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.taskName}</td>
                                <td>{task.employee ? task.employee.id : 'N/A'}</td>
                                <td>{task.employee ? `${task.employee.firstName} ${task.employee.lastName}` : 'N/A'}</td>
                                <td>{task.employee ? task.employee.emailId : 'N/A'}</td>
                                <td>{task.createdDate}</td>
                                <td>{task.status}</td>
                                <td>{task.completedDate}</td>
                                <td>
                                    <button
                                        className="unique-btn-danger"
                                        onClick={() => handleDeleteClick(task.id)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Remove Task
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this task?</p>
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleConfirmDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setConfirmDelete(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UniqueListTaskComponent;
