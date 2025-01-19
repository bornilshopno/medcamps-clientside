//VITE_Payment_Gateway_PK=pk_test_51QgRTzBLcjLRVLIXlZjKTxnkgwWCkAcM0YapJU5uVhrKFea84eoljp3bK62gjdCO0Q1V9Kth0vY929wobNqD1wVI00NI7At2De

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCamp from "../../Hooks/useCamp";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useJoin from "../../Hooks/useJoin";

const CampDetails = () => {
  const { campId } = useParams(); // Get campId from the URL
  const [camps, setCamps] = useState(null); // Selected camp
  const [camp, loading] = useCamp(); // Get all camps
  const { user } = useAuth(); // Logged-in user
  const axiosSecure = useAxiosSecure();
  const [ , ,refetch] = useJoin();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [formData, setFormData] = useState({
    participantName: user?.displayName || "Guest",
    participantEmail: user?.email || "guest@example.com",
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: "",
  });

  useEffect(() => {
    if (camp && camp.length > 0) {
      const selectedCamp = camp.find((camp) => camp._id.toString() === campId);
      setCamps(selectedCamp);
    }
  }, [camp, campId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const age = form.age.value;
    const phoneNumber = form.phoneNumber.value;
    const gender = form.gender.value;
    const emergencyContact = form.emergencyContact.value;

    const participantData = {
      name: formData.participantName,
      email: formData.participantEmail,
      age,
      phoneNumber,
      gender,
      emergencyContact,
      campName: camps.name,
      campFees: camps.campFees || camps.price,
      location: camps.location,
    };

    console.log(participantData);

    //send data to the server
    // fetch("http://localhost:4000/participants", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(participantData),
    // })
    //   .then((res) => res.json())
    try {
       await axiosSecure.post("/participants", participantData)
      console.log("Successfully added");
      Swal.fire({
        title: "Success!",
        text: "Added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      refetch()
      e.target.reset();
      navigate('/dashboard/registered-camps')
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!camps) return <div>Camp not found.</div>;


  return (
    <div className="camp-details w-11/12 mx-auto">
      <h2 className="text-3xl font-semibold mb-4">{camps.name}</h2>
      <div className="camp-detail-card">
        <img
          src={camps.image}
          alt={camps.name}
          className="camp-detail-image rounded-lg"
        />
        <div className="camp-detail-info mt-4">
          <p>
            <strong>Camp Fees:</strong> ${camps.campFees || camps.price}
          </p>
          <p>
            <strong>Date and Time:</strong>{" "}
            {new Date(camps.dateAndTime).toLocaleString()}
          </p>
          <p>
            <strong>Location:</strong> {camps.location}
          </p>
          <p>
            <strong>Healthcare Professional:</strong>{" "}
            {camps.healthcareProfessional}
          </p>
          <p>
            <strong>Participants:</strong> {camps.participantCount || 0}
          </p>
          <p>
            <strong>Description:</strong> {camps.description}
          </p>
          <button
            className="btn btn-primary mt-4 hover:bg-primary-focus"
            onClick={() => setShowModal(true)}
          >
            Join Camp
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed  inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal modal-open w-full ">
            <div className="modal-box p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Participant Registration
              </h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Camp Name, Fees, Location */}
                <div className="md:flex gap-4">
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Camp Name</span>
                    </label>
                    <input
                      type="text"
                      value={camps.name}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Camp Fees</span>
                    </label>
                    <input
                      type="text"
                      value={`$${camps.campFees || camps.price}`}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* Participant Details */}
                <div className="md:flex gap-4">
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Participant Name</span>
                    </label>
                    <input
                      type="text"
                      value={formData.participantName}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Participant Email</span>
                    </label>
                    <input
                      type="email"
                      value={formData.participantEmail}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* Participant's Age, Phone Number, Gender, Emergency Contact */}
                <div className="md:flex gap-4">
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Age</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                {/* Gender and Emergency Contact */}
                <div className="md:flex gap-4">
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Gender</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text">Emergency Contact</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                {/* Submit and Cancel buttons */}
                <div className="flex flex-col gap-4">
                  <button type="submit" className="btn btn-primary w-full">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary w-full"
                    onClick={() => {
                      setShowModal(false);
                      setFormData({
                        participantName: user?.displayName || "Guest",
                        participantEmail: user?.email || "guest@example.com",
                        age: "",
                        phoneNumber: "",
                        gender: "",
                        emergencyContact: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;