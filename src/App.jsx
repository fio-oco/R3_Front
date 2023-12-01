import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './services/Header'
import Footer from './services/Footer'
import Landing from './services/Landing'
import Login from './services/Login'
import Register from './services/Register'
import UserPage from './services/UserPage'
import MyClimbs from './services/MyClimbs'
import NewClimb from './services/NewClimb'
import Gallery from './services/Gallery'
import EditClimb from './services/EditClimb'


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
    <>
    <Route path="/" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path= "/userpage" element={<UserPage/>}/>
    <Route path="/myclimbs" element={<MyClimbs/>}/>
    <Route path="/newclimb" element={<NewClimb/>}/>
    <Route path= "/gallery" element={<Gallery/>}/>
    <Route path="/editclimb" element={<EditClimb/>}/>

    </>
    </Routes>
    <Footer/>
    </BrowserRouter>
   </>
  )
}

export default App
