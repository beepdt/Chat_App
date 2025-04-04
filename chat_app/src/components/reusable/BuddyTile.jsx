import { setFriends } from "@/state";
import { useDispatch,useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, UserMinus } from "lucide-react";
import { HOST } from "@/pages/HomePage/apiClient";

const BuddyTile = ({friendId,name, userPicturePath, isVerified}) => {
    const dispatch = useDispatch();
    const {_id} = useSelector((state)=> state.user);
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);
    
    const isFriend = friends.find((friend)=> friend._id === friendId);

    const patchFriend = async() => {
        const response =  await fetch(
            `${HOST}/users/${_id}/${friendId}`,
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
        <div className="flex items-center justify-between p-4  rounded-md bg-white font-nohemi">
            <div className="flex items-center space-x-4">
                <Avatar className="w-14 h-14 mr-10">
                    <AvatarImage src={`${HOST}/assets/${userPicturePath}` || user?.picturePath} alt="Profile" className="rounded-full" />
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-xl font-medium mr-10">{name}</span>
                    <span className={`text-sm ${isVerified? 'text-green-600': 'text-red-600'}`}>{isVerified? "verified": "anonymous"}</span>
                </div>
                
                
            </div>
            
            
            {_id !== friendId && ( // Hide button if userId equals friendId
                <Button
                    variant={isFriend ? "default" : "default"}
                    onClick={patchFriend}
                >
                    {isFriend ? <UserMinus /> : <UserPlus />}
                </Button>
            )}  
        </div>
        
    )
}

export default BuddyTile