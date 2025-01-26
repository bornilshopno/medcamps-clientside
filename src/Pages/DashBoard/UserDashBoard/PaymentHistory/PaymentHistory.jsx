import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../../Components/DashboardTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";


const PaymentHistory = () => {
    const axiosSecurely = useAxiosSecure();
    const { user } = useAuth()
    console.log(user)
    const { data: history, isPending: loading } = useQuery(
        {
            queryKey: ["history"],
            queryFn: async () => {
                const res = await axiosSecurely.get(`/payments/payment/${user?.email}`)
                console.log(res.data)
                return res.data
            }
        }
    )
    console.log(history)
    return (
        <div>
            <DashboardTitle title={"Payment History"}></DashboardTitle>
            {
                (history?.length>0) ?
                <div className="overflow-x-auto rounded-t-lg border-4 border-primary">
                <table className="table ">
                    {/* head */}
                    <thead className="bg-primary ">
                        <tr>
                            <th></th>
                            <th>Camp Name</th>
                            <th className="text-center">Camp Fee</th>
                            <th className="text-center">Payment Status</th>
                            <th className="text-center">Confirmation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {history?.map((payment, index)=>
                            <tr key={payment._id}>
                            <th>{index+1}</th>
                            <td>{payment.campPaid}</td>
                            <td className="text-center">${payment.fee}</td>
                            <td className="text-center">{ payment.transactionID ? <p className="text-secondary">Paid</p> : <p className="text-amber-600">Pending</p>}</td>
                            <td className="text-center">{ payment.status ? <p className="text-secondary">Confirmed</p> : <p className="text-amber-600">Pending</p>}</td>
                           
                        </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
            :
            <div className="no-payment bg-gray-200">
                <p className="text-center max-w-xl mx-auto px-10 py-10 lg:py-20 text-3xl text-primary font-bold">No payment yet done from your end. Review all <Link className="text-blue-600" to={"/camps"}>Available Camps</Link> and participate which suits your purpose.</p>
            </div>
            }

        </div>
    );
};

export default PaymentHistory;