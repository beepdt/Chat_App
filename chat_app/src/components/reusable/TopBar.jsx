import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Top bar container with the same dark background and rounded styling
    <motion.div
      initial={{ y: -50, opacity: 0 }} // Animates from above with fade-in
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="fixed top-2 left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-gray-900 shadow-md rounded-full p-3 flex items-center justify-between border border-gray-700 font-mono text-white"
    >
      {/* Animated App Name (Yapper) */}
      <motion.h1
        whileHover={{ scale: 1.05 }} // Slight scale effect on hover
        className="text-lg font-bold pl-2 pr-2"
      >
        Yapper
      </motion.h1>

      {/* Centered Search Bar */}
      <motion.div whileFocus={{ scale: 1.02 }} className="flex-grow justify-center mx-4">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full  bg-gray-800 text-gray-900 border border-gray-900 rounded-full px-4 py-2  focus:ring-0 focus:border-gray-900"
        />
      </motion.div>

      {/* Dropdown Menu with User Info */}
      <DropdownMenu onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <Button variant="ghost" className="flex items-center space-x-2 text-white rounded-full px-4 py-2 hover:bg-[#F59F28]">
              <span>Nerd</span>
              
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        
        {/* Dropdown Menu Animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuContent align="center" className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg text-white">
            <DropdownMenuItem className="hover:bg-gray-700 px-4 py-2 rounded-xl">
              <Settings className="w-5 h-5 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 px-4 py-2 rounded-xl text-red-400">
              <LogOut className="w-5 h-5 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </motion.div>
      </DropdownMenu>
    </motion.div>
  );
}
