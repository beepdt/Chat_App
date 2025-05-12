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
import { setSelectedChatData } from "@/state/chatSlice";
import { setSelectedChatType } from "@/state/chatSlice";

const NewDm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    if (!searchUser.trim()) {
      setSearchResults([]);
    }
  }, [searchUser]);

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
            <p>Select New Buddy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#111111] text-[#ff4911] rounded-lg border-none min-h-[32vh] flex">
          <DialogHeader className="w-full">
            <DialogTitle className="font-nohemi text-[24px] justify-center items-center text-center">
              Add Buddy
            </DialogTitle>
            <DialogDescription className="font-general text-white w-full flex flex-row items-center justify-center gap-2">
              <Input
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search for a buddy"
                className="w-full text-white font-normal fill-white font-general placeholder:text-gray-200 bg-black border-none focus:border-none focus:ring-transparent"
              />

              <Button
                onClick={handleSearch}
                disabled={!searchUser.trim()}
                className="rounded-lg bg-[#1e1e1e] text-white hover:bg-black hover:text-white ease-in-out duration-300 mt-2 justify-center items-center mb-2"
              >
                Search
              </Button>
            </DialogDescription>

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
                        // Handle adding buddy logic here
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
export default NewDm;
