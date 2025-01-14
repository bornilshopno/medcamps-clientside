import {
    createBrowserRouter,
    Link
  } from "react-router-dom";
import Layout from "./HomeLayout";
import Home from "../Pages/Home/Home";
import Camps from "../Pages/Camps/Camps";
import JoinUs from "../Auths/JoinUs";
import DashboardLayout from "./DashboardLayout";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <><h2> this is error page </h2>
      <Link to={"/"}><button>Go to Home</button></Link></>,
      children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
            path: "/camps",
            element:<Camps></Camps>
        },
        {
          path:"/join-us",
          element:<JoinUs></JoinUs>
        }
      ]
    },

    //dashboard routes
    {
      path:"/dashboard",
      element:<DashboardLayout></DashboardLayout>
    }
  ]);

export default router;