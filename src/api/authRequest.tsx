import axios, { AxiosResponse } from "axios";
import { AppSettings } from "../helper/constant";

const instance = axios.create({
  baseURL: AppSettings.BASE_URL,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const authRequests = {
  get: (url: string) => instance.get<UserResponse>(url).then(responseBody),
  post: (url: string, body: UserInput) =>
    instance.post<UserResponse>(url, body).then(responseBody),
};

interface UserInput {
  name?: string;
  email: string;
  password: string;
}

interface UserResponse {
  data: { userName: string; userId: string; token: string };
  status: string;
}

export const Auths = {
  login: (userInput: UserInput): Promise<UserResponse> =>
    authRequests.post(AppSettings.LOGIN_URL, userInput),
  register: (userInput: UserInput): Promise<UserResponse> =>
    authRequests.post(AppSettings.REGISTER_URL, userInput),
};
