import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// to add image inside form
const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublicly=useAxiosPublic();
  const { setRegistered, createUser, setUser,logout, setLoading, updateUserProfile } = useAuth();

  const navigate = useNavigate()
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();//
  const onSubmit = async (data) => {
    console.log(data);
    //image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] }
    const res = await axiosPublicly.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    console.log(res.data)

    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        console.log(data.name, data.image)

        console.log(res.data)
        if (res.data.success) {
          updateUserProfile(data.name, res.data.data.display_url)
          .then(() => {
            console.log("user profile updated");
            const userInfo = {
              name: data.name,
              email: data.email,
              role:"user"
            }
            axiosPublicly.post('/users', userInfo)
              .then(res => {console.log(res);
                if (res.data._id) {
                 console.log("user info successfully posted in Databas")
                  reset();
                  logout();
                  setRegistered(true);
                  navigate("/join-us");
                  Swal.fire({
                    title: "Registered Successfully, pls LOGIN to continue",
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

                }
              })

          })
          .catch(error => { console.log(error) })
        }
       
        setLoading(false)
      })

  }



  return (
    <div>
     
      <div className=" bg-base-200 max-w-96 mx-auto ">
        <div className="hero-content ">
          <div className="card bg-base-100 w-full shadow-2xl ">
            <form className="card-body pb-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" {...register("name", { required: true })} className="input input-bordered h-10" required />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered h-10" required />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 8,
                  pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/
                })} className="input input-bordered h-10" required />
                {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be of 6 characters</span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-500">Password should not be more than 8 characters</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-500">Password must contain one Uppercase one Lowercase and one Digit</span>}

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                {/* <input type="text" placeholder="PhotoURL" {...register("photoURL", { required: true })} className="input input-bordered h-10" required /> */}
                <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                {errors.photoURL && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control mt-6">
                <input type="submit" value="Sign UP" className="btn btn-primary" />

              </div>
            </form>
            <p className="text-center pb-5">Already have an account? pls <span className="text-blue-700 font-semibold"><button onClick={() => setRegistered(true)}>Sign In</button></span></p>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;