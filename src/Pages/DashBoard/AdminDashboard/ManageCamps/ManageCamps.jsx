import {FaDeleteLeft } from "react-icons/fa6";
import DashboardTitle from "../../../../Components/DashboardTitle";
import useCamps from "../../../../Hooks/useCamps";
import { BsTicketDetailedFill } from "react-icons/bs";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCamps = () => {
 const [allCamps,refetch]=useCamps()
 const axiosSecurely=useAxiosSecure();
const handleDelete=async(camp)=>{
    console.log(camp)
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
            const res= await axiosSecurely.delete(`/camps/camp/${camp.id}`);
            if(res.data){
                console.log(res.data);
    
            }
        }
      });
    
   
    refetch();

}
const handleUpdate=(camp)=>{
    console.log(camp)
}


    return (
       <div>
         <DashboardTitle title={"Manage Camps"}></DashboardTitle>
total camps : {allCamps?.length}


{/* table */}
<div className="overflow-x-auto">
<Tooltip id="my-tooltip" className="z-20"/>
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
     {allCamps?.map((camp,index)=>
      <tr key={camp._id}>
      <th>{index+1}</th>
      <td>{camp.campName}</td>
      <td>{camp.dateStart}- <br/>{camp.dateEnd}</td>
      <td>{camp.timeStart}-<br/>{camp.timeEnd}</td>
      <td>{camp.location}</td>
      <td>{camp?.healthCareProf.map((prof, idx)=><h1 key={idx}>{prof}</h1>)}</td>
      <td className="flex gap-2">
        <button onClick={()=>handleDelete(camp)} className="btn btn-sm" data-tooltip-id="my-tooltip" data-tooltip-content="Delete Camp?"><FaDeleteLeft className="text-2xl text-red-600"/> </button>
        <button onClick={()=>handleUpdate(camp)} className="btn btn-sm" data-tooltip-id="my-tooltip" data-tooltip-content="Update Camp?"><BsTicketDetailedFill className="text-2xl text-primary"/> </button>
        
        </td>
    </tr>
     )}
   
    </tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>company</th>
        <th>location</th>
        <th>Last Login</th>
        <th>Favorite Color</th>
      </tr>
    </tfoot>
  </table>
</div>
       </div>
    );
};

export default ManageCamps;