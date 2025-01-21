import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import DashboardTitle from "../../../../Components/DashboardTitle";


const AdminProfile = () => {
    const { user } = useAuth()
    return (
        <div className="">
            
<DashboardTitle title={"My MedCamps Profile"}></DashboardTitle>
            <div className="flex flex-col md:flex-row gap-10 ">
                <div className="w-52">
                    <img src={user.photoURL} alt="" className="w-full" />
                    <Link to={"/dashboard/updateProfile"}>
                    <button className="btn btn-sm w-full mt-4 bg-primary">Update Profile</button></Link>
                </div>
                <div className="flex-1 max-w-screen-sm">
                    <p>Full Name:</p>
                    <h2>{user?.displayName}</h2>
                    <p>-------------------------------</p>
                    <p>Email:</p>
                    <h2>{user?.email}</h2>
                    <p>-------------------------------</p>
                    <p>Phone Number:</p>
                    <h2>{user?.phoneNumber ? user.phoneNumber : "...not provided"}</h2>
                    <p>-------------------------------</p>
                    <p>Role @MedCamps:</p>
                    <h2>Organizerrrrr</h2>
                    <p>-------------------------------</p>
                    <p>MedCamps Membership ID:</p>
                    <h2>{user?.uid}</h2>
                    <p>-------------------------------</p>
                    <p>Joining Moment @MedCamps:</p>
                    <h2>{user?.metadata?.creationTime || "..record unavailable"}</h2>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;