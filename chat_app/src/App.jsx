import { useState } from 'react'
import './App.css'
import SignPage from './pages/SignPage/SignPage'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import OTPInput from './components/reusable/OTPInput'
import { useSelector } from 'react-redux'
import ChatPage from './pages/ChatPage'



function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
        
      </Routes>
   </BrowserRouter>
  )
}

export default App
