import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { 
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerDescription,
    DrawerHeader
} from '@/components/ui/drawer';
import UserProfileCard from '@/components/reusable/UserProfileCard';
import TopBar from '@/components/reusable/TopBar';
import BottomNav from '@/components/reusable/BottomNav';
import { PlusCircle, PlusIcon } from 'lucide-react';
import Contacts from './components/Contacts';
import ChatContainer from './components/ChatContainer';
import EmptyContainer from './components/EmptyContainer';
import { setSelectedChatData } from '@/state'; 
import { setSelectedChatType } from '@/state';
import { useDispatch } from 'react-redux';

const ChatPage = () => {
    const dispatch = useDispatch();

    const {_id="", picturePath=""} = useSelector((state)=>state.user)
    const [drawerOpen,setDrawerOpen] = useState(false);
    const chatType = useSelector((state)=>state.selectedChatType)

    return (
        <>
            
            <div className='p-4 '>
           
                
                {/*Desktop Layout */}
                <div className='hidden md:flex  overflow-hidden min-h-screen space-x-4 '>
                    <div className="flex ">
                        
                            <Contacts/>
                        
                    </div>
                    <div className="flex-2 md:flex max-h-[100vh] oveflow-hidden h-[100vh] rounded-lg ">
                        
                        {
                            chatType === "" ? <EmptyContainer/> : <ChatContainer/>
                        }
                    </div>
                    
                </div>

                {/*Mobile Layout */}
                <div className="md:hidden">
                    <div>
                        {
                            chatType === "" ? <Contacts/> : <ChatContainer/>
                        }
                    </div>

                                
                </div>
            </div>
            
        </>
    )
}

export default ChatPage;