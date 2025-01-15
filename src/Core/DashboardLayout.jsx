import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { ImProfile } from "react-icons/im";
import { MdAddChart, MdSettingsApplications } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { FaSignOutAlt, FaThList, FaUserAlt, FaUsersCog } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { FaHouseUser } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";


const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const { logout } = useAuth()
    return (
        <div className="flex min-h-screen">
            <div className="bg-secondary">
                {isAdmin ?
                    <>
                        <ul className="menu  rounded-box w-56">
                            <li><Link to={'/dashboard/adminProfile'}><ImProfile />My Profile</Link></li>
                            <li><Link to={'/dashboard/addCamp'}><MdAddChart /> Add A Camp</Link></li>
                            <li><Link to={'/dashboard/manageCamps'}><MdSettingsApplications /> Manage Camps</Link></li>
                            <li><Link to={'/dashboard/manageRegCamps'}><FaUsersCog /> Manage Registered Camp</Link></li>

                        </ul>
                    </> :
                    <>
                        <ul className="menu  rounded-box w-56">
                            <li><Link to={'/dashboard/userProfile'}><FaUserAlt /> My Profile</Link></li>
                            <li><Link to={'/dashboard/analytics'}><IoMdAnalytics />Analytics</Link></li>
                            <li><Link to={'/dashboard/regCamps'}><FaThList />Registered Camps</Link></li>
                            <li><Link to={'/dashboard/paymentHistory'}><SiCashapp />Payment History</Link></li>
                        </ul>
                    </>}
                <ul className="menu  rounded-box w-56">
                    <li><Link to={'/'}><FaHouseUser /> MedCamps || Home</Link></li>
                    <li><button onClick={() => logout()}><FaSignOutAlt />Sign Out</button></li>
                </ul>

            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;