import { setFriends } from "@/state";
import { useDispatch,useSelector } from "react-redux";

const BuddyTile = ({friendId,name}) => {
    const dispatch = useDispatch();
    const {_id} = useSelector((state)=> state.user);
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);
    const isFriend = friends.find((friend)=> friend._id === friendId);

    const patchFriend = async() => {
        const response =  await fetch(
            `http://localhost:3000/users/${_id}/${friendId}`,
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
        <div className="flex items-center justify-between p-4 border rounded-md shadow-sm">
            <span className="text-lg font-medium">{name}</span>
            <Button
                variant={isFriend ? "destructive" : "default"}
                onClick={patchFriend}
            >
                {isFriend ? "Remove Friend" : "Add Friend"}
            </Button>   
        </div>
    )
}

export default BuddyTile