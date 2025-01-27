import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user} =useAuth();
    const axiosSecurely=useAxiosSecure();
    const{data: isAdmin, isPending: isAdminLoading}=useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled:!!user?.email,
        queryFn: async()=>{
            const result =await axiosSecurely.get(`/users/admin/${user.email}`);
              return result.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;