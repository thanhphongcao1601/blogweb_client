import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
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
  put: (url: string, body: UserUpdate, header?: AxiosRequestHeaders) =>
    instance.put<UserResponse>(url, body, { headers: header }).then(responseBody),
};

export interface UserInput {
  name?: string;
  email: string;
  password: string;
}

export interface UserUpdate {
  name?: string;
  imgLink?: string;
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
  updateUser: (
    userId: string,
    userUpdate: UserUpdate,
    header?: AxiosRequestHeaders
  ): Promise<UserResponse> =>
    authRequests.put(
      AppSettings.BASE_URL + `/auth/update/${userId}`,
      userUpdate,
      header
    ),
};
