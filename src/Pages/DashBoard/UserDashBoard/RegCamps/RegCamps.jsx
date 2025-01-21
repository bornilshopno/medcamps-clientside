import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../../Components/DashboardTitle";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdFeedback, MdOutlineCancelPresentation, MdPending } from "react-icons/md";
import Swal from "sweetalert2";
import { AiFillDollarCircle } from "react-icons/ai";
import { Link } from "react-router-dom";


const RegCamps = () => {
    const axiosSecurely = useAxiosSecure()
    const { user } = useAuth()

    const { data: registeredCamps = [], isPending: loading, refetch } = useQuery({
        queryKey: [user?.email, "userCamps"],
        queryFn: async () => {
            const result = await axiosSecurely.get(`/med-camps/participant/${user?.email}`)
            return result.data
        }
    })


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
                                <td>{(user.payment === "paid") ?
                                    <GiConfirmed className="text-2xl" /> :
                                    <Link to={`/dashboard/payment/${user._id}`}>
                                    <button className="flex gap-1 btn btn-sm bg-amber-300" >Pay <AiFillDollarCircle className="text-2xl" /> </button></Link>}</td>
                                <td className="">{(user.payment === "paid") ?
                                    <p className="flex gap-1 justify-center bg-secondary py-1 rounded-md">Confirmed <GiConfirmed className="text-2xl" /></p> : <p className="flex gap-1 justify-center bg-amber-300 py-1 rounded-md">Pending<MdPending /></p>} </td>
                                <td>
                                    <button className="btn btn-sm bg-red-300 px-2" onClick={() => handleCancelParticipation(user)}><MdOutlineCancelPresentation className="text-2xl" /> </button></td>
                                

                                <td>
                                    <button className="flex gap-1 btn btn-sm bg-primary" >Feedback<MdFeedback className="text-2xl" /> </button></td>

                            </tr>

                        )}




                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default RegCamps;