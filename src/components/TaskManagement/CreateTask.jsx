import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use axios directly for API calls
import '../../styles/CreateTaskComponent.css'; 

const CreateTaskComponent = () => {
    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState('Processing');
    const [createdDate, setCreatedDate] = useState('');
    const [completedDate, setCompletedDate] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]); // State to store employees list
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the employees for the dropdown
        axios.get('http://localhost:8080/api/v1/employees/dropdown')
            .then(response => {
                setEmployees(response.data); // Store the employees data in state
            })
            .catch(error => {
                console.error("Error fetching employees:", error);
            });
    }, []);

    const saveTask = (e) => {
        e.preventDefault();
        
        const task = {
            taskName,
            status,
            createdDate,
            completedDate,
            employee: { id: employeeId },  // ensure employeeId is a number
            user: { id: 15 }               // Set user ID statically for now or dynamically
        };

        // Use axios to make the POST request
        axios.post('http://localhost:8080/api/v1/tasks', task)
            .then(response => {
                alert("Task created successfully:", response.data);
                navigate('/tasks'); // Navigate to the task list page
            })
            .catch(error => {
                // Capture and display the detailed error message from the backend
                console.error("Error creating task:", error.response.data);
                alert("An error occurred while saving the task. Error: " + error.response.data);
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
                            <label htmlFor="employeeId">Assign to Employee:</label>
                            <select
                                id="employeeId"
                                className="add-task-select"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)} // Set employeeId when an email is selected
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.emailId} {/* Display emailId */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="add-task-btn-save">Assign the Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskComponent;
