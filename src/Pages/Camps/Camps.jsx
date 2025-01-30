import { useEffect, useState } from "react";
import CampCard from "../../Components/CampCard";
import SectionTitles from "../../Components/SectionTitles";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { TbColumns2, TbColumns3 } from "react-icons/tb";
import { BsColumns } from "react-icons/bs";
import { Helmet } from "react-helmet-async";


const Camps = () => {
    
    const axiosPublicly = useAxiosPublic();
    const [showCamps, setShowCamps] = useState([])
    const [sortBy, setsortBy] = useState("")
    const [search, setSearch] = useState("");
    const [columns, setColumns] = useState(4)

    const columnClassMap = {
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4", // Explicitly map for all possible values
      };

    useEffect(() => {

        const fetchedData = async () => {
            const res = await axiosPublicly.get(`/camps?search=${search}&sortBy=${sortBy}`)
            setShowCamps(res.data)
        }

        fetchedData();
    }, [axiosPublicly, search, sortBy])

    return (
        <div>
            <SectionTitles heading={"All Camps by MedCamps"} subHeading={"explore to know about all our camps"}></SectionTitles>
            <Helmet>
                <title>MedCamps || AllCamps</title>
            </Helmet>
            <div className="flex justify-center items-center gap-5 Lg:gap-10 flex-col-reverse md:flex-row items center py-5 w-10/12 mx-auto">
                <div className="flex join justify-between  overflow-hidden rounded-xl focus-within:ring w-[255px] border-2 border-primary">
                    <input onChange={e => setSearch(e.target.value)} type="text" name="searchbox" placeholder="type to search" className="focus:outline-none bg-green-100 text-gray-600 text-center" />
                    <button className="btn btn-sm  rounded-l-none bg-primary   border-none" onClick={(e) => setSearch(e.target.searchbox.value)}> Search</button></div>
                <div className="dropdown dropdown-bottom dropdown-end border border-primary rounded-lg">
                    <div tabIndex={0} role="button" >
                        {sortBy ? <h1 className="btn btn-sm bg-primary  border-none">Sorted by {sortBy}</h1> : <h1 className="btn btn-sm bg-green-100 text-gray-700">Sort Camps?</h1>}


                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-green-100 text-gray-600 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={() => setsortBy("participants")}><a>Most Registered</a></li>
                        <li onClick={() => setsortBy("campFee")}><a>Camp Fees</a></li>
                        <li onClick={() => setsortBy("campName")}><a>Alphabetically</a></li>
                        <li onClick={() => setsortBy("")}><a>Reset</a></li>
                    </ul>
                </div>
                <div className="join rounded-lg hidden lg:block">
                    <button onClick={() => setColumns(2)} className={`join-item btn btn-sm ${(columns == 2) ? "bg-primary" : ""}`}> <TbColumns2 className="text-gray-700 text-xl" /></button>
                    <button onClick={() => setColumns(3)} className={`join-item btn btn-sm ${(columns == 3) ? "bg-primary" : ""}`}><TbColumns3 className="text-gray-800 text-xl" /></button>
                    <button onClick={() => setColumns(4)} className={`join-item btn btn-sm ${(columns == 4) ? "bg-primary" : ""}`}><BsColumns className="text-gray-800 text-xl" /></button>

                </div>
            </div>
            {search && <p className="text-center">Searched by : <span className="text-primary font-semibold">{search}</span></p>}
        
            <div className={`w-11/12 mx-auto grid sm:grid-cols-2 ${columnClassMap[columns] || "lg:grid-cols-3"} gap-4 py-5`} >
                {showCamps?.map(camp =>
                    <CampCard key={camp._id} camp={camp} columns={columns}></CampCard>

                )}
            </div>
        </div>
    );
};

export default Camps;