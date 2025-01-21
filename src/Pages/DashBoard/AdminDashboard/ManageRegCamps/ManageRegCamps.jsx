import DashboardTitle from "../../../../Components/DashboardTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";



const ManageRegCamps = () => {
    const axiosSecurely = useAxiosSecure();



    const { data: allParticipants, refetch, isPending: loading } = useQuery({
        queryKey: ["allPartcipants"],
        queryFn: async () => {
            const result = await axiosSecurely.get("/participants")
            return (result.data)
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

    const handleApproval = async (user) => {
        const updatedInfo = {
            paymentStatus: "approved",
            status: "approved"
        }

        //alert
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if  (result.isConfirmed) {
                const res = await axiosSecurely.patch(`/participants/payment/${user._id}`, updatedInfo);
                console.log(res.data)

                if( res.data.participantResult.modifiedCount && res.data.paymentResult.modifiedCount){
              Swal.fire({
                title: "Confirmed!",
                text: `Payment of ${user?.participantName} for ${user?.campName} is Confirmed`,
                icon: "success"
              });
                }
            }
          });



       
    }


    return (
        <div>
            <DashboardTitle title={"Manage Registered Camps"}></DashboardTitle>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Participant Name</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allParticipants?.map((user, idx) =>
                            <tr key={user._id} >
                                <th>{idx + 1}</th>
                                <td>{user.participantName}</td>
                                <td>{user.campName}</td>
                                <td>{user.campFee}</td>
                                <td>{(user.payment === "paid") ?
                                    <p className="flex gap-1 items-center justify-center"><GiConfirmed className="text-2xl text-secondary" />Paid</p> : <p className="text-center">UnPaid</p>}</td>
                                <td>{(user.payment === "paid") ?
                                    <div className="text-center">{user?.paymentStatus ?
                                        <p className="approval flex gap-1 items-center justify-center"><GiConfirmed className="text-2xl text-secondary" />Confirmed</p> : <button onClick={() => handleApproval(user)} className="btn btn-sm bg-amber-300">Pending</button>}</div> : <p className="text-center">UnPaid</p>}</td>
                                <td>
                                    <button disabled={user.payment} onClick={() => handleCancelParticipation(user)}><MdOutlineCancelPresentation className={`text-2xl  ${user.payment ? "text-gray-500" : "text-red-500"}`} /> </button></td>
                            </tr>

                        )}




                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageRegCamps;