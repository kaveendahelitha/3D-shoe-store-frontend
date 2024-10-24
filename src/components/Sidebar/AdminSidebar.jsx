import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BsCart3, 
  BsGrid1X2Fill, 
  BsFillBoxSeamFill, 
  BsFillBagFill, 
  BsFillClipboardCheckFill, 
  BsFillPersonPlusFill, 
  BsFileBarGraphFill, 
  BsFillGearFill, 
  BsPeopleFill // Added missing icon import
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, handleSidebarToggle }) {
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
            <BsFillPersonPlusFill className='icon' /> Employees
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin-product">
            <BsFillBoxSeamFill className='icon' /> Product
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/orders-information/All">
            <BsPeopleFill className='icon' /> Orders
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/sales">
            <BsFillBagFill className='icon' /> Sales
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/tasks">
            <BsFillClipboardCheckFill className='icon' /> Task
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/settings">
            <BsFillGearFill className='icon' /> Settings
          </Link> {/* Missing closing Link tag added */}
        </li>
       
      </ul>
    </aside>
  );
}

export default Sidebar;
