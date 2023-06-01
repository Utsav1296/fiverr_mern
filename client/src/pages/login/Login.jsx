import React, { useState } from 'react'
import "./Login.scss"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState(null)
   const [passwordType, setPasswordType] = useState("password")

   const navigate = useNavigate()


   const passwordTypeHandler = () => {
      setPasswordType(
         passwordType == "text" ? "password" : "text"
      )
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const res = await newRequest.post(`/auth/login`, {
            username,
            password
         })
         setError(null)
         localStorage.setItem("currentUser", JSON.stringify(res.data))
         navigate("/")
         // console.log("🚀 ~ file: Login.jsx:17 ~ handleSubmit ~ res:", res.data)


      } catch (err) {
         setError(err.response.data)
         // console.log("🚀 ~ file: Login.jsx:20 ~ handleSubmit ~ error:", err.response)
      }

   }

   return (
      <div className='login' >
         <div className="design">
            <div className="square">
               {/* <div className="design-square"></div> */}
               <div className="design-square"></div>
               <div className="design-square"></div>
               <div className="design-square"></div>
            </div>
            <div className="circle">
               {/* <div className="design-circle"></div> */}
               <div className="design-circle"></div>
               <div className="design-circle"></div>
               <div className="design-circle"></div>
            </div>
         </div>
         <div className="form">
            <form autoComplete="off" onSubmit={handleSubmit}>
               <h4>Sign in</h4>
               <label htmlFor="">Username</label>
               <input type="text" name="username" placeholder='Utsav' onChange={e => setUsername(e.target.value)} />

               <label htmlFor="">Password</label>
               <div className="passwordBlock">

                  <div className='passwordInput'>
                     <input type={passwordType} name="password" placeholder='xyz123@abc' onChange={e => setPassword(e.target.value)} id="password" />
                  </div>
                  {passwordType === 'password' ? (<AiFillEye className="passwordToggler" onClick={passwordTypeHandler} />) : (<AiFillEyeInvisible className="passwordToggler" onClick={passwordTypeHandler} />)}
               </div>
               <button type="submit">Login</button>

               {error && (<span>{error}</span>)}
            </form>
         </div>
      </div>
   )
}

export default Login