import ChatHeader from "@/components/reusable/ChatHeader"

const ChatContainer = () => {
    return (
        <>
            <div
                className="fixed  h-[100vh] max-w-[76vw] w-full bg-[#111111] flex flex-col rounded-lg p-2 "
            >
                <ChatHeader/>
            </div>
        </>
    )
}
export default ChatContainer
