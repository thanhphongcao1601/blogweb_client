import { Author } from "./Author";

export interface PostComment {
  _id: string;
  author: Author;
  content: string;
  createdAt: string;
  updatedAt: string;
}
