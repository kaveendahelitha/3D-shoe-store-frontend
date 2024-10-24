import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function SidebarEmpmanager({ openSidebarToggle, handleSidebarToggle }) {
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
          <Link to="/task">
            <BsGrid1X2Fill className='icon' /> Task
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="/employee">
            <BsFillArchiveFill className='icon' /> Employees
          </Link>
        </li>
      

        
      </ul>
    </aside>
  );
}

export default SidebarEmpmanager;