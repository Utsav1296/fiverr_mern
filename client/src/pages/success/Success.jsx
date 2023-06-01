import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const Success = () => {
   const shouldExecute = useRef(true)
   const navigate = useNavigate()
   const { search } = useLocation()
   const params = new URLSearchParams(search)

   const payment_intent = params.get("payment_intent")

   const makeRequest = async () => {
      try {
         await newRequest.put("/orders", { payment_intent })
         setTimeout(() => {
            navigate("/orders")
         }, 5000);

      } catch (error) {
         console.log(error)
      }
   }

   // using useRef to avoid multiple renders of useEffect to prevent multiple requests and creation of "Order" in database.
   // only works when useEffect doesn't need a cleanup
   useEffect(() => {
      if (shouldExecute.current) {
         shouldExecute.current = false
         makeRequest()
      }
   }, [])


   return (
      <div className="container success">
         <h2>You are being redirected to the orders page.Thank you for your submission!😎</h2>
         <h3>Please do not close this page..!</h3>
      </div>
   )
}

export default Success