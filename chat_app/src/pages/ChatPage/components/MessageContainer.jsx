import { ScrollArea } from "@/components/ui/scroll-area";

const MessageContainer = () => {

    const allMessages = () =>{}
    return (
        <div className="text-white flex-1 overlow-y-auto p-4 px-8 scrollable md:w-[65vw] lg:w-[70vw] xl:2-[80vw] w-full">
            <ScrollArea></ScrollArea>
        </div>
    )
}
export default MessageContainer;