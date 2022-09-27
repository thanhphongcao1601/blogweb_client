import axios from "axios";
import { AppSettings } from "../helper/constant";

export const instance = axios.create({
  baseURL: AppSettings.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

instance.interceptors.request.use(async (config) => {
  const userStorage = JSON.parse(localStorage.getItem("userStorage") ?? "");
  const token = userStorage.state.token;
  console.log("token", token);
  if (token) {
    config.headers!.Authorization = "Bearer " + token;
  }
  return config;
});
