import React from 'react'
import './ProjectCard.scss'

const ProjectCard = ({ item }) => {
   return (
      <div className="projectCard">
         <img src={item.img} alt="" />
         <div className="box">
            <img src={item.pp} alt="" className='profile_pic' />
            <div className="title">
               <span>{item.cat}</span>
               <span>{item.username}</span>
            </div>
         </div>
      </div>
   )
}

export default ProjectCard