import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import './Navbar.scss'
import newRequest from '../../utils/newRequest'

const Navbar = () => {
   const [active, setActive] = useState(false)
   const [toggle, setToggle] = useState(false)
   const [open, setOpen] = useState(false)
   const { pathname } = useLocation()
   const navigate = useNavigate()

   const isActive = () => {
      (window.scrollY > 0) ? setActive(true) : setActive(false)
   }


   const openHandler = () => {
      if (!toggle) {
         open ? setOpen(false) : setOpen(true)
      } else {
         setToggle(false)
         open ? setOpen(false) : setOpen(true)
      }
   }

   const toggleHandler = () => {
      if (!open) {
         setToggle(true)
      } else {
         setOpen(false)
         setToggle(true)
      }
   }

   const logoutHandler = async () => {
      try {
         await newRequest.post("/auth/logout")
         localStorage.setItem("currentUser", null)
         navigate("/")
      } catch (error) {
         console.log("🚀 ~ file: Navbar.jsx:40 ~ logoutHandler ~ error:", error.response)
      }
   }

   useEffect(() => {
      window.addEventListener('scroll', isActive)
      return () => {
         window.removeEventListener('scroll', isActive)
      }
   }, [])

   const currentUser = JSON.parse(localStorage.getItem("currentUser"))


   return (
      <div className={(active || (pathname !== "/")) ? "navbar active" : "navbar"}>
         <div className="container">
            {/* logo */}
            <div className="logo">
               <Link to='/' className='link'>
                  <span className='text'>fiverr</span>
               </Link>
               <span className='dot'>.</span>
            </div>
            {/* links */}
            <div className="links">
               <span>Fiverr Business</span>
               <span>Explore</span>
               <span>English</span>
               {!currentUser && (<Link to="/login" className='link'>Sign in</Link>)}
               {!currentUser?.isSeller && (<Link className='link' to="/register"> Become a Seller</Link>)}
               {!currentUser && (<button className="btn" onClick={() => navigate("/register")}>Join</button>)}

               {currentUser && (
                  <div className="user" onClick={openHandler}>
                     <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                     <span>{currentUser.username}</span>
                     {open && (<div className="options">
                        {
                           currentUser?.isSeller && (
                              <>
                                 <Link to='mygigs' className='link'>Gigs</Link>
                                 <Link to='add' className='link'>Add New Gig</Link>
                              </>
                           )
                        }
                        <Link to='orders' className='link'>Orders</Link>
                        <Link to='messages' className='link'>Messages</Link>
                        <Link className='link' onClick={logoutHandler}>Logout</Link>
                     </div>)}
                  </div>
               )}

               {/* toggler on small screen */}
               <div className="toggler">
                  {!toggle && <HiMenuAlt4 onClick={toggleHandler} />}

                  {(toggle) && (
                     <div className='togglerOptions' onClick={() => setToggle(false)} >
                        <HiX />

                        <Link to='/' className="options">
                           <div>Fiverr Business</div>
                           <div>Explore</div>
                           <div>English</div>
                           {!currentUser && (<Link to="/login" className='link'>Sign in</Link>)}
                           {!currentUser?.isSeller && (<div>Become a Seller</div>)}
                           {!currentUser && (<button className="btn" onClick={() => navigate("/register")}>Join</button>)}
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </div>
         {/* on scroll items */}
         {
            ((active || (window.location.pathname !== "/")) && window.innerWidth >= 600) && (<>
               <hr />
               <div className="menu">
                  <span>Graphics & Design
                  </span>
                  <span>Video & Animation</span>
                  {/* <span>Writing & Translation</span> */}
                  <span>AI Services</span>
                  <span>Digital Marketing</span>
                  {/* <span>Music & Audio</span> */}
                  <span>Programming & Tech</span>
                  <span>Business</span>
                  {/* <span>Lifestyle</span> */}
               </div>
               <hr />
            </>)
         }
      </div >
   )
}

export default Navbar