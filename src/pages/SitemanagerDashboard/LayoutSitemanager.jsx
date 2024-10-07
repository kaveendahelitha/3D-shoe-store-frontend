import React, { useState } from 'react';
import SidebarSitemanager from './SidebarSitemanager';

function LayoutSitemanager({ children }) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const handleSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className="grid-container">
            <SidebarSitemanager  openSidebarToggle={openSidebarToggle} handleSidebarToggle={handleSidebarToggle} />
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

export default  LayoutSitemanager;
