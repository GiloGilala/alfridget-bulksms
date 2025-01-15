import axios from "axios";

const backendUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BACKEND
    : "http://localhost:3000/api";

const myAxios = axios.create({
  baseURL: backendUrl,
  headers: {
    Accept: "application/json",
  },
  // withCredentials: true,
});

export default myAxios;
