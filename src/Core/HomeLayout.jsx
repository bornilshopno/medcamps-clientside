import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const Layout = () => {
    return (
        <div className="text-gray-800 bg-white dark:text-white dark:bg-gray-700">
         <Navbar></Navbar>
         <Outlet></Outlet>
         <Footer></Footer>
        </div>
    );
};

export default Layout;