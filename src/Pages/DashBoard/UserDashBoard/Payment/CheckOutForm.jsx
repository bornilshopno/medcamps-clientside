import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const CheckOutForm = () => {
    const stripe=useStripe();
    const elements=useElements();
    const [error, setError]=useState("")
const handleSubmit = async(e) => {
    e.preventDefault();
    setError("")
    if(!stripe || !elements){  return  }
    const card=elements.getElement(CardElement);
    if(card===null){ return }
    const {error, paymentMethod}= await stripe.createPaymentMethod({
        type: "card",
        card
    })
    if(error){
        console.log("paymentError", error);
        setError(error.message)
    }
    else{
        console.log("paymentMethod", paymentMethod);
        setError("")
    }



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
                <button type="submit" disabled={!stripe}
                className="btn btn-sm bg-secondary mt-5">
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
            </form>
        </div>
    );
};

export default CheckOutForm;