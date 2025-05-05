import { setFriends } from "@/state";
import { useDispatch,useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, UserMinus } from "lucide-react";
import { HOST } from "@/pages/HomePage/apiClient";
import { PATCH_FRIEND_ROUTE } from "@/pages/HomePage/apiClient";
import { useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";

const BuddyTile = ({friendId,name, userPicturePath, isVerified}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {_id} = useSelector((state)=> state.user);
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);
    
    const isFriend = friends.find((friend)=> friend._id === friendId);

    const patchFriend = async() => {
        const response =  await fetch(
            `${PATCH_FRIEND_ROUTE}/${_id}/${friendId}`,
             {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
             }
            );
            const data = await response.json();
            dispatch(setFriends({friends: data}));
    };

    return (
        <div className="flex items-center gap-2 justify-between w-full">
            <div className="items-center flex gap-2">
            <div className="relative">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={`${HOST}/assets/${userPicturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-transparent"></span>
                
            </div>
            <div className="flex flex-col">
                    <span className="text-xl font-medium mr-10 max-w-30 overflow-hidden" onClick={()=> navigate(`/profile/${friendId}`)}>{name}</span>
                    <span className={`text-sm ${isVerified? 'text-green-600': 'text-red-600'}`}>{isVerified? "verified": "anonymous"}</span>
            </div>
            </div>

            
            
            {_id !== friendId && ( // Hide button if userId equals friendId
                <Button
                    variant={isFriend ? "default" : "default"}
                    onClick={patchFriend}
                    className="rounded-full bg-gradient-to-r bg-gray-700"
                >
                    {isFriend ? <UserMinus /> : <UserPlus />}
                </Button>
            )}  
        </div>
        
    )
}

export default BuddyTile