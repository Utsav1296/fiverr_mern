import Slider from 'infinite-react-carousel';
import './Slide.scss'
import CatCard from '../catCard/CatCard';

import { Children, useEffect } from 'react';

const Slide = ({ children, arrowScroll, enterMode, centerPadding, autoplay, pauseOnHover, dots, slidesToShow }) => {


   // console.log(noOfSlides())


   return (
      <div className='slide'>
         <div className="container">
            <Slider slidesToShow={slidesToShow} enterMode={enterMode} centerPadding={centerPadding} autoplay={autoplay} pauseOnHover={pauseOnHover} dots={dots} arrowScroll={arrowScroll}>
               {children}
            </Slider>

         </div>
      </div >
   )
}

export default Slide