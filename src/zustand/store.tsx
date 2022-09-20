import create from "zustand";
import { Post } from "../models/Post";

type State = {
  currentPost: Post;
  listPost: Post[];
  genres: string[];
  title: string;
  content: string;
  imgLink: string;
  setCurrentPost: (currentPost: Post) => void;
  setListPost: (listPost: Post[]) => void;
  setGenres: (genres: string[]) => void;
  setContent: (content: string) => void;
  setImgLink: (imgLink: string) => void;
  setTitle: (title: string) => void;
};

export const useStore = create<State>((set) => ({
  currentPost: {} as Post,
  listPost: [],
  genres: [],
  title: "",
  content: "",
  imgLink: "",
  setCurrentPost: (currentPost) => set({currentPost}),
  setListPost: (listPost) => set({ listPost }),
  setGenres: (genres) => set({ genres }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImgLink: (imgLink) => set({ imgLink }),
}));
