import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../../Components/DashboardTitle";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import Swal from "sweetalert2";


const RegCamps = () => {
    const axiosSecurely=useAxiosSecure()
    const {user}=useAuth()

    const{data:registeredCamps=[], isPending:loading, refetch}=useQuery({
        queryKey: [user?.email, "userCamps"],
        queryFn: async()=>{
           const result=await axiosSecurely.get(`/participants/participant/${user?.email}`)
            return result.data
        }        
    })
    console.log(registeredCamps)

        const handleCancelParticipation = (participant) => {
            console.log(participant)
    
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecurely.delete(`/participants/participant/${participant._id}`)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.deletedCount > 0) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Join request cancelled!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                refetch();
                            }
                        })
                }
            });
    
    
    
    
        }

    return (
        <div>
            <DashboardTitle title={"Registered Camps"}></DashboardTitle>
            <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>                                    
                                        <th>Camp Name</th>
                                        <th>Camp Fees</th>
                                        <th>Payment Status</th>
                                        <th>Confirmation Status</th>
                                        <th>Cancel</th>
                                        <th>Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredCamps?.map((user, idx) =>
                                        <tr key={user._id} >
                                            <th>{idx + 1}</th>
                                            <td>{user.campName}</td>
                                            <td>{user.campFee}</td>
                                            <td>payment status</td>
                                            <td>confirmation status</td>
                                            <td>{(user.payment === "paid") ?
                                                <GiConfirmed className="text-2xl" /> :
                                                <button onClick={() => handleCancelParticipation(user)}><MdOutlineCancelPresentation className="text-2xl" /> </button>}</td>
                                                           <td>{(user.payment === "paid") ?
                                                <GiConfirmed className="text-2xl" /> :
                                                <button ><MdOutlineCancelPresentation className="text-2xl" /> </button>}</td>
                                        </tr>
            
                                    )}
            
            
            
            
                                </tbody>
                            </table>
                        </div>

        </div>
    );
};

export default RegCamps;