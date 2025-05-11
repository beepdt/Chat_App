import { ArrowLeft, ArrowLeftCircle, ArrowLeftCircleIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";

const ChatHeader = () => {
    return (
        <div
            className="h-[10vh] border-b-2 border-[#1e1e1e] flex items-center justify-between -ml-2 -mr-2"
        >
            <div
                className="flex items-center gap-5"
            >
                    <div className="flex items-center justify-center"></div>
                    <div className="flex items-center justify-center gap-5">
                        <Button className="bg-transparent size-14  hover:bg-[#111111] rounded-full ease-in-out duration-800">
                            <ArrowLeftIcon className="size-full fill-arrow text-[#ff4911]  hover:text-white"/>
                        </Button>
                    </div>
            </div>
        </div>
    )
}
export default ChatHeader;