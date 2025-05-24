import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  selectedChatType: null, // List of contact objects { id, name, avatar, lastMessage, unreadCount }
  selectedChatData: null, // Messages keyed by contactId: { [contactId]: [ { id, senderId, text, timestamp } ] }
  selectedChatMessages: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"; // Set the mode state to the payload
    },
    setLogin: (state, action) => {
      state.user = action.payload.user; // Set the user state to the payload
      state.token = action.payload.token; // Set the token state to the payload
    },
    setLogout: (state) => {
      state.user = null; // Set the user state to null
      state.token = null; // Set the token state to null
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends; // Set the friends state to the payload
      } else {
        console.error("User is not logged in"); // Log an error message
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts; // Set the posts state to the payload
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        // Map through the posts
        if (post._id === action.payload.post._id) {
          // Check if the post ID matches the updated post ID
          return action.payload.post; // Return the updated post
        }
        return post;
      });
      state.posts = updatedPosts; // Set the posts state to the updated posts
    },
    setSelectedChatType: (state, action) => {
      state.selectedChatType = action.payload.selectedChatType;
    },
    //
    setSelectedChatData: (state, action) => {
      state.selectedChatData = action.payload.selectedChatData;
    },
    setSelectedChatMessages: (state, action) => {
      state.selectedChatMessages = action.payload.selectedChatMessages;
    },

    addMessageToChat: (state, action) => {
  const message = action.payload;
  
  const normalizedMessage = { ...message };
  
  if (state.selectedChatType === "channel") {
    // Only override if channel-specific properties exist
    if (message.receiver !== undefined) {
      normalizedMessage.receiverId = message.receiver;
    }
    if (message.sender !== undefined) {
      normalizedMessage.senderId = message.sender;
    }
  }
  
  state.selectedChatMessages.push(normalizedMessage);
},

    setCloseChat: (state) => {
      state.selectedChatType = "";
      state.selectedChatData = null;
      state.selectedChatMessages = [];
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setSelectedChatData,
  setCloseChat,
  setSelectedChatType,
  addMessageToChat,
} = authSlice.actions;
export default authSlice.reducer;
