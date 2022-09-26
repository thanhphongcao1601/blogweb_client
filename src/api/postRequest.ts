import axios, { AxiosResponse } from "axios";
import { AppSettings } from "../helper/constant";
import { Post } from "../models/Post";
import { instance } from "./apiConfig";

const responseBody = (response: AxiosResponse) => response.data;

const postRequests = {
  get: (url: string) => instance.get<Post>(url).then(responseBody),
  post: (url: string, body: Post) =>
    instance.post<Post>(url, body).then(responseBody),
  delete: (url: string) => instance.delete<Post>(url).then(responseBody),
  put: (url: string, body: Post) =>
    instance.put<Post>(url, body).then(responseBody),
  patch: (url: string, body: { content: string }) =>
    instance.patch<Post>(url, body).then(responseBody),
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
  addPost: (post: Post): Promise<PostResponse> =>
    postRequests.post(`/posts`, post),
  updatePost: (postId: string, newPost: Post): Promise<PostResponse> =>
    postRequests.put(`/posts/${postId}`, newPost),
  deletePost: (postId: string): Promise<PostResponse> =>
    postRequests.delete(`/posts/${postId}`),
  commentPost: (
    postId: string,
    fields: { content: string }
  ): Promise<PostResponse> => postRequests.patch(`/posts/${postId}`, fields),
  searchPost: (title: string): Promise<PostsResponse> =>
    searchRequest.post(`/posts/search`, { title: title } as Post),
  filterPost: (genre: string): Promise<PostsResponse> =>
    searchRequest.post(`/posts/filter`, { genres: [genre] } as Post),
  getPostByAuthorId: (authorId: string): Promise<PostsResponse> =>
    searchRequest.post(`/posts/userPost`, {
      author: { _id: authorId },
    } as Post),
};
