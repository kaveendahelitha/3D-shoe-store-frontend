import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function SidebarSitemanager({ openSidebarToggle, handleSidebarToggle }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={handleSidebarToggle}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/dashboard">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/employees">
            <BsFillArchiveFill className='icon' /> Employees
          </Link>
        </li>
      

        <li className='sidebar-list-item'>
          <Link to="/site-manager-view-product">
            <BsPeopleFill className='icon' /> Product
          </Link>
        </li>

      
        <li className='sidebar-list-item'>
          <Link to="/orders-information/All">
            <BsFillGrid3X3GapFill className='icon' /> Orders
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="/tasks">
            <BsFillGrid3X3GapFill className='icon' /> Task
          </Link>
        </li>
        
        
        <li className='sidebar-list-item'>
          <Link to="/site-manager">
            <BsFillGearFill className='icon' /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarSitemanager;