import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../../Components/DashboardTitle";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdFeedback, MdOutlineCancelPresentation, MdPending } from "react-icons/md";
import Swal from "sweetalert2";
import { AiFillDollarCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-modal';
import { Heart, Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const RegCamps = () => {
    const axiosSecurely = useAxiosSecure()
    const { user } = useAuth()
    const [rating, setRating] = useState(0)

    const [campUser, setCampUser] = useState({})
    // console.log(campUser)
    // console.log(feedbackIndex)

    const { data: registeredCamps = [], isPending: loading, refetch } = useQuery({
        queryKey: [user?.email, "userCamps"],
        queryFn: async () => {
            const result = await axiosSecurely.get(`/med-camps/participant/${user?.email}`)
            return result.data
        }
    })


    const handleCancelParticipation = (participant) => {
        console.log(participant)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecurely.delete(`/participants/participant/${participant._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            axiosSecurely.get(`/camps/camp-detail/${participant.campID}`)
                                .then(res => {
                                    console.log(res.data)
                                    const currentParticipants = res.data.participants - 1;
                                    console.log(currentParticipants)
                                    const cpc = { participants: currentParticipants };
                                    console.log(cpc)
                                    axiosSecurely.patch(`/camps/pCount/${res.data._id}`, cpc)
                                        .then(res => {
                                            console.log(res.data)
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Join request cancelled!",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            refetch();
                                        })

                                })

                            //


                        }
                    })
            }
        });




    }

    const myStyles = {
        itemShapes: Heart,
        activeFillColor: '#40b176',
        inactiveFillColor: '#D3D3D3'
    }

    //modal related

    const customStyles = {
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


    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(userC) {
        setIsOpen(true);
        setCampUser(userC)
    }


    function closeModal() {
        setIsOpen(false);
        setCampUser({})
    }

    const handleFeedback = (e) => {
        e.preventDefault();

        const feedback = e.target.feedback.value;
        const feedbackInfo = {
            feedback: feedback,
            rating: rating,
            participantEmail: user?.email,
            participantName: user?.displayName,
            campID: campUser?.campID,
            participantID: campUser?._id,
            date: Date(),

        }
        console.log("feedback", campUser, feedbackInfo)
        axiosSecurely.post("/feedbacks", feedbackInfo)
            .then(res => {
                if (res.data.result.insertedId) {
                    console.log(res.data)
                    Swal.fire({
                        title: "Feedback Posted Successfully!",
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
            }
            )
    }


    return (
        <div>
            <DashboardTitle title={"Registered Camps"}></DashboardTitle>
           {
            (registeredCamps.length>0) ?
            <div className="overflow-x-auto ">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Camp Name</th>
                        <th>Camp Fees</th>
                        <th>Payment Status</th>
                        <th>Confirmation Status</th>
                        <th>Cancel</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {registeredCamps?.map((userC, idx) =>
                        <tr key={userC._id} >
                            <th>{idx + 1}</th>
                            <td>{userC.campName}</td>
                            <td>{userC.campFee}</td>
                            <td className="">{(userC.payment === "paid") ?
                                <p className="flex gap-1 items-center justify-center"><GiConfirmed className="text-2xl text-secondary" />Paid</p> :
                                <Link to={`/dashboard/payment/${userC._id}`}>
                                    <button className="flex gap-1 btn btn-sm bg-amber-300 mx-auto" >Pay <AiFillDollarCircle className="text-2xl" /> </button></Link>}</td>
                            <td className="">{(userC.paymentStatus === "approved") ?
                                <p className="flex gap-1 justify-center items-center py-1 rounded-md"><GiConfirmed className="text-2xl text-secondary" />Confirmed </p> : <p className="flex gap-1 justify-center bg-amber-300 py-1 rounded-md">Pending<MdPending /></p>} </td>
                            <td>
                                <button disabled={userC.transactionID} className="btn btn-sm bg-amber-300 text-red-600 p-0 h-6" onClick={() => handleCancelParticipation(userC)}><MdOutlineCancelPresentation className="text-3xl" /> </button></td>


                            <td>
                                <button disabled={!userC.paymentStatus || userC.feedbackStatus} className="flex gap-1 btn btn-sm bg-amber-200" onClick={() => openModal(userC)}>{userC.feedbackStatus ? <><GiConfirmed className="text-2xl text-secondary" />Feedback </>: <>Feedback<MdFeedback className="text-2xl" /></>} </button></td>

                        </tr>

                    )}




                </tbody>
            </table>

        </div>
        :
        <div className="no-payment bg-gray-200">
                <p className="text-center max-w-xl mx-auto px-10 py-10 lg:py-20 text-3xl text-primary font-bold">Not registered for any camp yet! Please Review all <Link className="text-blue-600" to={"/camps"}>Available Camps</Link> and participate which suits your purpose.</p>
            </div>
           }

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >


                <div className="bg-green-100 p-4">
                    <div className="mb-3">Hello! Please enter your feedback and ratings on</div>
                    <form onSubmit={handleFeedback}>
                        <div className="form-control">

                            <input type="text" placeholder="type your feedback" name="feedback" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Feedback on campName</span>
                            </label>
                            <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} itemStyles={myStyles} isRequired />
                        </div>
                        <button type="submit" className="w-full bg-secondary mt-3">Submit</button>
                    </form>
                </div>
            </Modal>

        </div>
    );
};

export default RegCamps;