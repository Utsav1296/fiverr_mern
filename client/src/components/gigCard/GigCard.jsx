import React from 'react'
import './GigCard.scss'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const GigCard = ({ item }) => {

   const { isLoading, error, data } = useQuery({
      queryKey: [`${item.userId}`],
      queryFn: () =>
         newRequest.get(`/users/${item.userId}`).then(res => {
            // console.log(res.data)
            return res.data;
         })
   })


   const arr = item.desc.split(" ")

   let detail = ""
   for (let i = 0; i < Math.min(arr.length, 16); i++) {
      const element = arr[i];
      detail += `${arr[i]} `
   }
   return (
      <Link
         to={`/gigs/single/${item._id}`} >
         <div className='gigCard'>
            <img src={item.images[0]} alt="" />
            <div className="info">
               {isLoading ? "loading..." :
                  error ? `${error.message}` :
                     (<div className="user">
                        <img src={data.img || "/img/noavatar.jpg"} alt="" />
                        <span>{data.username}</span>
                     </div>)}
               <p>{detail}...</p>
               <div className="star">
                  <img src="./img/star.png" alt="" />
                  <span>{!isNaN(item.totalStars / item.StarNumber) && (item.totalStars / item.StarNumber).toFixed(1)}</span>
               </div>

            </div>
            <hr />
            <div className="detail">
               <img src="./img/heart.png" alt="" />
               <div className="price">
                  <span>STARTING AT</span>
                  <strong>${item.price}</strong>
                  <sup>99</sup>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default GigCard