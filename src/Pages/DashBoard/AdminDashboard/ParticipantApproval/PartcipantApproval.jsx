import DashboardTitle from "../../../../Components/DashboardTitle";



const PartcipantApproval = () => {
    return (
        <div>
            <DashboardTitle title={"Participants Look Up"} />
            {/* <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                {/* <thead>
                                    <tr>
                                        <th></th>
                                        <th>Participant Name</th>
                                        <th>Camp Name</th>
                                        <th>Camp Fees</th>
                                        <th>Transaction Id</th>
                                        <th>Transaction Date</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allParticipants?.map((user, idx) =>
                                        <tr key={user._id} >
                                            <th>{idx + 1}</th>
                                            <td>{user.participantName}</td>
                                            <td>{user.campName}</td>
                                            <td>{user.campFee}</td>
                                            <td>Blue</td>
                                            <td>Blue</td>
                                            <td>{(user.payment === "paid") ?
                                                <GiConfirmed className="text-2xl" /> :
                                                <button onClick={() => handleCancelParticipation(user)}><MdOutlineCancelPresentation className="text-2xl" /> </button>}</td>
                                        </tr>
            
                                    )}
            
            
            
            
                                </tbody>
                            </table>
                        </div> */} 
        </div>
    );
};

export default PartcipantApproval;