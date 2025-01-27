import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecurely = axios.create({
    baseURL: "https://server-side-med-camps.vercel.app"
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate()
    //request cases=>
    axiosSecurely.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')//getting token from local storage
        config.headers.authorization = `Have ${token}`//sending token with fetch request to server
        return config;
    },
        function (error) {
            Promise.reject(error)
        }
    );
    //response cases
    //useEffect used to navigate and logout user

    useEffect(() => {
        axiosSecurely.interceptors.response.use(function (response) {
            return response
        },
            async (error) => {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate("/join-us")
                }
                return Promise.reject(error);
            }
        )
    }, [logOut, navigate])

    return axiosSecurely
};

export default useAxiosSecure;