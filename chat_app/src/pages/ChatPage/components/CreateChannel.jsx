import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { HOST } from "@/pages/HomePage/apiClient";
import { useDispatch } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { setSelectedChatData } from "@/state";
import { setSelectedChatType } from "@/state";
import { GET_ALL_USERS } from "@/pages/HomePage/apiClient";
import MultipleSelector from "./MultipleSelector";
import { addChannel } from "@/state";

const CreateChannel = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(true);

  const [allContacts, setAllContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [newChannel, setNewChannel] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    if (!searchUser.trim()) return;

    const url = `${HOST}/users/search?username=${encodeURIComponent(
      searchUser.trim()
    )}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Server ${response.status}: ${errorBody}`);
      }
      const users = await response.json();

      const filtered = users.filter((userList) => userList._id !== user._id);

      setSearchResults(filtered);

      if (searchResults.length === 0) {
        setIsSearching(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  //new contact
  const selectNewChannel = (channel) => {
    dispatch(setSelectedChatType({ selectedChatType: "channel" }));
    dispatch(setSelectedChatData({ selectedChatData: channel }));
    setSearchResults([]);
    setOpen(false);
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${GET_ALL_USERS}/${user._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Server ${response.status}: ${errorBody}`);
      }
      const data = await response.json();
      const formattedData = data.map((user) => ({
        value: user._id,
        label: user.username,
        icon: user.picturePath ? (
          <img
            src={user.picturePath}
            alt={user.username}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : null,
      }));

      setAllContacts(formattedData);
      console.log("All Contact Data", data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const CreateChannel = async () => {
    if (channelName.length > 0 && selectedUser.length > 0) {
      const channelPayload = {
        userId: user._id,
        members: selectedUser.map((user) => user.value),
        name: channelName,
      };
      try {
        const response = await fetch(`${HOST}/channel/createChannel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(channelPayload),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to create channel");
        }

        console.log("Channel created successfully:", data);
        setSelectedUser([]);
        setChannelName("");
        dispatch(
          addChannel({
           channel: data,
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  //const filteredSearch = searchResults.filter()

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center justify-center pr-4">
            <PlusCircle
              className="text-[#ff4911] cursor-pointer hover:text-white ease-in-out duration-300"
              onClick={() => setOpen(!open)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1e1e1e] text-white rounded-lg">
            <p>Create New Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#111111] text-[#ff4911] rounded-lg border-none min-h-[32vh] flex">
          <DialogHeader className="w-full">
            <DialogTitle className="font-nohemi text-[24px] justify-center items-center text-center">
              Create Channel
            </DialogTitle>
            <div className="font-general text-white w-full flex flex-col items-center justify-center gap-2">
              <Input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Channel Name"
                className="w-full  font-normal  font-general placeholder:text-gray-400 bg-black border-none focus:border-none focus:ring-transparent"
              />

              <MultipleSelector
                defaultOptions={allContacts}
                value={selectedUser}
                onChange={setSelectedUser}
                emptyIndicator={<span>No results</span>}
                placeholder="Select Members"
                className="w-full  font-normal  font-general placeholder:text-gray-400 bg-black border-none focus:border-none focus:ring-transparent"
              />

              <Button
                onClick={CreateChannel}
                disabled={!channelName.trim()}
                className="w-full cursor-pointer rounded-lg bg-[#ff4911]/90 text-[#1e1e1e] hover:bg-[#ff4911] hover:text-white ease-in-out duration-300 mt-2 justify-center items-center mb-2"
              >
                Create Channel
              </Button>
            </div>

            {isSearching === false && searchResults.length === 0 && (
              <div className="text-center">
                <h3 className="text-gray-600">Oops...no one</h3>
              </div>
            )}

            {searchResults.length > 0 && (
              <ScrollArea className="h-[32vh] w-full mt-2">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-2 border-b border-[#1e1e1e]"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 rounded-full bg-[#FFFAFA]">
                        <AvatarImage
                          src={
                            `${HOST}/assets/${user.picturePath}` ||
                            user.picturePath
                          }
                          className="rounded-full"
                        />
                      </Avatar>

                      <span>{`${user.username}`}</span>
                    </div>
                    <button
                      onClick={() => {
                        selectNewContact(user);
                      }}
                      className="text-[#ff4911] hover:text-white pr-4"
                    >
                      <Plus />
                    </button>
                  </div>
                ))}
              </ScrollArea>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateChannel;
