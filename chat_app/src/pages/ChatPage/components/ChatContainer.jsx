import ChatHeader from "@/components/reusable/ChatHeader"
import MessageBar from "./MessagBar"
import MessageContainer from "./MessageContainer"

const ChatContainer = () => {
    return (
        <>
            <div
                className="fixed h-[100vh] max-w-[76vw] w-full  flex flex-col  p-2 border-2 border-[#1e1e1e]"
            >
                <ChatHeader/>
                <MessageContainer/>
                <MessageBar/>
            </div>
        </>
    )
}
export default ChatContainer
