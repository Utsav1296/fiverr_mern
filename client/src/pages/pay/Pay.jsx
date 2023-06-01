import React, { useState, useEffect, useRef } from "react";
import "./Pay.scss";
import { useParams } from "react-router-dom"
import newRequest from "../../utils/newRequest"
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NBynkSIEpNEhtm90Hr7XQMQawUzUQiGswQDjwoLGsFRjNalPsccRdEG9BidfvxOAVHpGp4A5QwJInGcM5bBSx8a00FBUPrVzf");


const Pay = () => {
   const [clientSecret, setClientSecret] = useState("");
   const { id } = useParams()

   // using useRef to avoid multiple renders of useEffect to prevent multiple requests and creation of "Order" in database.
   // only works when useEffect doesn't need a cleanup
   const shouldExecute = useRef(true)

   const makeRequest = async () => {
      try {
         const data = await newRequest.post(`/orders/create-payment-intent/${id}`).then(res => res.data)
         console.log(data)
         setClientSecret(data.clientSecret)
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      if (shouldExecute.current) {
         shouldExecute.current = false
         makeRequest()
      }
   }, []);


   const appearance = {
      theme: 'stripe',
   };
   const options = {
      clientSecret,
      appearance,
   };

   return (
      <div className="pay">
         <h3>Hi there</h3>
         {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <CheckoutForm />
            </Elements>
         )}
      </div>
   );
}

export default Pay