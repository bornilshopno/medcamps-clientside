import { useState } from "react";
import DashboardTitle from "../../../../Components/DashboardTitle";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";
import { Link } from "react-router-dom";


const Analytics = () => {
    const axiosSecurely = useAxiosSecure()
    const { user } = useAuth()
    const [rating, setRating] = useState(0)




    const { data: registeredCamps = [], isPending: loading, refetch } = useQuery({
        queryKey: [user?.email, "userCampings"],
        queryFn: async () => {
            const result = await axiosSecurely.get(`/med-camps/participant/${user?.email}`)
            return result.data
        }
    })
    const campRegistered = registeredCamps?.length || 0;


    const confirmedCamps = registeredCamps?.filter(camp => camp.paymentStatus == "approved");
    const paidCamps = registeredCamps?.filter(camp => camp.payment != null);
    const numberofPaidCamps = paidCamps?.length || 0;
    const numberofConfirmedCamps = confirmedCamps?.length || 0;
    const totalFeePaid = paidCamps?.reduce((total, current) => total + parseFloat(current.campFee), 0) || 0;
    const totalFeeRegistered = registeredCamps?.reduce((total, current) => total + parseFloat(current.campFee), 0) || 0;
    const feedbacks = (registeredCamps?.filter(camp => camp.feedbackStatus != null))?.length || 0;
   

    const data01 = [{ "name": "Paid Camps", "value": numberofPaidCamps }, { "name": "UnPaid Camps", "value": (campRegistered - numberofPaidCamps) }]
    const data02 = [{ "name": "Registered Camps Fees", "value": totalFeeRegistered }, { "name": "Paid CampFees", "value": totalFeePaid }]
    const data03 = [{ "name": "Registered Camps", "value": campRegistered }, { "name": "Authorized Camps", "value": numberofConfirmedCamps }]
    const data04 = [{ "name": "Registered Camps", "value": campRegistered }, { "name": "Authorized Camps", "value": feedbacks }]

    // const data01=[{numberofConfirmedCamps},{numberofUnpaidCamps}]
    // const data02=[{totalFeeRegistered}, {totalFee}]


    return (
        <div>
            <DashboardTitle title={"Analytics"}></DashboardTitle>

            <div>
                {
                    (registeredCamps.length > 0 ?
                        <>
                         <div className="border-4 border-primary rounded-lg mb-5 bg-base-200">
                                    <div className="bg-primary">
                                        <h2 className="text-left">Overall Stats</h2>
                                        <hr />                                      
                                    </div>
                                <div className="flex flex-col lg:flex-row p-5">
                                    <div className="flex-1 m-auto">
                                    <PieChart width={200} height={250} className="mx-auto">
                                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={10} outerRadius={20} fill="#8884d8" />
                                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={25} outerRadius={35} fill="#58e5cb" />
                                    <Pie data={data03} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={50} fill="#44cef6" />
                                    <Pie data={data04} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={70} fill="#449af6" />
                                </PieChart>
                                    </div>
                                 <div className="flex-col justify-center items-center flex-1 rounded-xl">
                                 <div className="bg-[#8884d8] px-10 py-1 rounded-t-lg">
                                        <h2 className="text-left">Paid Camps</h2>
                                        <hr />
                                        <h2 className="text-right">Unpaid Camps</h2>
                                    </div>
                                    <div className="bg-[#58e5cb] px-10 py-1">
                                        <h2 className="text-left">Fees for All Registered Camps</h2>
                                        <hr/>
                                        <h2 className="text-right">Paid fees for Camps</h2>
                                    </div>
                                    <div className="bg-[#44cef6] px-10 py-1">
                                        <h2 className="text-left">Total Camps</h2>
                                        <hr />
                                        <h2 className="text-right">Confirmed Camps</h2>
                                    </div>
                                    <div className="bg-[#449af6] px-10 py-1 rounded-b-lg">
                                        <h2 className="text-left">Registered Camps</h2>
                                        <hr />
                                        <h2 className="text-right">Feedback Sent</h2>
                                    </div>
                                 </div>
                                </div>
                                </div>
                            <div>
                               
                            </div>
                            <div className="grid lg:grid-cols-2 gap-5 lg:gap-10 ">
                                <div className="border-4 border-primary rounded-lg bg-base-200" >
                                    <div className="bg-primary">
                                        <h2 className="text-left">Paid Camps</h2>
                                        <hr />
                                        <h2 className="text-right">Unpaid Camps</h2>
                                    </div>
                                    <PieChart width={200} height={250} className="mx-auto">

                                        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={70} fill="#8884d8" label />
                                    </PieChart>
                                </div>
                                <div className="border-4 border-primary rounded-lg bg-base-200">
                                    <div className="bg-primary">
                                        <h2 className="text-left">Fees for All Registered Camps</h2>
                                        <hr />
                                        <h2 className="text-right">Paid fees for Camps</h2>
                                    </div>
                                    <PieChart width={200} height={250} className="mx-auto">
                                        <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={70} fill="#58e5cb" label />
                                    </PieChart>
                                </div>
                                <div className="border-4 border-primary rounded-lg bg-base-200">
                                    <div className="bg-primary">
                                        <h2 className="text-left">Total Camps</h2>
                                        <hr />
                                        <h2 className="text-right">Confirmed Camps</h2>
                                    </div>
                                    <PieChart width={200} height={250} className="mx-auto">
                                        <Pie data={data03} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={70} fill="#44cef6" label />
                                    </PieChart>
                                </div>
                                <div className="border-4 border-primary rounded-lg bg-base-200">
                                    <div className="bg-primary">
                                        <h2 className="text-left">Registered Camps</h2>
                                        <hr />
                                        <h2 className="text-right">Feedback Sent</h2>
                                    </div>
                                    <PieChart width={200} height={250} className="mx-auto">
                                        <Pie data={data04} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={70} fill="#449af6" label />
                                    </PieChart>
                                </div>
                            </div>
                        </>
                        :
                        <div className="no-payment bg-gray-200">
                            <p className="text-center max-w-xl mx-auto px-10 py-10 lg:py-20 text-3xl text-primary font-bold">Not registered for any camp yet! Please Review all <Link className="text-blue-600" to={"/camps"}>Available Camps</Link> and participate which suits your purpose.</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Analytics;