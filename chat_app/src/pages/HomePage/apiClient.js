import axios from "axios";

export const HOST = import.meta.env.VITE_SERVER_URL;
export const LOGIN_ROUTE = `${HOST}/auth/login`
export const REGISTER_ROUTE = `${HOST}/auth/register`


export const apiClient = axios.create({
    baseURL: HOST,
})