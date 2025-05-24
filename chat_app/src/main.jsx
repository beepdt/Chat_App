import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import authReducer from "./state/index";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // Import the persistReducer function from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate from redux-persist/integration/react
import { combineReducers } from "@reduxjs/toolkit";
import { SocketProvider } from "./context/socketContext";

const persistConfig = { key: "root", storage, version: 1 }; // Configuration for redux-persist
const persistedReducer = persistReducer(persistConfig, authReducer); // Create a persisted reducer
const store = configureStore({
  // Create a store with the persisted reducer
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store); // Create a persistor

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </SocketProvider>
    </Provider>
  </StrictMode>
);
