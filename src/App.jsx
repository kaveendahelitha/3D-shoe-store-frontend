import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav/nav';
import Home from './pages/Home/home';
import PageNotFound from './pages/404 Error/pageNotFound';


//import RegistrationPage from './pages/AdminDashboard/RegistrationPage';
import ProfilePage from './pages/Customerpage/profile';
//import UserManagementPage from './pages/AdminDashboard/UserManagementPage';
import UserService from './components/Services/UserService';
import Admindshboard from './pages/AdminDashboard/Admindshboard';
import UpdateUser from './pages/AdminDashboard/component/updateUser';
import UserManagement from './pages/AdminDashboard/component/UserManagementPage'
import DisableForm from './pages/users/DisableForm';
import Category from './pages/Category';
import Employee from './pages/EmployeeDashboard/Employee';
import Customer from './pages/CustomerDashboard/Customer';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
function App() {
  

  return (
    <>
   
    <BrowserRouter>
      <Nav />
    <Routes>
    <Route path='DisableForm' element={<DisableForm/>}/>

        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/category' element={<Category />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {UserService.adminOnly() && (
              <>
                <Route path="/admin" element={<Admindshboard />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/user-management" element={<UserManagement />}/>
              </>
            )}
       
        <Route path="*" element={<PageNotFound/>} /> 
      </Routes>
    </BrowserRouter>
     
      
      
       
    </>
  )
}

export default App
