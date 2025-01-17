import { useState } from "react";
import DashboardTitle from "../../../../Components/DashboardTitle";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useCamps from "../../../../Hooks/useCamps";


const ManageCamps = () => {
 const [allCamps]=useCamps()
 console.log(allCamps)
    return (
       <div>
total camps : {allCamps.length}
<div>
    {
        allCamps?.map(camp=><div key={camp._id} className="border-2 my-2">
            <h1>{camp.campName}</h1>
            <h1>{camp.campFee}</h1>
          <img src={camp.campImage} alt="" className="h-10 w-12 object-cover" />
            <h1>{camp.dateStart}</h1>
            <h1>{camp.dateEnd}</h1>
            <h1>{camp.timeStart}</h1>
            <h1>{camp.timeEnd}</h1>
            <h1>{camp.location}</h1>
            <h1>{camp.description}</h1>
            <h1>{camp.participants}</h1>
            <h1>{camp.healthCareProf.length}</h1>
        </div>)
    }
</div>
       </div>
    );
};

export default ManageCamps;