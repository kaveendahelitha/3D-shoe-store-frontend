import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
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
          <Link to="/add-employee/_add">
            <BsFillGrid3X3GapFill className='icon' /> Add Employee
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/update-employee/1">
            <BsPeopleFill className='icon' /> Update Employee
          </Link>
        </li>
        
        <li className='sidebar-list-item'>
          <Link to="/reports">
            <BsMenuButtonWideFill className='icon' /> Reports
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/settings">
            <BsFillGearFill className='icon' /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;