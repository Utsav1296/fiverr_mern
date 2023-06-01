import React from "react";
import { Link } from "react-router-dom";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest.js"
import moment from "moment"
import "./Messages.scss";
import conversationModel from "../../../../server/models/conversation.model.js";

const Messages = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"))
   const queryClient = useQueryClient();

   const { isLoading, error, data } = useQuery({
      queryKey: ["conversations"],
      queryFn: () =>
         newRequest.get(`/conversations`).then((res) => {
            return res.data;
         }),
   });

   const mutation = useMutation({
      mutationFn: (id) => {
         return newRequest.put(`conversations/${id}`);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["conversations"])
      },
   });

   const handleRead = (id) => {
      console.log("hoo rha hai")
      mutation.mutate(id);
   };

   error && console.log(error)
   return (
      <div className="messages">
         {isLoading ? "Loading..." : error ? (<div className="fallback">Something went wrong...</div>) : (data.length == 0) ? (<div className="fallback">No data found for this user...</div>) : (<div className="container" >
            <div className="title">
               <h4>Messages</h4>
            </div>
            <table>
               <thead>
                  <tr>
                     <th>{currentUser.isSeller ? "Buyer" : "Seller"} ID</th>
                     <th>Last Message</th>
                     <th>Date</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {data?.map(con =>
                     <>
                        <tr className={((currentUser.isSeller && !con.readBySeller) || (!currentUser.isSeller && !con.readByBuyer))
                           ?
                           "active" : ""
                        } key={con.id}>
                           <td>{currentUser.isSeller ? con.buyerId : con.sellerId}</td>
                           <td>
                              <Link to={`/messages/${con.id}`} className="link">
                                 {con?.lastMessage?.substring(0, 100)}...
                              </Link>
                           </td>
                           <td>{moment(con.updatedAt).fromNow()}</td>
                           <td>
                              {((currentUser.isSeller && !con.readBySeller) || (!currentUser.isSeller && !con.readByBuyer))
                                 &&
                                 (<button onClick={() => handleRead(con.id)}>Mark as Read</button>)
                              }
                           </td>
                        </tr>
                     </>
                  )}
               </tbody>
            </table>
         </div>)}
      </div>
   );
};

export default Messages;
