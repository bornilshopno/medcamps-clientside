import DashboardTitle from "../../../../Components/DashboardTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageRegCamps = () => {
    const axiosSecurely = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5; // Number of rows per page

    const { data: allParticipants = [], refetch, isPending: loading } = useQuery({
        queryKey: ["allParticipants", search],
        queryFn: async () => {
            const result = await axiosSecurely.get(`/participants?search=${search}`);
            return result.data;
        },
    });

    // Calculate pagination details
    const totalRows = allParticipants.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startRow = (currentPage - 1) * rowsPerPage;
    const currentData = allParticipants.slice(startRow, startRow + rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Cancel Participation Logic
    const handleCancelParticipation = (participant) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecurely.delete(`/participants/participant/${participant._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Join request cancelled!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                });
            }
        });
    };

    const handleApproval = async (user) => {
        const updatedInfo = {
            paymentStatus: "approved",
            status: "approved",
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecurely.patch(`/participants/payment/${user._id}`, updatedInfo);
                if (res.data.participantResult.modifiedCount && res.data.paymentResult.modifiedCount) {
                    Swal.fire({
                        title: "Confirmed!",
                        text: `Payment of ${user?.participantName} for ${user?.campName} is Confirmed`,
                        icon: "success",
                    });
                    refetch();
                }
            }
        });
    };

    return (
        <div>
            <DashboardTitle title={"Manage Registered Camps"} />
            <div className="overflow-x-auto">
                {/* Search Input */}
                <div className="flex join justify-center lg:mx-auto rounded-xl focus-within:ring w-[255px] border-2 border-gray-300 my-3">
                            <input onChange={e => setSearch(e.target.value)} type="text" name="searchbox" placeholder="Joiner/CampName/Fee" className="focus:outline-none bg-green-100 text-gray-600 text-center rounded-l-xl" />
                            <button className="btn btn-sm  rounded-l-none bg-gray-300 border-none" onClick={(e) => setSearch(e.target.searchbox.value)}> Search</button>

                        </div>
                {search && <p className="text-center">Searched by: <span className="font-semibold text-primary">{search}</span></p>}

                {/* Table */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Participant Name</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((user, idx) => (
                            <tr key={user._id}>
                                <td>{startRow + idx + 1}</td>
                                <td>{user.participantName}</td>
                                <td>{user.campName}</td>
                                <td>{user.campFee}</td>
                                <td>
                                    {user.payment === "paid" ? (
                                        <p className="flex items-center gap-1 justify-center">
                                            <GiConfirmed className="text-2xl text-secondary" /> Paid
                                        </p>
                                    ) : (
                                        <p className="text-center">UnPaid</p>
                                    )}
                                </td>
                                <td>
                                    {user.payment === "paid" ? (
                                        <div className="text-center">
                                            {user?.paymentStatus ? (
                                                <p className="flex items-center gap-1 justify-center">
                                                    <GiConfirmed className="text-2xl text-secondary" /> Confirmed
                                                </p>
                                            ) : (
                                                <button onClick={() => handleApproval(user)} className="btn btn-sm bg-amber-300">
                                                    Pending
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-center">UnPaid</p>
                                    )}
                                </td>
                                <td>
                                    <button
                                        disabled={user.payment}
                                        onClick={() => handleCancelParticipation(user)}
                                    >
                                        <MdOutlineCancelPresentation
                                            className={`text-2xl ${
                                                user.payment ? "text-gray-500" : "text-red-500"
                                            }`}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="divider"></div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {startRow + 1}-{Math.min(startRow + rowsPerPage, totalRows)} of {totalRows}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="btn btn-sm"
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`btn btn-sm ${
                                    page === currentPage ? "btn-primary border-none bg-primary" : "btn-outline"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="btn btn-sm"
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageRegCamps;
