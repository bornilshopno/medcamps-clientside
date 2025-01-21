import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const [transactionID, setTransactionID] = useState("")
    const axiosSecurely = useAxiosSecure()
    const navigate=useNavigate()

    const { id: campId } = useParams()

 
    const { data: camp = {}, refetch } = useQuery({
        queryKey: ["queryById", campId],
        queryFn: async () => {
            const result = await axiosSecurely.get(`participants/payment/${campId}`)
            return (result.data)

        }
    })

    useEffect(() => {
       if(camp?.campFee){
        
        axiosSecurely.post("/create-payment-intent", { price: camp?.campFee })
            .then(res => {
                           setClientSecret(res.data.clientSecret)
            })
       }

    },
        [axiosSecurely, camp.campFee])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) { return }
        const card = elements.getElement(CardElement);
        if (card === null) { return }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            console.log("paymentError", error);
            setError(error.message)
        }
        else {
            console.log("paymentMethod", paymentMethod);
            setError("")
        }

        //Confirm Payment
        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "Anonymous",
                    name: user?.displayName || "Anonymous"

                }
            }
        })
        if (cardConfirmError) {
            console.log('cardConfirmError')
        }
        else {
            console.log('payment intent-check status', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                              setTransactionID(paymentIntent.id)


            //now save the payment in the database

            const paymentInfo={
                email:user?.email,
                name:user?.displayName,
                fee:camp?.campFee,
                transactionID:paymentIntent.id,
                transactionDate: new Date().toISOString(),
                campPaid: camp?.campName,
                campID: camp?.campID,
                perticipantID: camp?._id,
                status:"pending",
            }
            console.log(paymentInfo)

           const paymentRes= await axiosSecurely.post("/payments", paymentInfo)
           console.log(paymentRes.data);
            }
        }
        refetch();

        Swal.fire({
            title: `${camp?.campFee} : Payment Successfully Done`,
            icon: "success",
            timer:2500,
          });

          navigate("/dashboard/paymentHistory")



    }



    return (
        <div>
            <form onSubmit={handleSubmit} className="border-4 bg-sky-100 p-5">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret}
                    className="btn btn-sm bg-secondary mt-5">
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionID && <p className="bg-secondary text-white font-semibold">Transaction ID: {transactionID}</p>}
            </form>
        </div>
    );
};

export default CheckOutForm;