import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { INITIAL_STATE, gigReducer } from '../../reducers/gigReducer'
import upload from '../../utils/upload'
import "./Add.scss"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Add = () => {

   const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)
   const [coverFile, setCoverFile] = useState(undefined)
   const [files, setFiles] = useState([])
   const [isUploading, setIsUploading] = useState(false)
   const navigate = useNavigate()
   const queryClient = useQueryClient();

   const handleChange = (e) => {
      dispatch({
         type: "CHANGE_INPUT",
         payload: {
            name: e.target.name,
            value: e.target.value,
         },
      })
   }

   const handleFeature = (e) => {
      e.preventDefault()
      dispatch({
         type: "ADD_FEATURES",
         payload: e.target[0].value,
      })
      e.target[0].value = ""
   }

   const handleUpload = async (e) => {
      setIsUploading(true)

      try {
         const cover = await upload(coverFile)
         console.log(cover)

         // here files is a fileList of images,to convert into an array type,we used---
         // [...files] ==> i.e array from all the data of fileList named files
         // Alternative ==> Array.from(files)
         const images = await Promise.all(
            [...files].map(async (file) => {
               const url = await upload(file)
               return url;
            })
         )
         console.log(images)
         setIsUploading(false)

         dispatch({
            type: "ADD_IMAGES",
            payload: {
               cover: cover,
               images: images,
            },
         })

         e.target.value = ""
      } catch (error) {
         console.log(error)
      }

   }


   const mutation = useMutation({
      queryKey: ['myGigs'],
      mutationFn: (newGig) => {
         return newRequest.post(`/gigs`, newGig);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["myGigs"])
      },
   });

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(state)
      mutation.mutate(
         state
      );
      navigate("/mygigs")
   };



   return (
      <div className="add">
         <div className="container">
            <h3>Add New Gig</h3>
            <div className="sections">
               <div className="info">
                  <label htmlFor="">Title</label>
                  <input
                     type="text"
                     placeholder="e.g. I will do something I'm really good at"
                     name="title"
                     onChange={handleChange}
                  />

                  <label htmlFor="">Category</label>
                  <select name="category" id="cats" onChange={handleChange}>
                     <option value="design">Design</option>
                     <option value="web">Web Development</option>
                     <option value="animation">Animation</option>
                     <option value="music">Music</option>
                  </select>

                  <div className="images">
                     <div className="imagesInputs">
                        <label htmlFor="">Cover Image</label>
                        <input type="file" onChange={e => setCoverFile(e.target.files[0])} />

                        <label htmlFor="">Upload Images</label>
                        <input type="file" multiple onChange={e => setFiles(e.target.files)} />
                     </div>
                     <button onClick={handleUpload}>{isUploading ? "Uploading" : "Upload"}</button>
                  </div>

                  <label htmlFor="">Description</label>
                  <textarea
                     name="desc"
                     onChange={handleChange}
                     id=""
                     placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16">
                  </textarea>
               </div>

               <div className="details">
                  <label htmlFor="">Service Title</label>
                  <input type="text" placeholder="e.g. One-page web design" name="shortTitle"
                     onChange={handleChange}
                  />

                  <label htmlFor="">Short Description</label>
                  <textarea name="shortDesc" onChange={handleChange} id="" placeholder="Short description of your service" cols="30" rows="10"></textarea>

                  <label htmlFor="">Delivery Time (e.g. 3 days)</label>
                  <input type="number" name="deliveryTime"
                     onChange={handleChange}
                  />

                  <label htmlFor="">Revision Number</label>
                  <input type="number" name="revisionNumber"
                     onChange={handleChange}
                  />

                  <label htmlFor="">Add Features</label>
                  <form action="" onSubmit={handleFeature} className='addFeature'>
                     <input type="text" placeholder="e.g. page design" />
                     <button type="submit">add</button>
                  </form>


                  <div className="addedFeatures">
                     {state?.features?.map((ftr, i) => (
                        <div className="item" key={`f-${i}`} ><button onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: ftr })}>{ftr} <span>X</span></button></div>
                     ))}
                  </div>


                  <label htmlFor="">Price</label>
                  <input type="number" name="price" onChange={handleChange} />
               </div>
            </div>
            <button type='button' onClick={handleSubmit}>Create</button>
         </div>
      </div>
   )
}

export default Add