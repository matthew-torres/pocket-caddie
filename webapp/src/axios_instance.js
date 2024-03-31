import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
        timeout: 1000,

    }
});

export default instance;