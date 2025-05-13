import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const EmptyContainer = () => {
  return (
    <div className="flex flex-col  h-200 w-full items-center justify-center bg-[#111111]  border-2 border-[#1e1e1e] scrollable">
      <div className="bg-[#111111] text-gray-200  border-none h-full">
        <div className="flex flex-col items-center justify-center space-y-4 p-2 h-full">
          <MessageSquare size={48} className="text-gray-500" />
          <h2 className="text-4xl w-full  font-nohemi">Welcome to Yapper</h2>
          <p className="text-center text-sm text-gray-400">
            select a chat to view messages.
          </p>
        </div>
      </div>
    </div>
  );
};
export default EmptyContainer;
