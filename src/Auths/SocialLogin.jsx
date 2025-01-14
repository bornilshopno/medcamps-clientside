import { FaGoogle } from "react-icons/fa6";

// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";



const SocialLogin = () => {
    const {googleSignIn}=useAuth();
    // const axiosPublic=useAxiosPublic();
    const navigate=useNavigate();

    const handleGoogleSignIn=()=>{
googleSignIn()
.then(result=>{
    console.log(result);
    const userInfo={
        email:result.user?.email,
        name:result.user?.displayName
    };
    // axiosPublic.post('/users',userInfo)
    // .then(res=>{
    //     console.log(res.data);
    //     navigate("/")
    // })
}
)
    }
    return (
        <div>
            <div className="mt-2 p-2 bg-primary  w-44 rounded-md mx-auto lg:mr-0 ">
                <button className="flex gap-2 items-center btn-sm mx-auto btn " onClick={handleGoogleSignIn}><FaGoogle></FaGoogle> Join with Gmail</button>
            </div>
        </div>
    );
};

export default SocialLogin;