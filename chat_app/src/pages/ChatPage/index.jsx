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

const ChatPage = () => {

    const {_id="", picturePath=""} = useSelector((state)=>state.user)
    const [drawerOpen,setDrawerOpen] = useState(false);

    return (
        <>
            
            <div className='p-2 mt-20'>
                {/*Desktop Layout */}
                <div className='hidden md:flex gap-2'>
                    <div className="flex ">
                        <div className='display-block space-y-4'>
                            <UserProfileCard userId={_id} picturePath={picturePath}/>
                            <UserProfileCard userId={_id} picturePath={picturePath}/>
                        </div>
                    </div>
                    <div className="flex-1 border ">Middle Div Chat</div>
                    <div className="flex-1 border ">Right Div</div>
                </div>

                {/*Mobile Layout */}
                <div className="md:hidden">
                    <div className="border p-2 mb-2">Middle Chat Div</div>

                    {/*Floating Action Button */}
                    <Button
                        onClick={()=> setDrawerOpen(true)}
                        className="fixed bottom-4 right-8 rounded-full size-14"
                    >
                        <PlusIcon className='size-6'/>
                    </Button>

                    {/*Drawer */}
                    <Drawer
                    open={drawerOpen}
                    onOpenChange={setDrawerOpen}
                    >
                        <DrawerContent
                            className="fixed bottom-0 left-2 right-2 bg-white p-2 shadow-lg"
                        >
                            <DrawerHeader>
                                <DrawerTitle><UserProfileCard userId={_id} picturePath={picturePath}/></DrawerTitle>
                                <DrawerDescription>Content</DrawerDescription>
                                <DrawerClose/>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>              
                </div>
            </div>
            
        </>
    )
}

export default ChatPage;