import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskService from '../../services/TaskService';
import '../../styles/CreateTaskComponent.css'; 

const CreateTaskComponent = () => {
    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState('Processing'); 
    const [createdDate, setCreatedDate] = useState('');
    const [completedDate, setCompletedDate] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const navigate = useNavigate();

    const saveTask = (e) => {
        e.preventDefault();
        
        const task = {
            taskName,
            status,
            createdDate,
            completedDate,
            employee: { id: employeeId } 
        };

        TaskService.createTask(task)
            .then(response => {
                console.log("Task created successfully:", response.data);
                navigate('/tasks'); 
            })
            .catch(error => {
                console.error("Error creating task:", error);
                alert("An error occurred while saving the task. Please try again.");
            });
    };

    return (
        <div className="add-task-container">
            <h2 className="add-task-title">Assign the Task</h2>
            <div className="add-task-card">
                <div className="add-task-card-body">
                    <form onSubmit={saveTask}>
                        <div className="add-task-form-group">
                            <label htmlFor="taskName">Task Name:</label>
                            <input 
                                type="text" 
                                id="taskName" 
                                className="add-task-input" 
                                value={taskName} 
                                onChange={(e) => setTaskName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="add-task-form-group">
                            <label htmlFor="status">Status:</label>
                            <select 
                                id="status" 
                                className="add-task-select" 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)} 
                                required
                            >
                                <option value="Processing">Processing</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="add-task-form-group">
                            <label htmlFor="createdDate">Created Date:</label>
                            <input 
                                type="date" 
                                id="createdDate" 
                                className="add-task-input" 
                                value={createdDate} 
                                onChange={(e) => setCreatedDate(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="add-task-form-group">
                            <label htmlFor="completedDate">Completed Date:</label>
                            <input 
                                type="date" 
                                id="completedDate" 
                                className="add-task-input" 
                                value={completedDate} 
                                onChange={(e) => setCompletedDate(e.target.value)} 
                            />
                        </div>
                        <div className="add-task-form-group">
                            <label htmlFor="employeeId">Employee ID:</label>
                            <input 
                                type="number" 
                                id="employeeId" 
                                className="add-task-input" 
                                value={employeeId} 
                                onChange={(e) => setEmployeeId(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="add-task-btn-save">Assign the Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskComponent;
