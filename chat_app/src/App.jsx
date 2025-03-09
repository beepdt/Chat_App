import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { ChevronRight } from "lucide-react"
import BottomNav from './components/reusable/BottomNav'
import TopBar from './components/reusable/TopBar'
import RegisterForm from './components/reusable/RegisterForm'
import SignPage from './pages/SignPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SignPage/>
    </>
  )
}

export default App
