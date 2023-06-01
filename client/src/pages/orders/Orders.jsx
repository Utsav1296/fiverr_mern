import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import { formatCurrency } from "../../utils/formatCurrency";
import "./Orders.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
   const currentUser = JSON.parse(localStorage.getItem('currentUser'))


   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)
   const [data, setData] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      const cancelToken = axios.CancelToken.source()

      try {
         newRequest.get("/orders", { cancelToken: cancelToken.token }).then(res => {
            setIsLoading(false)
            setData(res.data)
            console.table(res.data)
            return res.data
         })
      } catch (error) {
         if (axios.isCancel(err)) {
            console.log("Request canceled")
            setIsLoading(false)
            setError(error)
         }
         console.log(error)
         setIsLoading(false)
         setError(error)
         return error
      }

      return () => {
         cancelToken.cancel()
      }

   }, [])

   const handleContact = async (sellerId, buyerId) => {
      const id = sellerId + buyerId

      try {
         const data = await newRequest.get(`/conversations/single/${id}`).then(res => res.data)

         navigate(`/messages/${data.id}`)
         console.log("data :", data)
      } catch (error) {
         if (error.response.status == 404) {
            const data = await newRequest.post('/conversations/', { to: currentUser.isSeller ? buyerId : sellerId }).then(res => res.data)
         }
         console.log(error)
         navigate(`/message/${data.id}`)
      }

   }

   error && console.log(error.message)

   // if (!isLoading && !error) console.log(data.length)

   return (
      <div className="orders">

         {isLoading ? "Loading" : error ? (<div className="fallback">Something went wrong...</div>) : (data.length == 0) ? (<div className="fallback">No data found for this user...</div>) : (<div className="container">
            <div className="title">
               <h3>Orders</h3>
            </div>
            <table>
               <tbody>
                  <tr>
                     <th>Image</th>
                     <th>Title</th>
                     <th>Price</th>
                     {<th>{currentUser.isSeller ? "Buyer" : "Seller"} ID</th>}
                     <th>Contact</th>
                  </tr>

                  {data.map(({ _id, img, title, price, buyerId, sellerId }) => (
                     <tr key={_id}>
                        <td>
                           <img
                              className="image"
                              src={img}
                              alt=""
                           />
                        </td>
                        <td>{title}</td>
                        <td>{formatCurrency(price)}</td>
                        <td>{currentUser.isSeller ? buyerId : sellerId}</td>
                        <td>
                           <img className="message" src="./img/message.png" alt="" onClick={() => handleContact(sellerId, buyerId)} />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>)}
      </div>
   );
};


export default Orders;
