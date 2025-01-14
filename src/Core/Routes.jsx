import {
    createBrowserRouter,
    Link
  } from "react-router-dom";
import Layout from "./Layout";
import Home from "../Pages/Home/Home";
import Camps from "../Pages/Camps/Camps";

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
        }
      ]
    },
  ]);

export default router;