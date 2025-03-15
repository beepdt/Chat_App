import { useState } from 'react'
import './App.css'
import SignPage from './pages/SignPage/SignPage'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import OTPInput from './components/reusable/OTPInput'



function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/otp" element={<OTPInput />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
