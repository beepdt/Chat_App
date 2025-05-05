import { ArrowLeft, ArrowLeftCircle, ArrowLeftCircleIcon } from "lucide-react";
import { Button } from "../ui/button";

const ChatHeader = () => {
    return (
        <div
            className="h-[10vh] border-b-1 border-gray-600 flex items-center justify-between"
        >
            <div
                className="flex items-center gap-5"
            >
                    <div className="flex items-center justify-center"></div>
                    <div className="flex items-center justify-center gap-5">
                        <Button className="bg-transparent size-14">
                            <ArrowLeftCircle className="bg-transparent size-full"/>
                        </Button>
                    </div>
            </div>
        </div>
    )
}
export default ChatHeader;