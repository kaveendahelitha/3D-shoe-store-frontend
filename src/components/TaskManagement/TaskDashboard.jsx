import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/TaskDashboard.css'; 

const TaskDashboard = () => {
    return (
        <div className="task-dashboard-container">
            <h2>Task Management Dashboard</h2>
            <div className="task-dashboard-options">
                <div className="task-dashboard-card">
                    <Link to="/add-task/_add" className="task-dashboard-link">
                        <h3>Add New Task</h3>
                    </Link>
                </div>
                <div className="task-dashboard-card">
                    <Link to="/tasks" className="task-dashboard-link">
                        <h3>View All Tasks</h3>
                    </Link>
                </div>
                <div className="task-dashboard-card">
                    <Link to="/update-task/:id" className="task-dashboard-link">
                        <h3>Update Task</h3>
                    </Link>
                </div>
                <div className="task-dashboard-card">
                    <Link to="/view-task/:id" className="task-dashboard-link">
                        <h3>View Task Details</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TaskDashboard;
