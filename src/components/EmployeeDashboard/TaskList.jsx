import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskService from '../../services/TaskService';
import '../../styles/ListTaskComponent.css';

const UniqueListTaskComponent = () => {
    const [tasks, setTasks] = useState([]);

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
            });
    };

    const deleteTask = (taskId) => {
        TaskService.deleteTask(taskId)
            .then(() => {
                fetchTasks(); 
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };

    return (
        <div className="unique-container">
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
                               
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UniqueListTaskComponent;
