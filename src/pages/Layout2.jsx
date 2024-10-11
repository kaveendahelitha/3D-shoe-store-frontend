// src/Layout.js (or src/components/Layout.js)
import React, { useState } from 'react';
import EmployeeSidebar from '../components/Sidebar/EmployeeSidebar'; // Adjust the path if needed

function Layout2({ children }) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const handleSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className={`grid-container ${openSidebarToggle ? 'sidebar-open' : ''}`}>
            <EmployeeSidebar openSidebarToggle={openSidebarToggle} />
            <header className="layout-header">
                <span className="menu-icon" onClick={handleSidebarToggle}>☰</span>
                <h1>Golden Star</h1>
            </header>
            <div className="main-container">
                {children}
            </div>
        </div>
    );
}

export default Layout2;
