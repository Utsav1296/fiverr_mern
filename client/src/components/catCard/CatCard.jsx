import React from 'react'
import { Link } from 'react-router-dom'
import '../../data.js'
import './CatCard.scss'

const CatCard = ({ item }) => {
   return (
      <Link to="gigs?search=">
         <div className="catCard ">
            <img src={item.img} alt="" />
            <span className="desc hero-text">{item.desc}</span>
            <span className="title hero-text">{item.title}</span>
            <div className="hero-container"></div>
         </div>
      </Link>
   )
}

export default CatCard