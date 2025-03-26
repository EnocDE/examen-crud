import axios from "axios";

export const usersConfig = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
})