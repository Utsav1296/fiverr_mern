import React from "react"
import "./App.scss"
import { Footer, Navbar } from "./components"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { Home, Message, Messages, MyGigs, Orders, Login, Register, Add, Gig, Gigs, Pay, Success } from './pages'
import { Route, Outlet, RouterProvider, createBrowserRouter, Routes, useNavigate } from "react-router-dom";


function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const user = fetchUser()

  //   if (!user) navigate('/login')
  // }, [])

  const queryClient = new QueryClient()

  const Layout = () => (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  )

  // const router = createBrowserRouter([
  //   {
  //     path: "/*",
  //     element: <Layout />
  //   },
  // ]);



  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='messages' element={<Messages />} />
        <Route path='mygigs' element={<MyGigs />} />
        <Route path='messages/:id' element={<Message />} />
        <Route path='add' element={<Add />} />
        <Route path='gigs' element={<Gigs />} />
        <Route path='gigs/single/:id' element={<Gig />} />
        <Route path='pay/:id' element={<Pay />} />
        <Route path='success' element={<Success />} />
        <Route path='orders' element={<Orders />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
