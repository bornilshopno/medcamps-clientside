import {
    createBrowserRouter,
    Link
  } from "react-router-dom";
import Layout from "./HomeLayout";
import Home from "../Pages/Home/Home";
import Camps from "../Pages/Camps/Camps";
import JoinUs from "../Auths/JoinUs";
import DashboardLayout from "./DashboardLayout";
import AdminProfile from "../Pages/DashBoard/AdminDashboard/AdminProfile/AdminProfile";
import AddCamp from "../Pages/DashBoard/AdminDashboard/AddCamp/AddCamp";
import ManageCamps from "../Pages/DashBoard/AdminDashboard/ManageCamps/ManageCamps";
import ManageRegCamps from "../Pages/DashBoard/AdminDashboard/ManageRegCamps/ManageRegCamps";
import Analytics from "../Pages/DashBoard/UserDashBoard/Analytics/Analytics";
import PaymentHistory from "../Pages/DashBoard/UserDashBoard/PaymentHistory/PaymentHistory";
import RegCamps from "../Pages/DashBoard/UserDashBoard/RegCamps/RegCamps";
import UserProfile from "../Pages/DashBoard/UserDashBoard/UserProfile/UserProfile";
import UpdateProfile from "../Components/UpdateProfile";
import AdminRoute from "./AdminRoute";
import UpdateCamp from "../Pages/DashBoard/AdminDashboard/ManageCamps/UpdateCamp";
import CampDetails from "../Components/CampDetails";
import PrivateRoute from "./PrivateRoute";





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
        },
        {
          path:"/camp-detail/:id",
          element: <CampDetails/>,
          loader: ({params})=>fetch(`http://localhost:3000/camps/camp-detail/${params.id}`)
        },
      ]
    },

    //dashboard routes
    {
      path:"/dashboard",
      element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children:[
        //admin-dashboard routes
        {
          path: "adminProfile",
          element:   <AdminProfile></AdminProfile> 
        },
        {
          path: "addCamp",
          element: <AddCamp></AddCamp>
        },
        {
          path: "manageCamps",
          element: <ManageCamps></ManageCamps>
        },
        {
          path: "manageRegCamps",
          element: <ManageRegCamps></ManageRegCamps>
        },
        {
          path: "/dashboard/updateCamp/:id",
          element: <UpdateCamp/>
        },
        //user dashboard routes
        {
          path: "userProfile",
          element: <UserProfile/>
        },
        {
          path: "analytics",
          element: <Analytics/>
        },
        {
          path: "regCamps",
          element: <RegCamps/>
        },
        {
          path: "paymentHistory",
          element: <PaymentHistory/>
        },
        {
          path: "updateProfile",
          element: <UpdateProfile/>
        },
        
      ]
    }
  ]);

export default router;