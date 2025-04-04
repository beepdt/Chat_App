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
import { PlusIcon } from 'lucide-react';
import BuddyList from '@/components/reusable/BuddyList';
import RightDiv from './RightDiv';
import MiddleDiv from './MiddleDiv';

const GlobalPage = () => {

    const {_id="", picturePath=""} = useSelector((state)=>state.user)
    const [drawerOpen,setDrawerOpen] = useState(false);

    return (
        <div >
            
            <div className='p-2 mt-20 '>
                {/*Desktop Layout */}
                <div className='hidden md:flex gap-6'>
                    <div className="flex-1 ml-4 ">
                        <div className='display-block space-y-4'>
                            <UserProfileCard userId={_id} picturePath={picturePath}/>
                            <BuddyList userId={_id}/>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                    <div className='space-y-4'>
                        <MiddleDiv userId={_id} />
                    </div>
                        
                    </div>
                    <div className="flex-1  mr-4"><RightDiv/></div>
                </div>

                {/*Mobile Layout */}
                <div className="md:hidden">
                    <div className=" p-2 mb-2 w-full"><MiddleDiv userId={_id} /></div>

                    {/*Floating Action Button */}
                    <Button
                        onClick={()=> setDrawerOpen(true)}
                        className="fixed bottom-4 right-8 rounded-full size-14"
                    >
                        
                       <PlusIcon className='size-8'/>
                       
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
                                <DrawerTitle><UserProfileCard userId={_id} picturePath={picturePath} className="width-20"/></DrawerTitle>
                                <DrawerDescription><RightDiv/></DrawerDescription>
                                <DrawerClose/>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>              
                </div>
            </div>
            
        </div>
    )
}

export default GlobalPage;