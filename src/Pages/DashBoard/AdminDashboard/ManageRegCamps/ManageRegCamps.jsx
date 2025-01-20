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
                                <td>Blue</td>
                                <td>Blue</td>
                                <td>{(user.payment === "paid") ?
                                    <GiConfirmed className="text-2xl" /> :
                                    <button onClick={() => handleCancelParticipation(user)}><MdOutlineCancelPresentation className="text-2xl" /> </button>}</td>
                            </tr>

                        )}




                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageRegCamps;