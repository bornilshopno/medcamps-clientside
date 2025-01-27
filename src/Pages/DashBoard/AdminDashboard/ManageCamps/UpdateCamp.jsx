import { useNavigate, useParams } from "react-router-dom";
import useCamps from "../../../../Hooks/useCamps";
import DashboardTitle from "../../../../Components/DashboardTitle";
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";


const UpdateCamp = () => {
    const [allCamps] = useCamps()
    const campID = useParams()
    const navigate=useNavigate();
    const axiosSecurely = useAxiosSecure()
    const [isDisabled, setIsDisabled] = useState(false)
    const campToUpdate = allCamps?.find(camp => camp._id === campID.id)
    const { _id, campName, campImage, campFee, dateStart, dateEnd, timeStart, timeEnd, location, description, healthCareProf: healthcareProfessionals, participants } = campToUpdate;
 



    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const [healthCareProf, setHealthCareProf] = useState(healthcareProfessionals)

    // Handle healthcare professionals array
    const handleHealthCareProfChange = (index, value) => {
        const updatedProf = [...healthCareProf];
        updatedProf[index] = value;
        if (healthCareProf[0] === "") {
            setIsDisabled(true)
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

        const campUpdatedData = { ...data, healthCareProf }
        axiosSecurely.put(`/camps/update-camp/${_id}`, campUpdatedData)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: `${campName} updated successfully!`,
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
         navigate("/dashboard/manageCamps")
                }
            })

    }

    return (
        <div>
            <div>
                <DashboardTitle title={"Update Camp Details:"}></DashboardTitle>
                <div>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        {/* Camp Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Camp Name :</span>
                            </label>
                            <input type="text" defaultValue={campName} placeholder="Camp Name" {...register("campName")} className="input input-bordered w-full h-10" required />
                        </div>
                        {/* Camp Banner Image */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Camp Image :</span>
                            </label>
                            <input type="url" defaultValue={campImage} placeholder="Camp Image URL" {...register("campImage")} className="input input-bordered h-10" required />

                        </div>
                        {/* Camp Fees */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Camp Fees :</span>
                            </label>
                            <input type="number" defaultValue={campFee} placeholder="Camp Fees" {...register("campFee")} className="input input-bordered w-full" required />
                        </div>
                        {/* Camp Schedule  */}
                        <div className="lg:flex gap-10">
                            {/* date */}
                            <div className="flex gap-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Start Date :</span>
                                    </label>
                                    <input type="date" defaultValue={dateStart}  {...register("dateStart")} className="input input-bordered w-full h-10" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">End Date :</span>
                                    </label>
                                    <input type="date" defaultValue={dateEnd} {...register("dateEnd")} className="input input-bordered w-full h-10" />
                                </div>
                            </div>
                            {/* time */}
                            <div className="flex gap-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Start Time :</span>
                                    </label>
                                    <input type="time" defaultValue={timeStart}  {...register("timeStart")} className="input input-bordered w-full h-10" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">End Time :</span>
                                    </label>
                                    <input type="time" defaultValue={timeEnd} {...register("timeEnd")} className="input input-bordered w-full h-10" />
                                </div>
                            </div>
                        </div>
                        {/* Camp Location */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location :</span>
                            </label>
                            <input type="text" defaultValue={location} placeholder="Location" {...register("location")} className="input input-bordered w-full h-10" required />
                        </div>
                        {/* Camp Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description :</span>
                            </label>
                            <input type="text" defaultValue={description} placeholder="Camp Description" {...register("description")} className="input input-bordered w-full h-10" required />
                        </div>
                        {/* Camp : Health Care Professionals */}
                        <div className="form-control">
                            <label className="label">Health Care Professionals</label>
                            {healthCareProf.map((prof, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        defaultValue={prof}
                                        onBlur={(e) => handleHealthCareProfChange(index, e.target.value)}
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
                                onClick={addHealthCareProf}
                                className={`mt-2 px-4 py-2 w-40 text-white bg-blue-500 rounded-md  ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-600"}`}
                            >
                                Add Professional
                            </button>
                        </div>

                        {errors && <span className="text-red-500">Please Fill Up Information Correctly</span>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update Camp Detail</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCamp;