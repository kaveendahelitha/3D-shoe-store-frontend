import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsListCheck, BsPlusCircle, BsPencilSquare, BsEyeFill, BsFillClipboardDataFill, BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import '../../styles/TaskSidebar.css'; 
import { ThemeContext } from '../TaskManagement/ThemeContext';

function TaskSidebar({ openSidebarToggle, OpenSidebar }) {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <aside id="task-sidebar" className={openSidebarToggle ? "task-sidebar-responsive" : ""}>
            <div className="task-sidebar-title">
                <div className="task-sidebar-brand">
                    <BsFillClipboardDataFill className="task-icon_header" /> Task Management
                </div>
            </div>

            <ul className="task-sidebar-list">
                <li className="task-sidebar-list-item">
                    <Link to="/tasks">
                        <BsListCheck className="task-icon" /> Task List
                    </Link>
                </li>
                <li className="task-sidebar-list-item">
                    <Link to="/add-task/:id">
                        <BsPlusCircle className="task-icon" /> Add Task
                    </Link>
                </li>
                
                <li className="task-sidebar-list-item" onClick={toggleTheme}>
                    {isDarkMode ? (
                        <>
                            <BsSunFill className="task-icon" /> Light Mode
                        </>
                    ) : (
                        <>
                            <BsFillMoonFill className="task-icon" /> Dark Mode
                        </>
                    )}
                </li>
            </ul>
        </aside>
    );
}

export default TaskSidebar;
