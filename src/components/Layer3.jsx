
import React, { useState } from 'react';
import '../styles/Layer3.css'; 
import UserSidebar from './Sidebar/UserSidebar';

function Layer3({ children }) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const handleSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className="layer3-grid-container">
            <UserSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={handleSidebarToggle} />
           
            <div className="layer3-main-container">
                {children}
            </div>
        </div>
    );
}

export default Layer3;
