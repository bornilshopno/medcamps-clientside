import axios from "axios";
import { useEffect } from "react";

export const axiosSecurely = axios.create({
    baseURL: "http://localhost:3000"
})

const useAxiosSecure = () => {
    //request cases=>
    axiosSecurely.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')//getting token from local storage
        // console.log("request stopped by interceptor", token);
        config.headers.authorization = `Have ${token}`//sending token with fetch request to server
        return config;
    },
        function (error) {
            Promise.reject(error)
        }
    );
//response cases
//useEffect used to navigate and logout user

useEffect(()=>{
    axiosSecurely.interceptors.response.use(function(response){
        return response
    }, 
    function(error){
        return Promise.reject(error);
    }
    )
},[])

return axiosSecurely
};

export default useAxiosSecure;