import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav/nav";
import Home from "./pages/Home/home";
import PageNotFound from "./pages/404 Error/pageNotFound";
import Cart from "./components/common/cart"; // Import Cart component

//import RegistrationPage from './pages/AdminDashboard/RegistrationPage';

//import UserManagementPage from './pages/AdminDashboard/UserManagementPage';
//import UserService from './components/Services/UserService';
//import Admindshboard from './pages/AdminDashboard/Admindshboard';
//import UpdateUser from './pages/AdminDashboard/component/updateUser';

//import UserManagement from './pages/AdminDashboard/component/UserManagementPage';
import Loader from "./components/Loader";
import Customize from "./pages/3D pages/Customize";
import Modelpage1 from "./pages/3D pages/Modelpage1";
import Modelpage2 from "./pages/3D pages/Modelpage2";
import Modelpage3 from "./pages/3D pages/Modelpage3";

import DisableForm from "./pages/users/DisableForm";
import Category from "./pages/Category";
import Employee from "./pages/EmployeeDashboard/Employee";

//import Customer from './pages/CustomerDashboard/Customer';


import Order from './components/common/Order'







import ProfilePage from './pages/Customerpage/ProfilePage';

import Customer from "./pages/Customerpage/ProfilePage";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ApiService from "./components/service/ApiService";
import OtpForm from "./pages/Auth/OtpForm";
import Forgotpass from "./pages/Auth/Forgotpass";

import Sitemanager from "./pages/SitemanagerDashboard/Sitemanager";
import CreateEmployeeComponent from "./components/Employee/CreateEmployeeComponent";
import ListEmployeeComponent from "./components/Employee/ListEmployeeComponent";
import UpdateEmployeeComponent from "./components/Employee/UpdateEmployeeComponent";
import ViewEmployeeComponent from "./components/Employee/ViewEmployeeComponent";

import ListSaleComponent from "./components/Sales/ListSaleComponent";
import CreateSaleComponent from "./components/Sales/CreateSaleComponent";
import UpdateSaleComponent from "./components/Sales/UpdateSaleComponent";

import ImageUploader from "./components/image/ImageUploader";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import LayoutSitemanager from "./pages/SitemanagerDashboard/LayoutSitemanager";
import AdminViewProduts from "./components/Products-Admin/AdminViewProduts";

import BuyNow from "./components/common/BuyNow";
import BuyProduct from "./components/common/BuyProduct";

import CreateTask from "./components/TaskManagement/CreateTask";
import ListTask from "./components/TaskManagement/ListTask";
import Layer2 from "./components/Layer2";
import Layer3 from "./components/Layer3";

import EmployeeList from "./components/EmployeeDashboard/EmployeeList";
import EmployeeUpdate from "./components/EmployeeDashboard/EmployeeUpdate";
import TaskList from "./components/EmployeeDashboard/TaskList";
import Layout2 from "./pages/Layout2";
import EmpDash from "./pages/EmpDash";

import OrderDeetails from "./pages/Customerpage/OrderDeetails";
import OrderPlaceAdmin from "./components/Products-Admin/OrderPlaceAdmin";

import { ThemeProvider } from "./components/TaskManagement/ThemeContext";
import LayoutEmployeemanager from "./pages/EmployeeDashboard/LayoutEmployeemanager";
import Task from "./pages/EmployeeDashboard/Task";
import "./App.css";


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
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/forgotpass" element={<Forgotpass />} />

              <Route path="/profilePage" element={<ProfilePage />} />



              <Route path="/otpForm" element={<OtpForm />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/uploader" element={<ImageUploader />} />
              <Route path="/buy-now/:id" element={<BuyNow />} />
              <Route
                path="/buy-product/:isSingleProductCheckout/:id"
                element={<BuyProduct />}
              />
              <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
              {/*  ------------------------------- */}
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

                  <Route
                    path="/orders-information/All"
                    element={
                      <Layout>
                        <OrderPlaceAdmin />
                      </Layout>
                    }
                  />

                  <Route
                    path="/settings"
                    element={
                      <Layout>
                        <Customer />
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

                  {/* Task Management Routes (Wrapped with ThemeProvider) */}
                  <Route
                    path="/tasks"
                    element={
                      //<ThemeProvider>
                      // <Layer2>
                      <Layout>
                        <ListTask />
                      </Layout>
                      //</></Layer2>
                      //</ThemeProvider>
                    }
                  />
                  <Route
                    path="/add-task/:id"
                    element={
                      //<ThemeProvider>
                      //  <Layer2>
                      <Layout>
                        <CreateTask />
                      </Layout>
                      // </Layer2>
                      ///ThemeProvider>
                    }
                  />
                </>
              )}
              {/*  ------------------------------- */}
              {ApiService.userOnly() && (
                <>
                  <Route
                    path="/customer"
                    element={
                      <ThemeProvider>
                        <Layer2>
                          <Customer />
                        </Layer2>
                      </ThemeProvider>
                    }
                  />

                  <Route
                    path="/customer-orders"
                    element={
                      <ThemeProvider>
                        <Layer2>
                          <OrderDeetails />
                        </Layer2>
                      </ThemeProvider>
                    }
                  />
                </>
              )}
              {/*  ------------------------------- */}
              {ApiService.employeeOnly() && (
                <>
                  <Route
                    path="/employee"
                    element={
                      <LayoutEmployeemanager>
                        <Customer />
                      </LayoutEmployeemanager>
                    }
                  />

                  <Route
                    path="/task"
                    element={
                      <LayoutEmployeemanager>
                        <Task />
                      </LayoutEmployeemanager>
                    }
                  />
                </>
              )}
              {/*  ------------------------------- */}
              {ApiService.sitemanager() && (
                <>
                  <Route
                    path="/site-manager"
                    element={
                      <LayoutSitemanager>
                        <Customer />
                      </LayoutSitemanager>
                    }
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <LayoutSitemanager>
                        <Dashboard />
                      </LayoutSitemanager>
                    }
                  />

                  <Route
                    path="/tasks"
                    element={
                      <LayoutSitemanager>
                        <ListTask />
                      </LayoutSitemanager>
                    }
                  />

                  <Route
                    path="/add-task/:id"
                    element={
                      //<ThemeProvider>
                      //  <Layer2>
                      <LayoutSitemanager>
                        <CreateTask />
                      </LayoutSitemanager>
                      // </Layer2>
                      ///ThemeProvider>
                    }
                  />

                  <Route
                    path="/orders-information/All"
                    element={
                      <LayoutSitemanager>
                        <OrderPlaceAdmin />
                      </LayoutSitemanager>
                    }
                  />

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
              {/* User Management Routes (Wrapped with ThemeProvider) 
              <Route
                path="/image"
                element={
                  <ThemeProvider>
                    <Layer3>
                      <ImageUploader />
                    </Layer3>
                  </ThemeProvider>
                }
              />
              <Route
                path="/employeeDash"
                element={
                  <Layout2>
                    <EmpDash />
                  </Layout2>
                }
              />
              <Route
                path="/employeelist"
                element={
                  <Layout2>
                    <EmployeeList />
                  </Layout2>
                }
              />
              <Route
                path="/tasklist"
                element={
                  <Layout2>
                    <TaskList />
                  </Layout2>
                }
              />
              <Route
                path="/employeeupdate"
                element={
                  <Layout2>
                    <EmployeeUpdate />
                  </Layout2>
                }
              />*/}
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
