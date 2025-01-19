import CampCard from "../../Components/CampCard";
import SectionTitles from "../../Components/SectionTitles";
import useCamps from "../../Hooks/useCamps";


const Camps = () => {
    const [allCamps]=useCamps();
    console.log(allCamps)
    return (
        <div>
           <SectionTitles heading={"All Camps by MedCamps"} subHeading={"explore to know about all our camps"}></SectionTitles>
            
            <div className="w-11/12 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5" >
                {allCamps?.map(camp=>
                <CampCard key={camp._id} camp={camp}></CampCard>
            
                )}
            </div>
        </div>
    );
};

export default Camps;