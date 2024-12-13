import axios from "axios";
const backendUrl = "http://localhost:3000/api";

// const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND;

const myAxios = axios.create({
  baseURL: backendUrl,
  headers: {
    Accept: "application/json",
  },
  // withCredentials: true,
});

export default myAxios;
