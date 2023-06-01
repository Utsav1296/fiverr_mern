import React, { useEffect } from 'react'
import './Reviews.scss'
import newRequest from '../../utils/newRequest'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Review from '../review/Review'

const Reviews = ({ gigId, userId }) => {
   const queryClient = useQueryClient()

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['reviews'],
      queryFn: async () =>
         await newRequest.get(`/reviews/${gigId}`).then(res => {
            // console.log(res.data)
            // console.log(res.data.length)
            return res.data;
         })
   })

   // Mutations
   const mutation = useMutation({
      mutationFn: (review) => {
         return newRequest.post('/reviews', review)
      },
      onSuccess: () => {
         // ✅ refetch the reviews list
         queryClient.invalidateQueries(['reviews'])
      },
   })


   const handleSubmit = (e) => {
      e.preventDefault()
      const desc = e.target[0].value;
      const star = e.target[1].value;
      mutation.mutate({ gigId, desc, star })
   }

   return (
      <div className="reviews">
         <h4>Reviews</h4>
         {isLoading ? "Loading..." : error ? "Something went wrong at Reviews.jsx" : data?.map((review) => <Review key={review._id} review={review} />)}


         {/* adding new review  */}
         <hr />
         <div className="add">
            <h4>Add a review</h4>
            <form action="" className='addForm' onSubmit={handleSubmit}>
               {/* <input type="text" name="write your own review" /> */}
               <textarea name="text" id="" cols="50" rows="5"></textarea>
               <div className="contain">
                  <div className="stars">

                     <label htmlFor="stars">⭐ </label>
                     <select name="starList" >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                     </select>
                  </div>
                  <div className="formButton">
                     <button type="reset" value="Reset" className='btn'>Reset</button>
                     <button type="submit" value="Submit" className='btn'>Submit</button>
                  </div>
               </div>

            </form>


         </div>

         <hr />
      </div>
   )
}

export default Reviews