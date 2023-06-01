import React, { useEffect, useRef, useState } from 'react'
import "./Gigs.scss"
import { GigCard } from '../../components'
import { gigs } from '../../data.js'
import { useQuery } from "@tanstack/react-query"
import newRequest from '../../utils/newRequest'
import { useLocation } from 'react-router-dom'

const Gigs = () => {
   const [sort, setSort] = useState("sales");
   const [open, setOpen] = useState(false);
   const minRef = useRef();
   const maxRef = useRef();

   const { search } = useLocation()
   console.log(search)

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['gigs'],
      queryFn: () =>
         newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then(res => {
            // console.log("🚀 ~ file: Gigs.jsx:21 ~ Gigs ~ res:", res.data)
            return res.data;
         })
   })



   const reSort = (type) => {
      setSort(type);
      setOpen(false);
   };

   useEffect(() => {
      refetch()
   }, [sort])


   const apply = () => {
      refetch()
   }


   return (
      <div className="gigs" >
         <div className="container">
            <h5 className="breadcrums">Fiverr &gt; Graphics and Design 	&gt; </h5>
            <h3>AI Artists</h3>
            <span >Explore the boundaries of art and technology with Fiverr's AI artists</span>

            {/* menu  */}
            <div className="menu">
               <div className="left">
                  <span>Budget</span>
                  <input ref={minRef} type="number" placeholder="min" />
                  <input ref={maxRef} type="number" placeholder="max" />
                  <button onClick={apply}>Apply</button>
               </div>
               <div className="right">
                  <span className="sortBy">Sort by</span>
                  <span className="sortType">
                     {sort === "sales" ? "Best Selling" : "Newest"}
                  </span>
                  <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
                  {open && (
                     <div className="rightMenu">
                        {sort === "sales" ? (
                           <span onClick={() => reSort("createdAt")}>Newest</span>
                        ) : (
                           <span onClick={() => reSort("sales")}>Best Selling</span>
                        )}
                        <span onClick={() => reSort("sales")}>Popular</span>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div className='cards'>

            {isLoading ? "loading..." : error ? "Something went wrong..." : data.map(gig => <GigCard key={gig._id} item={gig} />)}
            {/* 
            {gigs.map(gig => (
               <GigCard key={gig.id} item={gig} />
            ))} */}
         </div>
      </div >
   )
}

export default Gigs