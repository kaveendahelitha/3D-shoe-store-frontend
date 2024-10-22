import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layer2.css'; 
import TaskSidebar from './Sidebar/TaskSidebar';

const Layer2 = ({ children, openSidebarToggle, OpenSidebar }) => {
    return (
        <div className="layer2-container">
            <header className="layer2-header">
                <h1>Customer Management System</h1>
                
            </header>
            <div className="layer2-body">
                <TaskSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                <main className="layer2-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layer2;
