import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav({activePage, setPageType}) {
  // State to track the currently active button (default is "home")
  
 

  return (
    // The container is fixed at the bottom center with a dark background.
    // It uses flexbox to layout the buttons evenly.
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 shadow-lg rounded-full p-2 flex space-x-4 backdrop-blur-md border border-gray-700 font-mono">
      
      {/* Home Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setPageType("home")}
        // Override hover, active, and focus background with transparent so it doesn't change on hover.
        className="relative z-10 hover:bg-transparent active:bg-transparent focus:bg-transparent"
      >
        {activePage === "home" && (
          // Animated active indicator with a bright color
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-[#F59F28] rounded-full"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        {/* Home icon:
            - Shows dark (text-gray-900) when active, light (text-gray-300) when inactive */}
        <Home className={`w-6 h-6 relative ${activePage === "home" ? "text-gray-900" : "text-gray-300"}`} />
      </Button>
      
      {/* Chat Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setPageType("chat")}
        // Also override hover and active backgrounds to stay transparent.
        className="relative z-10 hover:bg-transparent active:bg-transparent focus:bg-transparent"
      >
        {activePage === "chat" && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-[#F59F28] rounded-full"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        {/* Chat icon:
            - Dark (text-gray-900) when active, light (text-gray-300) when inactive */}
        <MessageSquare className={`w-6 h-6 relative ${activePage === "chat" ? "text-gray-900" : "text-gray-300"}`} />
      </Button>
    </div>
  );
}
