import React, { useEffect } from 'react'
import Slider from 'infinite-react-carousel';
import { Reviews } from '../../components';
import "./Gig.scss"
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const star = (starCount) => {
   let arr = [<img src="/img/star.png" alt="" />]
   var str = [];
   for (let i = 0; i < starCount; i++) {
      str.push(arr[0]);
   }
   // console.log("🚀 ~ file: Gig.jsx:13 ~ star ~ str:", str)
   return (<>{str}</>)
}
const Gig = () => {
   const { id } = useParams()

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: [id],
      queryFn: () =>
         newRequest.get(`/gigs/single/${id}`).then(res => {
            // console.log(res.data)
            return res.data;
         })
   })

   //dependent query---
   const { isLoading: isUserLoading, error: isUserError, data: userData, refetch: userRefetch } = useQuery({
      queryKey: ["user"],
      queryFn: () =>
         newRequest.get(`/users/${data?.userId}`).then(res => {
            // console.log(res.data)
            return res.data;
         }),
      // The query will not execute until the userId exists
      enabled: !!data?.userId
   })

   const starValue = !isNaN(data?.totalStars / data?.StarNumber) && (data?.totalStars / data?.StarNumber).toFixed(1)
   const starCount = Math.round(starValue)



   return (
      <div className="gig">
         <h5 className="breadcrumbs">Liverr &gt; Graphics & Design &gt;</h5>
         <div className="container">
            {isUserLoading ? "Loading..." : isUserError ? "Error..." : (<div className="left">
               <header>{data?.shortDesc}</header>
               {userData && (<div className="user">
                  <img
                     className="pp"
                     src={userData?.img || "/img/noavatar.jpg"}
                     alt=""
                  />
                  <span>{userData.username}</span>

                  <div className="stars">
                     {star(starCount)}
                     {/* <img src="/img/star.png" alt="" />
                     <img src="/img/star.png" alt="" />
                     <img src="/img/star.png" alt="" />
                     <img src="/img/star.png" alt="" />
                     <img src="/img/star.png" alt="" /> */}
                     <span>{starValue}</span>
                  </div>
               </div>)}
               {data && <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                  {data?.images.map(imgUrl => (
                     <img
                        src={imgUrl}
                        alt=""
                     />
                  ))}
                  {/* <img
                     src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                     alt=""
                  />
                  <img
                     src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
                     alt=""
                  />
                  <img
                     src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                     alt=""
                  /> */}
               </Slider>}
               <h5>About This Gig</h5>
               <p>{data?.desc}</p>
               <div className="seller">
                  <h5>About The Seller</h5>
                  {userData && (<div className="user">
                     <img
                        // src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        src={userData?.img || "/img/noavatar.jpg"}
                        alt=""
                     />
                     <div className="info">
                        <span>{userData.username}</span>
                        <div className="stars">
                           {star(starCount)}
                           <span>{starValue}</span>
                        </div>
                        <button>Contact Me</button>
                     </div>
                  </div>)}
                  <div className="box">
                     {userData && (<div className="items">
                        <div className="item">
                           <span className="title">From</span>
                           <span className="desc">{userData.country}</span>
                        </div>
                        <div className="item">
                           <span className="title">Member since</span>
                           <span className="desc">Aug 2022</span>
                        </div>
                        <div className="item">
                           <span className="title">Avg. response time</span>
                           <span className="desc">4 hours</span>
                        </div>
                        <div className="item">
                           <span className="title">Last delivery</span>
                           <span className="desc">{data?.deliveryTime} day</span>
                        </div>
                        <div className="item">
                           <span className="title">Languages</span>
                           <span className="desc">English</span>
                        </div>
                     </div>)}
                     <hr />
                     <p>
                        {data?.shortDesc}
                     </p>
                  </div>
               </div>
               <Reviews gigId={id} />
            </div>)}
            {isLoading ? "Loading..." : error ? "Error..." : (<div className="right">
               <div className="price">
                  <h3>{data.title}</h3>
                  <h2>${data.price}</h2>
               </div>
               <p>
                  {data?.shortDesc}
               </p>
               <div className="details">
                  <div className="item">
                     <img src="/img/clock.png" alt="" />
                     <span>2 Days Delivery</span>
                  </div>
                  <div className="item">
                     <img src="/img/recycle.png" alt="" />
                     <span>3 Revisions</span>
                  </div>
               </div>
               <div className="features">
                  {data.features.map(feature => (
                     <div className="item">
                        <img src="/img/greencheck.png" alt="" />
                        <span>{feature}</span>
                     </div>
                  ))}
               </div>
               <Link to={`/pay/${id}`}>
                  <button>Continue</button>
               </Link>
            </div>)}
         </div>
      </div>
   )
}

export default Gig