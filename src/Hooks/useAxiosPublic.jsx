import axios from "axios";

const axiosPublicly = axios.create({
    baseURL: "https://server-side-med-camps.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublicly
};

export default useAxiosPublic;