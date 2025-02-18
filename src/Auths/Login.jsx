import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import useAuth from '../Hooks/useAuth';

const Login = () => {
    const {  setRegistered, userLogin,  setLoading } = useAuth()
    const [visible, setVisible] = useState(false)
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
      } = useForm();// for react hook form





    const navigate = useNavigate()
    const location = useLocation();
    const locs = location.state?.from?.pathname || "/";
    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const onSubmit = (data) => {
        userLogin(data.email, data.password)
        .then(res => {
            const user = res.user;
            setLoading(false)
            reset();
            navigate(locs, { replace: true })

        })
    }


  

    const handleValidateCaptcha = () => {
        const value = captchaRef.current.value;
        if (validateCaptcha(value) == true) {
            setDisable(false)
        }

        else {
            setDisable(true)
        }
    }
    return (
        <div>

            <div className=" bg-base-200 max-w-96 mx-auto text-gray-700">
                <div className="hero-content ">
                    <div className="card bg-base-100 w-full  shrink-0 shadow-2xl ">
                        <form className="card-body pb-0 relative" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" {...register("email", { required: true })} className="input input-bordered h-10" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={visible ? "text" : "password"} placeholder="password" name="password" {...register("password", { required: true })} className="input input-bordered h-10" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <LoadCanvasTemplate />
                                <input type="text" ref={captchaRef} placeholder="typeCaptcha" name="captcha" className="input input-bordered h-10" onBlur={handleValidateCaptcha} required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={disable}>Login</button>
                            </div>
                        </form>
                        <p className='text-center pb-4'>New to the website? pls <span className='text-blue-700 font-semibold'><button onClick={() => setRegistered(false)}>Sign Up</button></span> </p>
                        <button className="absolute right-[37px] top-[152px] py-2" onClick={() => setVisible(!visible)}>
                            {visible ? <IoMdEyeOff className="text-2xl text-gray-400"></IoMdEyeOff> : <IoEye className="text-gray-400 text-2xl"></IoEye>}
                        </button>
                   
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;