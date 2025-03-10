import { useState } from 'react'
import './App.css'
import SignPage from './pages/SignPage/SignPage'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'



function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
