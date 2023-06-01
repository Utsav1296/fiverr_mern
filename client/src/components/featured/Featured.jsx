import React, { useState } from 'react'
import './Featured.scss'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'

const Featured = () => {
   const [input, setInput] = useState("")

   const navigate = useNavigate()

   const handleSubmit = () => {
      console.log(input)
      navigate(`/gigs?search=${input}`)
   }

   return (
      <div className='featured'>
         <div className="container">
            {/* left  */}
            <div className="left">
               <h1>Find the perfect <i>freelance</i> <br /> services for your business</h1>
               {/* search  */}
               <div className="search">
                  <AiOutlineSearch className='icon' />
                  <input type="text" placeholder='Try "building mobile app"' onChange={(e) => setInput(e.target.value)} />
                  <button type='button' onClick={handleSubmit}>Search</button>
               </div>
               {/* popular category  */}
               <div className="popular">
                  <span>Popular:</span>
                  <button>Web Design</button>
                  <button>WordPress</button>
                  <button>Logo Design</button>
                  <button>AI Services</button>
               </div>
            </div>
            {/* right  */}
            <div className="right">
               <img src="./img/man.png" alt="" />
            </div>
         </div>
      </div>
   )
}

export default Featured