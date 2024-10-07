import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav/nav';
import Home from './pages/Home/home';
import PageNotFound from './pages/404 Error/pageNotFound';

//import RegistrationPage from './pages/AdminDashboard/RegistrationPage';

//import UserManagementPage from './pages/AdminDashboard/UserManagementPage';
//import UserService from './components/Services/UserService';
//import Admindshboard from './pages/AdminDashboard/Admindshboard';
//import UpdateUser from './pages/AdminDashboard/component/updateUser';

//import UserManagement from './pages/AdminDashboard/component/UserManagementPage';
import Loader from './components/Loader';
import Customize from './pages/3D pages/Customize';
import Modelpage1 from './pages/3D pages/Modelpage1';
import Modelpage2 from './pages/3D pages/Modelpage2';
import Modelpage3 from './pages/3D pages/Modelpage3';

import DisableForm from './pages/users/DisableForm';
import Category from './pages/Category';
import Employee from './pages/EmployeeDashboard/Employee';
import Customer from './pages/Customerpage/ProfilePage';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ApiService from './components/service/ApiService';
import Sitemanager from './pages/SitemanagerDashboard/Sitemanager';
import CreateEmployeeComponent from './components/Employee/CreateEmployeeComponent';
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent';
import UpdateEmployeeComponent from './components/Employee/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/Employee/ViewEmployeeComponent';

import ListSaleComponent from './components/Sales/ListSaleComponent';
import CreateSaleComponent from './components/Sales/CreateSaleComponent';
import UpdateSaleComponent from './components/Sales/UpdateSaleComponent';

import ImageUploader from './components/image/ImageUploader';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import LayoutSitemanager from './pages/SitemanagerDashboard/LayoutSitemanager';
import AdminViewProduts from './components/Products-Admin/AdminViewProduts';

import Order from './components/common/Order'




import './App.css';

function App() {
  const [isLoading, setIsLoading] = React.useState(true); // Initial loading state

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Simulate loading completion after some time (replace with your actual loading logic)
    }, 800); // Adjust timeout as needed
  }, []);

  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/customize" element={<Customize />} />
              <Route path="/modelpage-1" element={<Modelpage1 />} />
              <Route path="/modelpage-2" element={<Modelpage2 />} />
              <Route path="/modelpage-3" element={<Modelpage3 />} />
              <Route path="/DisableForm" element={<DisableForm />} />
              <Route path="/category" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/uploader" element={<ImageUploader />} />
              <Route path="/order" element={<Order/>}/>
              {ApiService.adminOnly() && (
                <>

                  <Route
                    path="/dashboard"
                    element={
                      <Layout>
                        <Dashboard />
                      </Layout>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <Layout>
                        <Dashboard />
                      </Layout>
                    }
                  />
                  {/* add employee */}
                  
                  
                 
                  <Route
                    path="/sales"
                    element={
                      <Layout>
                        <ListSaleComponent />
                      </Layout>
                    }
                  />
                  <Route
                    path="/add-sale/:id"
                    element={
                      <Layout>
                        <CreateSaleComponent />
                      </Layout>
                    }
                  />
                  <Route
                    path="/update-sale/:id"
                    element={
                      <Layout>
                        <UpdateSaleComponent />
                      </Layout>
                    }
                  />
                  {/* list employee */}
                  <Route
                    path="/employees"
                    element={
                      <Layout>
                        <ListEmployeeComponent />
                      </Layout>
                    }                 
                   />

                  {/* product niew-adding-update-delete */}
                  <Route
                    path="/admin-product"
                    element={
                      <Layout>
                        <AdminViewProduts />
                      </Layout>
                    }                 
                   />

                 

                
                </>
              )}

              {ApiService.userOnly() && (
                <>
                  <Route path="/customer" element={ <Customer />} />
                </>
              )}

              {ApiService.employeeOnly() && (
                <>
                  <Route path="/employee" element={<Employee />} />
                </>
              )}

              {ApiService.sitemanager() && (
                <>
                  <Route path="/site-manager" 
                  element={ 
                  <LayoutSitemanager>
                    <Sitemanager />
                  </LayoutSitemanager>} />
                   
                 {/* product niew-adding-update-delete */}
                  <Route
                    path="/site-manager-view-product"
                    element={
                      <LayoutSitemanager>
                        <AdminViewProduts /> 
                      </LayoutSitemanager>
                    }                 
                   />
                  {/* list employee */}
                  <Route
                    path="/employees"
                    element={
                      <LayoutSitemanager>
                        <ListEmployeeComponent />  
                      </LayoutSitemanager>
                    }                 
                   />
                </>
              )}
              <Route path="*" element={<PageNotFound />} />
              <Route path="/image" element={<ImageUploader />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
