import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    BsListCheck,
    BsPlusCircle,
    BsFillClipboardDataFill,
    BsFillMoonFill,
    BsSunFill,
} from 'react-icons/bs';
import '../../styles/UserSidebar.css'; 
import { ThemeContext } from '../TaskManagement/ThemeContext';

function UserSidebar({ openSidebarToggle }) {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <aside id="user-sidebar" className={openSidebarToggle ? "user-sidebar-responsive" : ""}>
            <div className="user-sidebar-title">
                <div className="user-sidebar-brand">
                    <BsFillClipboardDataFill className="user-icon_header" /> User Dashboard
                </div>
            </div>

            <ul className="user-sidebar-list">
                <li className="user-sidebar-list-item">
                    <Link to="/orderHistory">
                        <BsListCheck className="user-icon" /> Order List
                    </Link>
                </li>
                <li className="user-sidebar-list-item">
                    <Link to="/image">
                        <BsPlusCircle className="user-icon" /> Add own design
                    </Link>
                </li>
                
                <li className="user-sidebar-list-item" onClick={toggleTheme}>
                    {isDarkMode ? (
                        <>
                            <BsSunFill className="user-icon" /> Light Mode
                        </>
                    ) : (
                        <>
                            <BsFillMoonFill className="user-icon" /> Dark Mode
                        </>
                    )}
                </li>
            </ul>
        </aside>
    );
}

export default UserSidebar;
