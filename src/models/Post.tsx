import { Author } from "./Author";
import { PostComment } from "./PostComment";

export interface Post {
  genres: string[];
  _id?: string;
  imgLink?: string;
  title: string;
  content: string;
  author?: Author;
  comments?: PostComment[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
