
import Register from "./Register";
import Login from "./Login";
import useAuth from "../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import Lottie from "lottie-react";
import animationJoining from "../assets/lottieAnimations/login.json"
import { Helmet } from "react-helmet-async";


const JoinUs = () => {
    const { registered, setRegistered } = useAuth()

    return (
        <>
            <Helmet>
                <title>MedCamps || JoinUs</title>
            </Helmet>
            <div className="md:flex gap-2 lg:gap-20 mx-auto md:justify-center lg:pt-5 text-gray-700">
                <div className="flex flex-col-reverse md:flex-col gap-2">

                    <div className="mx-auto">
                        <SocialLogin />
                    </div>
                    <div className="h-80">
                        <Lottie animationData={animationJoining} loop={true} className="h-80 m-auto">  </Lottie>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="">
                        <div className="join flex justify-center mt-2 bg-primary w-60 p-2 mx-auto" >
                            <button onClick={() => setRegistered(true)} className={`btn btn-sm join-item w-28 ${registered ? "bg-primary" : ""}`}>LogIn</button>
                            <button onClick={() => setRegistered(false)} className={`btn btn-sm join-item w-28 ${!registered ? "bg-primary" : ""}`}>Register</button>
                        </div>
                    </div>

                    <div className="">
                        {registered ? <Login></Login> : <Register></Register>}
                    </div>


                </div>
            </div>
        </>
    );
};

export default JoinUs;