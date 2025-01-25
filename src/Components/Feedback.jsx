import useAuth from "../Hooks/useAuth";

const Feedback = ({campUser}) => {
    const {user,feedbackIndex,SetFeedbackIndex}=useAuth()
    console.log(campUser, feedbackIndex)
const {_id, campID, campName, }=campUser;
    // {
    //     "_id": "678fa8625f18f480324f058f",
    //     "campID": "678ad205e0f0d2ff63da0302",
    //     "campName": "Heart Health Awareness Camp",
    //     "campFee": "154",
    //     "location": "Community Hall, Eastwood",
    //     "healthCareProf": [
    //         "Dr. Olivia Adams",
    //         "Dr. Steven Kim"
    //     ],
    //     "participantName": "Ashraf MANNA",
    //     "participantEmail": "manna.tex33@gmail.com",
    //     "age": "33",
    //     "gender": "Male",
    //     "emergencyContact": "sdfd",
    //     "phoneNumber": "676",
    //     "payment": "paid",
    //     "transactionID": "pi_3Qjo3pBLcjLRVLIX4zhk0vnK",
    //     "paymentStatus": "approved"
    // }

    const handleFeedbackSubmit=(e)=>{
        e.preventDefault();
        const feedback=e.target.feedback.value;
        const feebackInfo={
            feedback:feedback,
            user:user?.email,
            userName:user?.displayName,
            campID,
            participantID: _id,
            date: new Date().toISOString(),
        }
        SetFeedbackIndex(0)
    }


    return (
        <div className="flex flex-col gap-4 p-2">
         <h2>Feedback On <br/>
            <span>{campName}</span></h2>
       <form className="flex gap-2" onSubmit={handleFeedbackSubmit}>
       <textarea name="feedback"
       className="textarea textarea-bordered" placeholder="write feedback">

</textarea>
<button className="btn btn-secondary" >Submit</button>
       </form>
         
        </div>
    );
};

export default Feedback;