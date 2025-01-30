import { FaDeleteLeft } from "react-icons/fa6";
import DashboardTitle from "../../../../Components/DashboardTitle";
import { BsTicketDetailedFill } from "react-icons/bs";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const ManageCamps = () => {
  // const [allCamps, refetch] = useCamps();
  const axiosSecurely = useAxiosSecure();
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const rowsPerPage = 7; // Camps per page

  const { data: allCamps, refetch, isPending: loading } = useQuery({
    queryKey: ["allCamps", search],

    queryFn: async () => {
        const result = await axiosSecurely.get(`/camps?search=${search}`);
        return result.data
    }
})


  const handleDelete = async (camp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecurely.delete(`/camps/delete-camp/${camp._id}`);
        if (res.data.deletedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${camp.campName} is removed successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });

    refetch();
  };

  // Pagination calculations
  const totalRows = allCamps?.length || 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentCamps = allCamps?.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <DashboardTitle title={"Manage Camps"}></DashboardTitle>

      <div className="flex join justify-between  overflow-hidden rounded-xl focus-within:ring w-[255px] border-2 border-gray-300 lg:mx-auto my-3">
        <input onChange={e => setSearch(e.target.value)} type="text" name="searchbox" placeholder="type to search" className="focus:outline-none bg-green-100 text-gray-600 text-center" />
        <button className="btn btn-sm  rounded-l-none bg-gray-300   border-none" onClick={(e) => setSearch(e.target.searchbox.value)}> Search</button></div>

        {search && <p className="text-center">Searched by : <span className="text-primary font-semibold">{search}</span></p>} 
      {/* Table */}
      <div className="overflow-x-auto">
        <Tooltip id="my-tooltip" className="z-20" />
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>HealthCare Professional</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCamps?.map((camp, index) => (
              <tr key={camp._id}>
                <th>{startIndex + index + 1}</th>
                <td>{camp.campName}</td>
                <td>
                  {camp.dateStart}- <br />
                  {camp.dateEnd}
                </td>
                <td>
                  {camp.timeStart}-<br />
                  {camp.timeEnd}
                </td>
                <td>{camp.location}</td>
                <td>
                  {camp?.healthCareProf.map((prof, idx) => (
                    <h1 key={idx}>{prof}</h1>
                  ))}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleDelete(camp)}
                    className="btn btn-sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Delete Camp?"
                  >
                    <FaDeleteLeft className="text-2xl text-red-600" />
                  </button>
                  <Link
                    to={`/dashboard/updateCamp/${camp._id}`}
                    className="btn btn-sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Update Camp?"
                  >
                    <BsTicketDetailedFill className="text-2xl text-primary" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="divider"></div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, totalRows)} of {totalRows}
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
                className={`btn btn-sm ${page === currentPage ? "btn-primary bg-primary" : "btn-outline"}`}
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

export default ManageCamps;
