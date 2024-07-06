import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav/nav';
import Home from './pages/Home/home';
import PageNotFound from './pages/404 Error/pageNotFound';
import Signup from './pages/Signup/signUp';
import SignIn from './pages/SignIn/signIn'; // login
//import RegistrationPage from './pages/AdminDashboard/RegistrationPage';
import ProfilePage from './pages/Customerpage/profile';
//import UserManagementPage from './pages/AdminDashboard/UserManagementPage';
import UserService from './components/Services/UserService';
import Admindshboard from './pages/AdminDashboard/Admindshboard';
import UpdateUser from './pages/AdminDashboard/component/updateUser';
import UserManagement from './pages/AdminDashboard/component/UserManagementPage';
import Loader from './components/Loader';
import Customize from './pages/3D pages/Customize';
import Modelpage1 from './pages/3D pages/Modelpage1';
import Modelpage2 from './pages/3D pages/Modelpage2';
import Modelpage3 from './pages/3D pages/Modelpage3';

function App() {

  const [isLoading, setIsLoading] = React.useState(true); // Initial loading state

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Simulate loading completion after some time (replace with your actual loading logic)
    }, 800); // Adjust timeout as needed;
  }, []);

  return (
    <>

      <BrowserRouter>
        {isLoading ? <Loader /> : (
          <>
            <Nav />
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/modelpage-1" element={<Modelpage1 />} />
              <Route path="/modelpage-2" element={<Modelpage2 />} />
              <Route path="/modelpage-3" element={<Modelpage3 />} />


              {UserService.adminOnly() && ( // Assuming this returns a boolean value for admin access
                <>
                  <Route path="/admin" element={<Admindshboard />} />
                  <Route path="/update-user/:userId" element={<UpdateUser />} />
                  <Route path="/admin/user-management" element={<UserManagement />} />
                </>
              )}

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </>
        )}
      </BrowserRouter>

    </>
  );
}

export default App;
