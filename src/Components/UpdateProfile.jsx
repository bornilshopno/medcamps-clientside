import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

import image from "../assets/pro-update.png"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import DashboardTitle from "./DashboardTitle";

const UpdateProfile = () => {
    const { user, updateUserProfile } = useAuth()
    const axiosSecurely = useAxiosSecure()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        updateUserProfile(data.name, data.photoURL)
            .then(() => {
                const userInfo = {
                    name: data.name,
                }
                axiosSecurely.patch(`/users/user/${user.email}`, userInfo)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Profile Updated as Requested.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/dashboard")
                        }
                    })
            })
    }
    return (
        <div className="">
            <DashboardTitle title={"Update Profile"}></DashboardTitle>
            <div className="flex flex-col md:flex-row gap-10 pt-3">
                <div className="w-52">
                    <img src={image} alt="" />
                </div>
                <div className="flex-grow max-w-screen-sm">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Updated Name:</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} {...register("name")} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Updated PhotoURL:</span>
                            </label>
                            <input type="text" defaultValue={user?.photoURL} {...register("photoURL")} className="input input-bordered" required />

                        </div>
                        {errors && <span className="text-red-500"></span>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Submit to Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;