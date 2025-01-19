import { useLoaderData } from "react-router-dom";
import SectionTitles from "./SectionTitles";
import { FaPeoplePulling, FaUserDoctor } from "react-icons/fa6";
import { FcCalendar, FcAlarmClock } from "react-icons/fc";
import { IoLocation } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";


const CampDetails = () => {
    const camp = useLoaderData();
    const { _id, campName, campImage, campFee, dateStart, dateEnd, timeStart,description, timeEnd, location, healthCareProf, participants } = camp;
    console.log(camp)
    return (
        <div className=" bg-green-200 py-10">
            <SectionTitles heading={campName} subHeading={"Detailed Information"}
            ></SectionTitles>
            <div className="card glass lg:card-side w-10/12 mx-auto">
                <figure className="flex-1">
                    <img
                        src={campImage}
                        className="w-full h-full object-cover"
                        alt="campImage" />
                </figure>
                <div className="card-body flex-1">
                    <h2 className="card-title">{description}</h2>
                       <p className="flex gap-1 items-center text-secondary"><IoLocation /><span className="w-32 text-gray-600">Camp Location : </span>{location}</p>
    <p className="flex gap-1 items-center text-secondary"><FcCalendar /><span className="w-32 text-gray-600">Camp Date : </span>{dateStart}-to-{dateEnd}</p>
    <p className="flex gap-1 items-center text-secondary"><FcAlarmClock /><span className="w-32 text-gray-600">Operating Hour : </span>{timeStart}-to-{timeEnd}</p>
    <p className="flex gap-1 items-center text-secondary"><GiMoneyStack /><span className="w-32 text-gray-600">Camp Fee : </span>${campFee}</p>
    <p className="flex gap-1 items-center text-secondary"> <FaPeoplePulling /><span className="w-32 text-gray-600">Participants : </span>{participants}</p>
   <div className="flex items-start"><h2 className="flex gap-1 items-center text-secondary"><FaUserDoctor /><span className="w-32 text-gray-600">Consultants: </span></h2>
  <div>
  { healthCareProf.map((prof,index)=>
        <h1 key={index} className="flex gap-1 items-center text-secondary"> {prof}</h1>
    )}
  </div>
   </div>
   <p></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Join Camp!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;