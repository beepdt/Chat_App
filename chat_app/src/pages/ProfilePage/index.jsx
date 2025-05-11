
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { setFriends } from "@/state"
import { HOST, PATCH_FRIEND_ROUTE } from "@/pages/HomePage/apiClient"
import MiddleDiv from "../GlobalPage/MiddleDiv"
import RightDiv from "../GlobalPage/RightDiv"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useNavigate } from "react-router-dom"
import { UserPlus, UserMinus, Mail, MapPin, Briefcase, Calendar, PlusIcon } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer"
import UserProfileCard from "@/components/reusable/UserProfileCard"
import BuddyList from "@/components/reusable/BuddyList"
import YapWidget from "@/components/reusable/YapWidget"
import { setPosts } from "@/state"
import TopBar from "@/components/reusable/TopBar"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { userId } = useParams() // Get the userId from the URL parameters
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)  
  const loggedInUser = useSelector((state) => state.user) 
  const isOwnProfile = userId === loggedInUser?._id
  const friends = useSelector((state) => state.user.friends) || []
  const isFriend = friends.find((friend) => friend._id === userId)
  const posts = useSelector((state) => state.posts);

  const navigate = useNavigate()
  const handleNavigateHome = () => {
    navigate("/home")
  }


  const getUser = async () => {
    try {
      const response = await fetch(`${HOST}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error("Failed to fetch user:", error)
    }
  }

  const patchFriend = async () => {
    const response = await fetch(`${PATCH_FRIEND_ROUTE}/${loggedInUser._id}/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  const getUserPosts = async () => {
          const response = await fetch(`${HOST}/posts/${userId}/posts`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          console.log("User posts: ", data);
          dispatch(setPosts({ posts: data }));
      };

  useEffect(() => {
    getUser()
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getUserPosts()
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#111111]">
        <div className="font-nexus text-[#ff4911] text-3xl">Loading...</div>
      </div>
    )
  }

  const {
    id,
    username,  
    userPicturePath,
    friends: userFriends = [],
    createdAt,
  } = user

  const joinDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return (
    <>
      <div className='border-b-2 border-[#1e1e1e] '>
            <h1
              onClick={handleNavigateHome}
              className='font-nexus text-[120px] text-[#ff00f5] -mt-8 -mb-6 pb-0 cursor-pointer max-w-7xl px-84'
            >Yapper.</h1>
          </div>
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-[#111111] ">
   
      {/* Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Fixed Panel */}
        <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-6">
          <UserProfileCard userId={loggedInUser._id} picturePath={loggedInUser.picturePath} />
          <BuddyList userId={loggedInUser._id} />
        </div>

        {/* Middle Scrollable Section */}
        <div className="col-span-1 lg:col-span-6 border-l-2 border-r-2 border-[#1e1e1e] -mt-6">
          <ScrollArea className="h-full">
            <div className="space-y-6 pr-1">
              {/* Profile Header */}
              <Card className="bg-[#111111] border-none shadow-none rounded-none pb-0">
                {/* Cover Photo */}
                <div className="h-48 bg-gradient-to-r from-[#1e1e1e] to-[#2d2d2d] relative -mr-2">
                  <div className="absolute -bottom-16 left-8">
                    <Avatar className="h-32 w-32 border-4 border-[#111111] bg-[#ff4911]">
                      <AvatarImage
                        src={`${HOST}/assets/${user.picturePath}`}
                        alt={`${username}`}
                        className="object-cover"
                      />
                    </Avatar>
                  </div>
                </div>

                <CardContent className="pt-20 pb-0 px-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h1 className="font-nohemi text-[#ff4911] text-4xl">
                        {username} 
                      </h1>
                      <div className="flex items-center gap-1 text-gray-400 mt-1">
                        <Calendar size={16} />
                        <span>Joined {joinDate}</span>
                      </div>
                    </div>

                    <div>
                      {!isOwnProfile && (
                        <div className="flex gap-2">
                          <Button
                            onClick={patchFriend}
                            className="bg-[#1e1e1e] hover:bg-[#2d2d2d] rounded-full font-nohemi text-sm"
                          >
                            {isFriend ? (
                              <>
                                <UserMinus size={16} className="mr-2" />
                                Unfollow
                              </>
                            ) : (
                              <>
                                <UserPlus size={16} className="mr-2" />
                                Follow
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                      
                    </div>
                  </div>

                  <Separator className="my-0 bg-[#2d2d2d]" />

                 
                </CardContent>
              </Card>

             

              {/* User Posts */}
              <div className="border-t-2 border-[#1e1e1e]">
                <h2 className="font-nexus text-[#ff4911] text-[90px] pl-8">Posts</h2>
                      {posts.map (
                    ({
                        _id,
                        userId,
                        username,
                        description,
                        likes,
                        userPicturePath,
                    }) => (
                        <YapWidget
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            username={username}
                            description={description}
                            likes={likes}
                            userPicturePath={userPicturePath}
                        />
                    )
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Fixed Panel */}
        <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-6">
          <RightDiv />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Floating Action Button */}
        <Button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-4 right-8 rounded-full p-3 size-14 bg-[#ff4911]"
        >
          <PlusIcon className="size-8" />
        </Button>

        {/* Drawer */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} className="bg-[#111111]">
          <DrawerContent className="fixed bottom-0 left-2 right-2 border-transparent p-4 shadow-lg bg-[#111111]">
            <DrawerHeader>
              <DrawerTitle>
                <UserProfileCard userId={loggedInUser._id} picturePath={loggedInUser.picturePath} />
              </DrawerTitle>
              <DrawerDescription>
                <BuddyList userId={loggedInUser._id} />
              </DrawerDescription>
              <DrawerClose />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
    </>
  )
}

export default ProfilePage
