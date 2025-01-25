import { useEffect, useState } from "react";
import SectionTitles from "../../../Components/SectionTitles";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import CampCard from "../../../Components/CampCard";
import { Link } from "react-router-dom";


const PopularSection = () => {
    const axiosPublicly = useAxiosPublic()
    const [popularCamps, setPopularCamps] = useState([])

    useEffect(
        () => {
            axiosPublicly.get("/poplularCamps")
                .then(result => {
                    setPopularCamps(result.data)
                })
        }
        , [axiosPublicly])

    return (
        <div>
            <SectionTitles heading={"Most Popular Camps"} subHeading={"---participants grabed this camps---"}></SectionTitles>
            <div className="w-11/12 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                {popularCamps?.map(camp => <CampCard key={camp._id} camp={camp}></CampCard>)}
            </div>
            <div className="w-40 pb-5 ml-auto"><Link to={'/camps'} className="btn btn-sm bg-secondary">See All Camps</Link></div>
        </div>
    );
};

export default PopularSection;