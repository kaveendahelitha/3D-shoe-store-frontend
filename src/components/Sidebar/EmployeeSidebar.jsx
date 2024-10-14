import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function EmployeeSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> Employee Dashboard
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>

      <li className='sidebar-list-item'>
          <Link to="/employeeDash">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>



        <li className='sidebar-list-item'>
          <Link to="/employeelist">
            <BsGrid1X2Fill className='icon' /> Employees
          </Link>
        </li>
       
        
        <li className='sidebar-list-item'>
          <Link to="/employeeupdate">
            <BsPeopleFill className='icon' /> Update Employee
          </Link>
        </li>
        
        <li className='sidebar-list-item'>
          <Link to="/tasklist">
            <BsMenuButtonWideFill className='icon' /> Tasks
          </Link>
        </li>
        
      </ul>
    </aside>
  );
}

export default EmployeeSidebar;
