import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import newRequest from '../../utils/newRequest'
import "./Message.scss"

const Message = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"))

   const { id } = useParams()
   const queryClient = useQueryClient();

   const { isLoading, error, data } = useQuery({
      queryKey: ["messages"],
      queryFn: () =>
         newRequest.get(`/messages/${id}`).then((res) => {
            console.log(res.data)
            return res.data;
         }),
   });

   const mutation = useMutation({
      mutationFn: (message) => {
         return newRequest.post(`messages/${id}`, message);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["messages"])
      },
   });

   const handleSubmit = (e) => {
      e.preventDefault()
      mutation.mutate(
         {
            conversationId: id,
            desc: e.target[0].value,
         }
      );
      e.target[0].value = ""
   };



   return (
      <div className="message">
         {isLoading ? "Loading..." : error ? (<div className="fallback">Something went wrong...</div>) : (<div className="container">
            <span className="breadcrumbs">
               <Link to="/messages">Messages</Link>  &gt; John Doe  &gt;
            </span>
            <div className="messages">
               {data.map(message => (<div className={(message.userId === currentUser._id) ? "owner item" : "item"} key={message.id}>
                  <img
                     src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                     alt=""
                  />
                  <p>
                     {message.desc}
                  </p>
               </div>))}

            </div>
            <hr />
            <form className="write" onSubmit={handleSubmit}>
               <textarea type="text" placeholder="write a message" />
               <button>Send</button>
            </form>
         </div>)}
         {/* <div className="item owner">
            <img
               src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item">
            <img
               src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item owner">
            <img
               src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item">
            <img
               src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item owner">
            <img
               src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item">
            <img
               src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item owner">
            <img
               src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item">
            <img
               src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item owner">
            <img
               src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item">
            <img
               src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item">
            <img
               src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item owner">
            <img
               src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item owner">
            <img
               src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div>
         <div className="item">
            <img
               src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
               alt=""
            />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
               mollitia perspiciatis officiis voluptate? Sequi quae officia
               possimus, iusto labore alias mollitia eveniet nemo placeat
               laboriosam nisi animi! Error, tenetur!
            </p>
         </div> */}
      </div>
   );
};

export default Message