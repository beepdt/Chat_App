import axios from "axios";

export const HOST = import.meta.env.VITE_SERVER_URL;
export const LOGIN_ROUTE = `${HOST}/auth/login`;
export const REGISTER_ROUTE = `${HOST}/auth/register`;
export const GET_USER_ROUTE = `${HOST}/users`;
export const GET_FRIENDS_ROUTE = `${HOST}/users/friends`;
export const PATCH_FRIEND_ROUTE = `${HOST}/users`;
export const PATCH_LIKE_ROUTE = `${HOST}/posts`;
export const GET_MESSAGES_ROUTE = `${HOST}/messages`


export const apiClient = axios.create({
    baseURL: HOST,
})