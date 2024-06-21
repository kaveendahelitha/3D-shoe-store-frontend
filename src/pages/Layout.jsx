// src/Layout.js (or src/components/Layout.js)
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

function Layout({ children }) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const handleSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className="grid-container">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={handleSidebarToggle} />
            <header className="layout_header">
                <span className="menu-icon" onClick={handleSidebarToggle}>☰</span>
                <h1>Golden Star</h1>
            </header>
            <div className="main-container">
                {children}
            </div>
        </div>
    );
}

export default Layout;
