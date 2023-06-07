import React, { useState, useEffect, useRef } from "react";
import "./Pay.scss";
import { Link, useParams } from "react-router-dom"
import newRequest from "../../utils/newRequest"
import getCurrentUser from "../../utils/getCurrentUser";
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
         {getCurrentUser() === null ? <div className="fallback">
            <h3>You need to register and login first in order to do payment </h3>
            <p>In case you want an Username and password for testing purpose, use the details mentioned below :</p>
            <div className="testData">
               <p><b>Buyer </b> <br /> <em>Username </em>  : <strong> Emily</strong> <br /> <em>Password </em>  :  <strong>pass@123</strong> </p>
               <p><b>Seller </b> <br /> <em>Username </em>  : <strong>Laura smith </strong><br /> <em>Password </em>  : <strong>pass@123</strong> </p>
            </div>
            <div className="link">
               <Link to="/register"><b>Register</b></Link><br />
               <Link to="/login"> <b> Login</b></Link>
            </div>
         </div> :
            (<div>
               <h3>Powered by Stripe payment api :</h3>
               {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                     <CheckoutForm />
                  </Elements>
               )}
            </div>)}
      </div>
   );
}

export default Pay