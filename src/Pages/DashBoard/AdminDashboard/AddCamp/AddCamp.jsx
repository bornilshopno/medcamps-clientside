import DashboardTitle from "../../../../Components/DashboardTitle";
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddCamp = () => {
    const axiosSecurely = useAxiosSecure()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        //participents count
    }
    return (
        <div>
            <DashboardTitle title={"New Camp Details:"}></DashboardTitle>
            <div>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Camp Name :</span>
                        </label>
                        <input type="text" placeholder="Camp Name" {...register("name")} className="input input-bordered w-full h-10" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Camp Image :</span>
                        </label>
                        <input type="text" placeholder="Camp Image URL" {...register("photoURL")} className="input input-bordered h-10" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Camp Fees :</span>
                        </label>
                        <input type="number" placeholder="Camp Fees" {...register("fees")} className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date and Time :</span>
                        </label>
                        <input type="text" placeholder="Date and Time" {...register("dati")} className="input input-bordered w-full h-10" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location :</span>
                        </label>
                        <input type="text" placeholder="Location" {...register("loc")} className="input input-bordered w-full h-10" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Health Care Professional Name :</span>
                        </label>
                        <input type="text" placeholder="Health Care Professional Name" {...register("proffessionalName")} className="input input-bordered w-full h-10" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description :</span>
                        </label>
                        <input type="text" placeholder="Camp Description" {...register("description")} className="input input-bordered w-full h-10" required />
                    </div>
                    {errors && <span className="text-red-500"></span>}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Publish Campaign</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;