import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AppSettings } from "../helper/constant";
import { Post } from "../models/Post";

const instance = axios.create({
  baseURL: AppSettings.BASE_URL,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const postRequests = {
  get: (url: string) => instance.get<Post>(url).then(responseBody),
  post: (url: string, body: Post, header?: AxiosRequestHeaders) =>
    instance.post<Post>(url, body, { headers: header }).then(responseBody),
  delete: (url: string, header: AxiosRequestHeaders) =>
    instance.delete<Post>(url, { headers: header }).then(responseBody),
  put: (url: string, body: Post, header?: AxiosRequestHeaders) =>
    instance.put<Post>(url, body, { headers: header }).then(responseBody),
  patch: (
    url: string,
    body: { content: string },
    header?: AxiosRequestHeaders
  ) => instance.patch<Post>(url, body, { headers: header }).then(responseBody),
};

const searchRequest = {
  post: (url: string, postSearch: Post) =>
    instance.post<Post>(url, postSearch).then(responseBody),
};

interface PostsResponse {
  data: Post[];
  result: number;
  status: string;
}

interface PostResponse {
  data: Post;
  status: string;
}

export const Posts = {
  getAllPosts: (): Promise<PostsResponse> => postRequests.get("/posts"),
  getPost: (postId: string): Promise<PostResponse> =>
    postRequests.get(`/posts/${postId}`),
  addPost: (post: Post, header?: AxiosRequestHeaders): Promise<PostResponse> =>
    postRequests.post(`/posts`, post, header),
  updatePost: (
    postId: string,
    newPost: Post,
    header?: AxiosRequestHeaders
  ): Promise<PostResponse> =>
    postRequests.put(`/posts/${postId}`, newPost, header),
  deletePost: (postId: string, header: AxiosRequestHeaders): Promise<PostResponse> =>
    postRequests.delete(`/posts/${postId}`,header),
  commentPost: (
    postId: string,
    fields: { content: string },
    header: AxiosRequestHeaders
  ): Promise<PostResponse> =>
    postRequests.patch(`/posts/${postId}`, fields, header),
  searchPost: (title: string): Promise<PostsResponse> =>
    searchRequest.post(`/posts/search`, { title: title } as Post),
  filterPost: (genre: string): Promise<PostsResponse> =>
    searchRequest.post(`/posts/filter`, { genres: [genre] } as Post),
  getPostByAuthorId: (authorId: string): Promise<PostsResponse> =>
    searchRequest.post(`/posts/userPost`, { author: { _id: authorId } } as Post),
};
