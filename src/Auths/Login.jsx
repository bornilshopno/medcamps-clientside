import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../Hooks/useAuth';

const Login = () => {
    const { registered, setRegistered, userLogin, loading, setLoading } = useAuth()

    const navigate = useNavigate()
    const location = useLocation();
    const locs = location.state?.from?.pathname || "/";
    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        userLogin(email, password)
            .then(res => {
                const user = res.user;
                console.log(user)
                setLoading(false)
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

            <div className=" bg-base-200 max-w-96 mx-auto">
                <div className="hero-content ">
                    <div className="card bg-base-100 w-full  shrink-0 shadow-2xl ">
                        <form className="card-body pb-0" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered h-10" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered h-10" required />
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
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;