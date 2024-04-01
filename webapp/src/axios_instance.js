import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
        timeout: 5000,

    }
});

export default instance;