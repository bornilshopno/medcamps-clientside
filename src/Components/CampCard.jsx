import { FaPeoplePulling, FaUserDoctor } from "react-icons/fa6";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";


const CampCard = ({camp}) => {
    
    // eslint-disable-next-line react/prop-types
    const { _id, campName, campImage, campFee, dateStart, dateEnd, timeStart, timeEnd, location, healthCareProf, participants } = camp;

    // six camps, including Camp Name,
    // Image, Camp Fees, Date and Time, Location, Healthcare Professional,
    // and participant count
    return (
        <div className="border-2 shadow-xl rounded-lg relative">
            <h1 className="card-title">{campName}</h1>
           <div className="card  ">
           {/* lg:card-side  */}

  <div className="flex-1">
    
    <img
      src={campImage}
      className="rounded-t-md"
      alt="Album" />
  </div>
  <div className="card-body p-4 flex-1 gap-0">
   
    <p className="flex gap-1 items-center text-secondary"><IoLocation /> {location}</p>
    <p className="flex gap-1 items-center text-secondary"><FcCalendar /> : {dateStart}-to-{dateEnd}</p>
    <p className="flex gap-1 items-center text-secondary"><FcAlarmClock />: {timeStart}-to-{timeEnd}</p>
    <p className="flex gap-1 items-center text-secondary">Camp Fee :${campFee}</p>
    <p className="flex gap-1 items-center bg-secondary absolute top-2 right-2 badge rounded-md border-none"> <FaPeoplePulling />{participants}</p>
   <div className="h-16"><h2 className="flex gap-1 items-center text-secondary"><FaUserDoctor />Consultants: </h2>
   { healthCareProf.map((prof,index)=>
        <h1 key={index} className="flex gap-1 items-center text-secondary"> {prof}</h1>
    )}
   </div>
    <div className="card-actions justify-end">
      <Link to={`/camp-detail/${_id}`}><button className="btn btn-primary">More Details</button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default CampCard;