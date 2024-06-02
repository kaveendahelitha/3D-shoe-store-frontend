import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav/nav';
import Home from './pages/Home/home';
import PageNotFound from './pages/404 Error/pageNotFound';
import Signup from './pages/Signup/signUp';
import SignIn from './pages/SignIn/signIn';//login 
//import RegistrationPage from './pages/AdminDashboard/RegistrationPage';
import ProfilePage from './pages/Customerpage/profile';
//import UserManagementPage from './pages/AdminDashboard/UserManagementPage';
import UserService from './components/Services/UserService';
import Admindshboard from './pages/AdminDashboard/Admindshboard';
import UpdateUser from './pages/AdminDashboard/component/updateUser';
import UserManagement from './pages/AdminDashboard/component/UserManagementPage'
import DisableForm from './pages/users/DisableForm';
function App() {
  

  return (
    <>
   
    <BrowserRouter>
      <Nav />
    <Routes>
    <Route path='DisableForm' element={<DisableForm/>}/>

        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<ProfilePage />} />

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
