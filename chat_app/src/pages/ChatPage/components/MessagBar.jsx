import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { SendHorizontalIcon, StickerIcon } from "lucide-react";
import { use, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const MessageBar = () => {
    const emojiRef = useRef();
    const [emojiPicker, setEmojiPicker] = useState(false);

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji);
        
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

    const [message, setMessage] = useState("")

    const handleSendMessage = async () => {
    }
    return(
        <div className="text-white height-[10vh]  flex justify-between items-center px-8 mb-[88px] gap-6">
            <div className="flex-1 flex  items-center gap-5 pr-5">
                <Input
                    className="flex-1  h-[48px] bg-black border-[#1e1e1e] border-1 rounded-xl focus:border-none focus:outline-none focus:ring-none  text-white placeholder:text-gray-200"
                    placeholder="Type a message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="rounded-full flex items-center gap-2 bg-[#1e1e1e] p-2">
                    <Button 
                        onClick={() => setEmojiPicker(!emojiPicker)}
                        className="rounded-full ease-out-in duration-800 bg-[#111111] size-12 hover:bg-[#1e1e1e] hover:text-white ease-in-out duration-800 items-center justify-center">
                        <StickerIcon className=""/>
                        
                    </Button>
                    
                    <Button 
                        onClick={handleSendMessage}
                        disabled={!message}
                        className="rounded-full text-black bg-[#ff4911] size-12 hover:bg-[#1e1e1e]  hover:text-white ease-in-out duration-800 items-center justify-center">
                        <SendHorizontalIcon className=""/>
                    </Button>
                </div>
                <div className="absolute bottom-48 right-0" ref={emojiRef}>
                            <EmojiPicker
                                theme="dark"
                                open={emojiPicker}
                                onEmojiClick={handleAddEmoji}
                                
                                autoFocusSearch={false}


                            />
                </div>

                
            </div>
        </div>
    )
}
export default MessageBar;