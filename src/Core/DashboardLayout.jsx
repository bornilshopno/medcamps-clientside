import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div>
                {isAdmin ?
                    <>
                        <ul className="menu bg-base-200 rounded-box w-56">
                            <li><Link>My Profile</Link></li>
                            <li><Link>Add A Camp</Link></li>
                            <li><Link>Manage Camps</Link></li>
                            <li><Link>Manage Registered Camp</Link></li>

                        </ul>
                    </> :
                    <>
                        <ul className="menu bg-base-200 rounded-box w-56">
                            <li><Link>My Profile</Link></li>
                            <li><Link>Analytics</Link></li>
                            <li><Link>Registered Camps</Link></li>
                            <li><Link>Payment History</Link></li>
                        </ul>
                    </>}
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;