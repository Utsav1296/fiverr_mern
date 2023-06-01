import React from 'react'
import "./Home.scss"
import { Featured, TrustedBy, Slide, CatCard, ProjectCard } from '../../components'
import video from '../../assets/video.mp4'

import { cards, projects } from '../../data';

const Home = () => {


   const noOfSlides = () => {
      if (window.innerWidth > 1192) {
         return 5
      }
      else if (892 < window.innerWidth <= 1192) {
         return 4
      } else if (492 < window.innerWidth <= 892) {
         return 3
      } else {
         return 2
      }
   }

   return (
      <div className='home'>
         <Featured />
         <TrustedBy />
         <Slide slidesToShow={noOfSlides()} arrowScroll={2} enterMode={true} centerPadding={50} autoplay={true} pauseOnHover={true} dots={true} >
            {
               cards.map((card, i) => (
                  <>
                     <CatCard key={card.id} item={card} />
                  </>
               ))
            }
         </Slide>

         {/* features  */}
         <div className="features">
            <div className="item">
               <h2>A whole world of freelance talent at your fingertips</h2>
               <div className="title">
                  <img src="./img/check.png" alt="" />
                  The best for every budget
               </div>
               <p>
                  Find high-quality services at every price point. No hourly rates, just project-based pricing.
               </p>
               <div className="title">
                  <img src="./img/check.png" alt="" />
                  Quality work done quickly
               </div>
               <p>
                  Find the right freelancer to begin working on your project within minutes.
               </p>
               <div className="title">
                  <img src="./img/check.png" alt="" />
                  Protected payments, every time
               </div>
               <p>
                  Always know what you'll pay upfront. Your payment isn't released until you approve the work.
               </p>
               <div className="title">
                  <img src="./img/check.png" alt="" />
                  24/7 support
               </div>
               <p>
                  Find 24/7 support for services at every price point. No hourly rates pricing.
               </p>
            </div>
            <div className="item">
               <div className="itemCenter">
                  <video src={video} controls />
               </div>
            </div>
         </div>


         {/* explorer */}
         <div className="explore">
            <div className="item">
               <h2>fiverr <i>business</i></h2>
               <h4>A business solution designed for <i>teams</i>
               </h4>
               <p>
                  Upgrade to a curated experience packed with tools and benefits,
                  dedicated to businesses
               </p>
               <div className="title">
                  <img src="./img/check.png" alt="" />
                  <p>Connect to freelancers with proven business experience</p>
               </div>

               <div className="title">
                  <img src="./img/check.png" alt="" />
                  <p> Get matched with the perfect talent by a customer success manager</p>
               </div>

               <div className="title">
                  <img src="./img/check.png" alt="" />
                  <p> Manage teamwork and boost productivity with one powerful workspace</p>
               </div>
               <button type='button'>Explore Fiverr Business</button>

            </div>
            <div className="item">
               <div className="itemCenter">
                  <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png" alt="" />
               </div>
            </div>
         </div>


         {/* another slider  */}
         <Slide slidesToShow={window.innerWidth < 992 ? 2.3 : 4} arrowScroll={2} enterMode={true} centerPadding={50} autoplay={true} pauseOnHover={true} dots={true} >
            {
               projects.map((project, i) => (
                  <>
                     <ProjectCard key={project.id} item={project} />
                  </>
               ))
            }
         </Slide>
      </div >
   )
}

export default Home