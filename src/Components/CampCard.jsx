import Aos from "aos";
import 'aos/dist/aos.css';
import { FaPeoplePulling, FaUserDoctor } from "react-icons/fa6";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";


const CampCard = ({ camp , columns }) => {

  // eslint-disable-next-line react/prop-types
  const { _id, campName, campImage, campFee, dateStart, dateEnd, timeStart, timeEnd, location, healthCareProf, participants } = camp;
  Aos.init();

  return (
    <div className="shadow-xl rounded-lg relative ">
      <h1 className={`card-title bg-primary dark:bg-green-900 rounded-t-lg pl-2 ${(columns===4) ? "h-12 text-base" : ""}`}>{campName}</h1>
      <div className="card  ">
        
  

        <div className="flex-1 bg-primary">

          <img
            src={campImage}
            className={`rounded-t-md w-full h-52  ${(columns===4) ? "lg:h-52" : "lg:h-72"} object-cover`}
            alt="Album" />
        </div>
        <div className="card-body bg-base-200 p-4 flex-1 gap-0 border-x border-b rounded-b-lg">

          <p className="flex gap-1 items-center text-secondary"><IoLocation /> {location.split(",")[1] || "TBC"}</p>
          <p className="flex gap-1 items-center text-secondary"><FcCalendar /> : {dateStart}-to-{dateEnd}</p>
          <p className="flex gap-1 items-center text-secondary"><FcAlarmClock />: {timeStart}-to-{timeEnd}</p>
          <p className="flex gap-1 items-center text-secondary">Camp Fee :${campFee}</p>
          <p className="flex gap-1 items-center bg-secondary dark:bg-green-900 text-white font-bold absolute top-2 right-2 badge rounded-md border-none" data-aos="zoom-in"> <FaPeoplePulling />{participants}</p>
          <div className="h-16"><h2 className="flex gap-1 items-center text-secondary"><FaUserDoctor />Consultants: </h2>
            {healthCareProf.map((prof, index) =>
              <h1 key={index} className="flex gap-1 items-center text-secondary"> {prof}</h1>
            )}
          </div>
          <div className="card-actions justify-end">
            <Link to={`/camp-detail/${_id}`}><button className="btn border-none btn-sm bg-primary dark:bg-green-900 dark:text-white">...See More</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampCard;