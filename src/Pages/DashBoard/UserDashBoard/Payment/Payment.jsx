import { useQuery } from "@tanstack/react-query";
import SectionTitles from "../../../../Components/SectionTitles";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';

const Payment = () => {
    const { id: campId } = useParams()
    const axiosSecurely = useAxiosSecure()
    const { data: camp = {} } = useQuery({
        queryKey: ["queryById", campId],
        queryFn: async () => {
            const result = await axiosSecurely.get(`participants/payment/${campId}`)
            return (result.data)

        }
    })


    //TO DO
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
    return (
        <div>
            <SectionTitles subHeading={"==Complete Payment for Camp Booking=="} heading={'Welcome to Stripe Payment System'}></SectionTitles>

            <div className="w-10/12 lg:w-8/12 mx-auto">
                <h2>Payment ${camp.campFee} for {camp.campName}</h2>
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;