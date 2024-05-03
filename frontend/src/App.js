import './css/styles.css';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import React from 'react';

// Import Pages
import Home from "./pages/Home";
import Account from "./pages/Account";
import Deparments from "./pages/Deparments";
import ContactUs from "./pages/ContactUs";
import Login from './pages/Login';
import Employees from "./pages/Employees";
import Project from "./pages/Project";
import Task from "./pages/Task";
import AddDepartment from "./pages/AddDepartment";
import AddProject from "./pages/AddProject";
import AddTask from './pages/AddTask';
import AddEmployee from './pages/AddEmployee';
import AddLocation from './pages/AddLocation';
import Profile from './pages/Profile';
import DepartmentData from './pages/DepartmentData';
import Salaries from './pages/Salaries';
import AddSalary from './pages/AddSalary';

// Import Components
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/departments",
        element: <Deparments/>
      },
      {
        path: "/contact-us",
        element: <ContactUs/>
      },
      {
        path: "/account",
        element: <Account/>
      },
      {
        path: "/deptdata/:id",
        element: <DepartmentData/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/projects",
        element: <Project/>
      },
      {
        path: "/tasks",
        element: <Task/>
      },
      {
        path: "/employees",
        element: <Employees/>
      },
      {
        path: "/salaries",
        element: <Salaries/>
      },
      {
        path: "/profile/:id",
        element: <Profile/>
      },
      {
        path: "/add-department",
        element: <AddDepartment/>
      },
      {
        path: "/add-project",
        element: <AddProject/>
      },
      {
        path: "/add-task",
        element: <AddTask/>
      },
      {
        path: "/add-employee",
        element: <AddEmployee/>
      },
      {
        path: "/add-employee/:id",
        element: <AddEmployee/>
      },
      {
        path: "/add-location",
        element: <AddLocation/>
      },
      {
        path: "/add-salary",
        element: <AddSalary/>
      },
      {
        path: "/add-salary/:id",
        element: <AddSalary/>
      }
    ]
  }
])

function App() {
  return (
    <div className="bg-teal-50">
      <div className='w-full h-screen font-serif'>
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
