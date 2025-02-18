import {  Link, useParams } from "react-router-dom";
import SectionTitles from "./SectionTitles";
import { FaPeoplePulling, FaUserDoctor } from "react-icons/fa6";
import { FcCalendar, FcAlarmClock } from "react-icons/fc";
import { IoLocation } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCamps from "../Hooks/useCamps";

const CampDetails = () => {
    const axiosSecurely = useAxiosSecure()
    const[camp, setCamp]=useState(null)
    const {id:campID} = useParams()
    const [allCamps, refetch]=useCamps()

  useEffect(() => {
    
    if (allCamps && allCamps.length > 0) {
      const selectedCamp = allCamps?.find(camp=>camp._id=== campID);
      setCamp(selectedCamp);
    }
  }, [allCamps, campID]);


    const { user } = useAuth()
    const [disabled, setDisabled] = useState(true);
    const { _id, campName, campImage, campFee, dateStart, dateEnd, timeStart, description, timeEnd, location, healthCareProf, participants } = camp || {};

    //modal related
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        emergencyContact: '',
        phoneNumber: '',
    });


    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => { setIsOpen(true) }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#0e864c';
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Validate the current state of the form
        const updatedFormData = {
            ...formData,
            [name]: value,
        };



        // Check if all fields are filled
        if (
            updatedFormData.age &&
            updatedFormData.gender &&
            updatedFormData.emergencyContact &&
            updatedFormData.phoneNumber
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

    }
    const closeModal = () => {
             setIsOpen(false)
    }



    const onSubmit = (data) => {
 
        closeModal();
        const registration = {campID:_id, campName, campFee, location, healthCareProf, participantName: user.displayName, participantEmail: user.email, ...data }
     
        axiosSecurely.post("/participants", registration)
            .then(res => {
                if (res.data.insertedId) {

                    const currentParticipants = participants + 1;
                    const cpc = { participants: currentParticipants };
                                   axiosSecurely.patch(`/camps/pCount/${_id}`, cpc)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Join Request Submitted",
                                    text: "Pls check RegisteredCamps from Dashboard",
                                    imageUrl: campImage,
                                    imageWidth: 400,
                                    imageHeight: 200,
                                    imageAlt: "Custom image"
                                });
                            }
                        }
                        )

                }
            })
    }
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    return (
        <div className=" bg-green-200 py-10">
            <SectionTitles heading={campName} subHeading={"Detailed Information"}
            ></SectionTitles>
            <div className="card glass lg:card-side w-10/12 mx-auto">
                <figure className="flex-1">
                    <img
                        src={campImage}
                        className="w-full h-full object-cover"
                        alt="campImage" />
                </figure>
                <div className="card-body flex-1">
                    <h2 className="card-title">{description}</h2>
                    <p className="flex gap-1 items-center text-secondary"><IoLocation /><span className="w-32 text-gray-600">Camp Location : </span>{location}</p>
                    <p className="flex gap-1 items-center text-secondary"><FcCalendar /><span className="w-32 text-gray-600">Camp Date : </span>{dateStart}-to-{dateEnd}</p>
                    <p className="flex gap-1 items-center text-secondary"><FcAlarmClock /><span className="w-32 text-gray-600">Operating Hour : </span>{timeStart}-to-{timeEnd}</p>
                    <p className="flex gap-1 items-center text-secondary"><GiMoneyStack /><span className="w-32 text-gray-600">Camp Fee : </span>${campFee}</p>
                    <p className="flex gap-1 items-center text-secondary"> <FaPeoplePulling /><span className="w-32 text-gray-600">Participants : </span>{participants}</p>
                    <div className="flex items-start"><h2 className="flex gap-1 items-center text-secondary"><FaUserDoctor /><span className="w-32 text-gray-600">Consultants: </span></h2>
                        <div>
                            {healthCareProf?.map((prof, index) =>
                                <h1 key={index} className="flex gap-1 items-center text-secondary"> {prof}</h1>
                            )}
                        </div>
                    </div>
                    <p></p>
                    <div className="card-actions justify-end">
                        {user ? 
                        <button onClick={openModal}
                        className="btn  bg-secondary border-none">Join Camp!</button>:
                        <Link to={"/join-us"}><button className="btn  bg-secondary border-none"> LogIn to Join Camp</button></Link>
                        }
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Feedback Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Submit your details to join the camp</h2>

                <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex">
                        <div>
                            <label>Age:</label>
                            <input
                                type="number"
                                name="age"
                                {...register("age")}
                                placeholder="Enter age"
                                className="input input-bordered h-8 mx-2"
                                defaultValue={formData.age}
                                onBlur={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Gender:</label>
                            <select
                                name="gender"
                                {...register("gender")}
                                defaultValue={formData.gender}
                                onBlur={handleInputChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                    </div>
                    <div>
                        <label>Emergency Contact:</label>
                        <input
                            type="text"
                            name="emergencyContact"
                            {...register("emergencyContact")}
                            placeholder="Enter emergency contact"
                            className="input input-bordered h-8 ml-2"
                            defaultValue={formData.emergencyContact}
                            onBlur={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            {...register("phoneNumber")}
                            placeholder="Enter phone number"
                            className="input input-bordered h-8 ml-2"
                            defaultValue={formData.phoneNumber}
                            onBlur={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={disabled} className="btn btn-sm btn-accent">
                        Submit to Join Camp
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default CampDetails;