import DashboardTitle from "../../../../Components/DashboardTitle";
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const AddCamp = () => {
    const axiosSecurely = useAxiosSecure()
    const [isDisabled, setIsDisabled]=useState(true)
 

    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm()

    const [healthCareProf, setHealthCareProf] = useState([""])
    // console.log(healthCareProf,'porerta', healthCareProf[0])
   
    //healthcare proffessional 
    // Handle healthcare professionals array
    const handleHealthCareProfChange = (index, value) => {
        const updatedProf = [...healthCareProf];
        updatedProf[index] = value;
        if (healthCareProf[0] !== ""){
            setIsDisabled(false)
        }
        setHealthCareProf(updatedProf);
    };
    // Add a new healthcare professional
    const addHealthCareProf = () => {
        setHealthCareProf([...healthCareProf, ""]
        );
    };

    // Remove a healthcare professional
    const removeHealthCareProf = (index) => {
        const updatedProf = healthCareProf.filter((_, i) => i !== index);
        setHealthCareProf(updatedProf);
    };




    const onSubmit = (data) => {
        let participantsCount=0;  
        const campData={...data, healthCareProf,participants:participantsCount}
        console.log(campData);
        axiosSecurely.post("/camps", campData)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    title: "Custom animation with Animate.css",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                  reset();
            }
        })

    }



    return (
        <div>
            <DashboardTitle title={"New Camp Details:"}></DashboardTitle>
            <div>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                    {/* Camp Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Camp Name :</span>
                        </label>
                        <input type="text" placeholder="Camp Name" {...register("campName")} className="input input-bordered w-full h-10" required />
                    </div>
                    {/* Camp Banner Image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Camp Image :</span>
                        </label>
                        <input type="url" placeholder="Camp Image URL" {...register("campImage")} className="input input-bordered h-10" required />

                    </div>
                    {/* Camp Fees */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Camp Fees :</span>
                        </label>
                        <input type="number" placeholder="Camp Fees" {...register("campFee")} className="input input-bordered w-full" required />
                    </div>
                    {/* Camp Schedule  */}
                    <div className="lg:flex gap-10">
                        {/* date */}
                        <div className="flex gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Start Date :</span>
                                </label>
                                <input type="date"   {...register("dateStart")} className="input input-bordered w-full h-10" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">End Date :</span>
                                </label>
                                <input type="date"  {...register("dateEnd")} className="input input-bordered w-full h-10" />
                            </div>
                        </div>
                        {/* time */}
                        <div className="flex gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Start Time :</span>
                                </label>
                                <input type="time"   {...register("timeStart")} className="input input-bordered w-full h-10" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">End Time :</span>
                                </label>
                                <input type="time"  {...register("timeEnd")} className="input input-bordered w-full h-10" />
                            </div>
                        </div>
                    </div>
                    {/* Camp Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location :</span>
                        </label>
                        <input type="text" placeholder="Location" {...register("location")} className="input input-bordered w-full h-10" required />
                    </div>
                    {/* Camp Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description :</span>
                        </label>
                        <input type="text" placeholder="Camp Description" {...register("description")} className="input input-bordered w-full h-10" required />
                    </div>
                    {/* Camp : Health Care Professionals */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Health Care Professionals</label>
                        {healthCareProf.map((prof, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={prof}
                                    onChange={(e) => handleHealthCareProfChange(index, e.target.value)}
                                    placeholder={`Enter professional ${index + 1}`}
                                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => removeHealthCareProf(index)}
                                    className={`ml-2 px-4 py-2 rounded-md ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "text-white bg-red-500 hover:bg-red-600"}`}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            disabled={isDisabled}
                            onClick={addHealthCareProf}
                            className={`mt-2 px-4 py-2 text-white bg-blue-500 rounded-md  ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-600"}`}
                        >
                            Add Professional
                        </button>
                    </div>

                    {errors && <span className="text-red-500">Please Fill Up Information Correctly</span>}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Publish Campaign</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;