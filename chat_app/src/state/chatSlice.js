import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatType: undefined, // List of contact objects { id, name, avatar, lastMessage, unreadCount }
  selectedChatData: undefined, // Messages keyed by contactId: { [contactId]: [ { id, senderId, text, timestamp } ] }
  selectedChatMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Set the list of contacts
    setSelectedChatType: (state, action) => {
      state.selectedChatType = action.payload.selectedChatType;
    },
    //
    setSelectedChatData: (state, action) => {
      state.selectedChatData = action.payload.selectedChatData;
    },
    setSelectedChatMessages:(state,action) => {
        state.selectedChatMessages = action.payload.selectedChatMessages
    },
    setCloseChat: (state) => {
      state.selectedChatType = null;
      state.selectedChatData = null;
      state.selectedChatMessages = [];
    },
  },
});

export const { setSelectedChatType, setSelectedChatData } = chatSlice.actions;

export default chatSlice.reducer;
