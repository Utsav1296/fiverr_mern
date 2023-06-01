import React, { useRef } from 'react'
import "./Review.scss"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Review = ({ review }) => {

   const yesRef = useRef(0)
   const noRef = useRef(0)

   // console.log(review)

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: [review.userId],
      queryFn: async () =>
         await newRequest.get(`/users/${review.userId}`).then(res => {
            return res.data;
         })
   })

   return (
      <div className="review">
         {isLoading ? "Loading..." : error ? "Something went wrong..." : (
            <>
               <div className="user">
                  <img
                     className="pp"
                     src={data?.img || "/noavatar.jpg"}
                     alt=""
                  />
                  <div className="info">
                     <span>{data?.username}</span>
                     <div className="country">
                        <img
                           src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                           alt=""
                        />
                        <span>{data?.country}</span>
                     </div>
                  </div>
               </div>
               <div className="stars">
                  {/* creating an empty array of size (review.star) and later filling with star images */}
                  {Array(review.star).fill().map((star, i) =>
                     <img src="/img/star.png" alt="" key={i} />
                  )}
                  <span>{review.star}</span>
               </div>
               <p>
                  {review.desc}
               </p>
               <div className="helpful">
                  <span>Helpful?</span>
                  <img src="/img/like.png" alt="" ref={yesRef} onClick={() => {
                     yesRef.current.style.backgroundColor = "hsl(206,100%,52%)"
                     noRef.current.style.backgroundColor = "hsl(200,53%,100%)"
                  }
                  } />
                  <span>Yes</span>
                  <img src="/img/dislike.png" alt="" ref={noRef} onClick={() => {
                     noRef.current.style.backgroundColor = "hsla(0, 83%, 55%, 0.692)"
                     yesRef.current.style.backgroundColor = "hsl(200,53%,100%)"
                  }
                  } />
                  <span>No</span>
               </div>
            </>
         )}

      </div>
   )
}

export default Review