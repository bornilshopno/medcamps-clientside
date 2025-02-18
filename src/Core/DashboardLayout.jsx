import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { ImProfile } from "react-icons/im";
import { MdAddChart, MdSettingsApplications } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { FaSignOutAlt, FaThList, FaUserAlt, FaUsersCog } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { FaHouseUser } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";
import logo from "../assets/logo-medCamp.png"
import AdminProfile from "../Pages/DashBoard/AdminDashboard/AdminProfile/AdminProfile";
import UserProfile from "../Pages/DashBoard/UserDashBoard/UserProfile/UserProfile";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const { logout, user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
 
    return (
        <div>
             <Helmet>
                <title>MedCamps || DashBoard</title>
            </Helmet>
            <div className="flex bg-primary dark:bg-green-900 ">
                <div className="w-40 lg:w-56 py-2 px-6">
                    <img src={logo} alt="logo" className="h-10 rounded-sm" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                <h2>Welcome {user?.displayName?.split(" ")[1] || user?.displayName || "Guest"}!</h2>
                    <div className="h-10 p-1 w-32 bg-secondary rounded-sm">
                        <p className="font-bold bg-white text-secondary w-28 mx-auto text-center py-1 my-auto ">DASHBOARD</p>
                    </div>
                </div>
            </div>
            <div className="flex min-h-[90vh]">
                <div className="bg-primary dark:bg-green-900 flex flex-col justify-between">
                    <div>
                        {isAdmin ?
                            <>
                                <ul className="menu  rounded-box w-40 lg:w-56">
                                    <li><NavLink className="flex items-start"  to={'/dashboard/adminProfile'}><ImProfile className="text-xl mt-2"  />My Profile</NavLink></li>
                                    <li><NavLink className="flex items-start" to={'/dashboard/addCamp'}><MdAddChart className="text-xl mt-2"  /> Add A Camp</NavLink></li>
                                    <li><NavLink className="flex items-start" to={'/dashboard/manageCamps'}><MdSettingsApplications className="text-xl"  /> Manage Camps</NavLink></li>
                                    <li ><NavLink className="flex items-start" to={'/dashboard/manageRegCamps'}><FaUsersCog className="text-2xl" /> Manage Registered Camp</NavLink></li>
                                </ul>
                            </> :
                            <>
                                <ul className="menu  rounded-box w-40 lg:w-56">
                                    <li><NavLink className="flex items-start" to={'/dashboard/userProfile'}><FaUserAlt className="text-xl"/> My Profile</NavLink></li>
                                    <li><NavLink className="flex items-start" to={'/dashboard/analytics'}><IoMdAnalytics className="text-xl"/>Analytics</NavLink></li>
                                    <li><NavLink className="flex items-start" to={'/dashboard/regCamps'}><FaThList className="text-xl"/>Registered Camps</NavLink></li>
                                    <li><NavLink className="flex items-start" to={'/dashboard/paymentHistory'}><SiCashapp className="text-xl"/>Payment History</NavLink></li>
                                </ul>
                            </>}
                    </div>
                    <div>
                        <ul className="menu  rounded-box w-40 lg:w-56">
                            <li><Link className="flex items-start" to={'/'}><FaHouseUser className="text-xl" /> HomePage</Link></li>
                            <li><button onClick={() => { logout(); navigate("/") }}><FaSignOutAlt className="text-xl"/>Sign Out</button></li>
                        </ul>
                    </div>

                </div>
                <div className="flex-grow px-4 lg:px-10 pt-3 lg:pt-5">
                    {(location.pathname === "/dashboard" && isAdmin && <AdminProfile />) || (location.pathname === "/dashboard" && !isAdmin && <UserProfile />) || <Outlet></Outlet>}

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;