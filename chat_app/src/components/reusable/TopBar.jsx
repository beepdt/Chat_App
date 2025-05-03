"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { setLogout } from "@/state"

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  // Animation variants for consistent animations
  const dropdownAnimations = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  }

  const handleLogout = () => {
    dispatch(setLogout())
    navigate("/login")
  }

  const handleNavigateHome = () => {
    navigate("/home")
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="fixed top-2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black shadow-md rounded-lg p-3 flex items-center justify-between border border-gray-700 text-white z-50"
    >
      {/* App Logo/Name */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNavigateHome}
        className="text-lg font-bold px-2 bg-transparent border-none text-white cursor-pointer"
        aria-label="Go to home page"
      >
        Yapper
      </motion.button>

      {/* User info could be displayed here */}
      {user && (
        <div className="hidden sm:block">
          <span className="text-sm text-gray-300">{user.username}</span>
        </div>
      )}

      {/* Dropdown Menu */}
      <DropdownMenu onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <Button
              variant="ghost"
              className="flex items-center rounded-full p-2 hover:bg-gray-800 hover:text-amber-400 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg text-white min-w-[180px]"
        >
          <motion.div {...dropdownAnimations}>
            <DropdownMenuItem
              className="hover:bg-gray-800 px-4 py-2 rounded-lg flex items-center cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              className="hover:bg-gray-800 px-4 py-2 rounded-lg flex items-center cursor-pointer text-red-400 hover:text-red-300"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
