import React from "react";
import { Link } from "react-router-dom";
import { isError, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import getCurrentUser from "../../utils/getCurrentUser";

import "./MyGigs.scss";

function MyGigs() {
   const currentUser = getCurrentUser()
   const id = currentUser._id
   const queryClient = useQueryClient()

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['myGigs'],
      queryFn: async () =>
         await newRequest.get(`/gigs?userId=${id}`).then(res => {
            // console.log(res.data)
            // console.log(res.data.length)
            return res.data;
         })
   })

   // Mutations
   const mutation = useMutation({
      mutationFn: (id) => {
         return newRequest.delete(`/gigs/${id}`)
      },
      onSuccess: () => {
         // ✅ refetch the reviews list
         queryClient.invalidateQueries(['myGigs'])
      },
   })

   const deleteGig = () => {
      mutation.mutate()
   }

   return (
      <div className="myGigs">
         {isLoading ? "loading..." : error ? "Something went wrong..." :
            (<div className="container">
               <div className="title">
                  <h3>Gigs</h3>
                  {currentUser.isSeller && (
                     <Link to="/add">
                        <button type="button" className="btn">Add New Gig</button>
                     </Link>
                  )}
               </div>
               <table>
                  <thead>
                     <tr className="greyHeading">
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Sales</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map(gig =>
                     (<tr key={gig._id}>
                        <td>
                           <img
                              className="image"
                              src={gig.cover || "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                              alt=""
                           />
                        </td>
                        <td>{gig.title}</td>
                        <td>{gig.price}</td>
                        <td>{gig.sales}</td>
                        <td>
                           <img className="delete" src="./img/delete.png" alt="" onClick={() => deleteGig(gig._id)} />
                        </td>
                     </tr>))
                     }
                  </tbody>
               </table>
            </div>)
         }
      </div>
   )
}

export default MyGigs;
