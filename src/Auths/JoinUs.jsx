
import Register from "./Register";
import Login from "./Login";
import useAuth from "../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import Lottie from "lottie-react";
import animationJoining from "../assets/lottieAnimations/login.json"
import { Helmet } from "react-helmet-async";


const JoinUs = () => {
    const{registered, setRegistered}=useAuth()
console.log(registered)
    return (
        <>
        <Helmet>
       
                <title>MedCamps || JoinUs</title>
            
        </Helmet>
        <div className="flex gap-2">
        <div className="lg:flex-1">
            <div className="join flex justify-center mt-2 bg-primary w-60 p-2 mx-auto" >
                <button onClick={()=>setRegistered(true)} className={`btn btn-sm join-item w-28 ${ registered ? "bg-primary" : ""}`}>LogIn</button>
                <button onClick={()=>setRegistered(false)} className={`btn btn-sm join-item w-28 ${ !registered ? "bg-primary" : ""}`}>Register</button>
            </div>
         
        </div>
        <div className="lg:flex-1 ">
        <SocialLogin />
        </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row">
            <div className="flex-1">
            { registered ? <Login></Login> : <Register></Register>}
            </div>
            <div className="flex-1 h-80">
                <Lottie animationData={animationJoining} loop={true} className="h-80 m-auto">  </Lottie>
            </div>

        </div>
        </>
    );
};

export default JoinUs;