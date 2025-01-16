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

const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const { logout,user } = useAuth();
    const navigate=useNavigate()
    const location=useLocation()
    console.log(location)
console.log(user)
// const userName= user?.displayName.split(" ")
// const userLastName=userName[userName.length-1]
// console.log(userName, userLastName)
    return (
      <div>
        <div className="flex bg-primary ">
            <div className="w-56 py-2 px-6">
                 <img src={logo} alt="logo" className="h-10 rounded-sm" />
            </div>
           <div className="flex-1 flex justify-between items-center">
           <h2>Welcome {user?.displayName}!</h2>
           <div className="h-10 p-1 w-32 bg-secondary rounded-sm">
            <p className="font-bold bg-white text-secondary w-28 mx-auto text-center py-1 my-auto ">DASHBOARD</p>
           </div>
           </div>
        </div>
          <div className="flex min-h-screen">
            <div className="bg-primary flex flex-col justify-between">
                <div>
                {isAdmin ?
                    <>
                        <ul className="menu  rounded-box w-56">
                            <li><NavLink to={'/dashboard/adminProfile'}><ImProfile />My Profile</NavLink></li>
                            <li><NavLink to={'/dashboard/addCamp'}><MdAddChart /> Add A Camp</NavLink></li>
                            <li><NavLink to={'/dashboard/manageCamps'}><MdSettingsApplications /> Manage Camps</NavLink></li>
                            <li><NavLink to={'/dashboard/manageRegCamps'}><FaUsersCog /> Manage Registered Camp</NavLink></li>

                        </ul>
                    </> :
                    <>
                        <ul className="menu  rounded-box w-56">
                            <li><NavLink to={'/dashboard/userProfile'}><FaUserAlt /> My Profile</NavLink></li>
                            <li><NavLink to={'/dashboard/analytics'}><IoMdAnalytics />Analytics</NavLink></li>
                            <li><NavLink to={'/dashboard/regCamps'}><FaThList />Registered Camps</NavLink></li>
                            <li><NavLink to={'/dashboard/paymentHistory'}><SiCashapp />Payment History</NavLink></li>
                        </ul>
                    </>}
                </div>
                <div>
                <ul className="menu  rounded-box w-56">
                    <li><Link to={'/'}><FaHouseUser /> MedCamps || Home</Link></li>
                    <li><button onClick={() => {logout();navigate("/")}}><FaSignOutAlt />Sign Out</button></li>
                </ul>
                </div>

            </div>
            <div className="flex-grow px-4 lg:px-10 pt-4 lg:pt-10">
                {(location.pathname==="/dashboard" && isAdmin && <AdminProfile/>) || (location.pathname==="/dashboard" && !isAdmin && <UserProfile/>) || <Outlet></Outlet> } 
                
            </div>
        </div>
      </div>
    );
};

export default DashboardLayout;