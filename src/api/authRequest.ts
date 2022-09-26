import axios, { AxiosResponse } from "axios";
import { AppSettings } from "../helper/constant";
import { instance } from "./apiConfig";

const responseBody = (response: AxiosResponse) => response.data;

const authRequests = {
  get: (url: string) => instance.get<UserResponse>(url).then(responseBody),
  post: (url: string, body: UserInput) =>
    instance.post<UserResponse>(url, body).then(responseBody),
  put: (url: string, body: UserUpdate) =>
    instance.put<UserResponse>(url, body).then(responseBody),
};

export interface UserInput {
  name?: string;
  email: string;
  password: string;
}

export interface UserUpdate {
  name?: string;
  imgLink?: string;
  password?: string;
  newPassword?: string;
}

export interface UserResponse {
  data: {
    userName: string;
    userId: string;
    token: string;
    email: string;
    avatarLink: string;
  };
  status: string;
}

export const Auths = {
  login: (userInput: UserInput): Promise<UserResponse> =>
    authRequests.post(AppSettings.LOGIN_URL, userInput),
  register: (userInput: UserInput): Promise<UserResponse> =>
    authRequests.post(AppSettings.REGISTER_URL, userInput),
  updateUser: (userId: string, userUpdate: UserUpdate): Promise<UserResponse> =>
    authRequests.put(
      AppSettings.BASE_URL + `/auth/update/${userId}`,
      userUpdate
    ),
  changePassword: (userUpdate: UserUpdate): Promise<UserResponse> =>
    authRequests.put(AppSettings.BASE_URL + "/auth/changePassword", userUpdate),
};
