import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav/nav';
import Home from './pages/Home/home';
import PageNotFound from './pages/404 Error/pageNotFound';


//import RegistrationPage from './pages/AdminDashboard/RegistrationPage';
import ProfilePage from './pages/Customerpage/profile';
//import UserManagementPage from './pages/AdminDashboard/UserManagementPage';
//import UserService from './components/Services/UserService';
import Admindshboard from './pages/AdminDashboard/Admindshboard';
import UpdateUser from './pages/AdminDashboard/component/updateUser';
import UserManagement from './pages/AdminDashboard/component/UserManagementPage'
import DisableForm from './pages/users/DisableForm';
import Category from './pages/Category';
import Employee from './pages/EmployeeDashboard/Employee';
import Customer from './pages/CustomerDashboard/Customer';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ApiService from './components/service/ApiService';
import Sitemanager from './pages/SitemanagerDashboard/Sitemanager';
import CreateEmployeeComponent from './components/Employee/CreateEmployeeComponent';
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent';
import UpdateEmployeeComponent from './components/Employee/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/Employee/ViewEmployeeComponent';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';


import './App.css';

function App() {
  

  return (
    <>
   
    <BrowserRouter>
      <Nav />
    <Routes>
        
    <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

    <Route
          path="/add-employee/:id"
            element={
              <Layout>
                <CreateEmployeeComponent />
              </Layout>
            }
          />


    <Route
          path="/update-employee/:id"
            element={
              <Layout>
                <UpdateEmployeeComponent />
              </Layout>
            }
          />

     <Route
          path="/view-employee/:id"
            element={
              <Layout>
                <ViewEmployeeComponent />
              </Layout>
            }
          />


      <Route
          path="/employees"
            element={
              <Layout>
                <ListEmployeeComponent />
              </Layout>
            }
          />


      <Route
          path="/"
            element={
              <Layout>
                <ListEmployeeComponent />
              </Layout>
            }
          />



        <Route path='/DisableForm' element={<DisableForm/>}/>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/category' element={<Category />} />
      
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {ApiService.adminOnly() && (
              <>
                <Route path="/admin" element={<Admindshboard />} />
                {/*<Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/user-management" element={<UserManagement />}/>*/}

              </>
            )}

        {ApiService.userOnly() && (
              <>
               <Route path='/customer' element={<Customer />} />
                {/*<Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/user-management" element={<UserManagement />}/>*/}
                
              </>
            )}

        {ApiService.employeeOnly() && (
              <>
                  <Route path='/employee' element={<Employee />} />
                {/*<Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/user-management" element={<UserManagement />}/>*/}
                
              </>
            )}

        {ApiService.sitemanager() && (
              <>
                <Route path="/site-manager" element={<Sitemanager/>} />
                {/*<Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/user-management" element={<UserManagement />}/>*/}
                
              </>
            )}  
       
        <Route path="*" element={<PageNotFound/>} /> 
      </Routes>
    </BrowserRouter>
     
      
      
       
    </>
  )
}

export default App
