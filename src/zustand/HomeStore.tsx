import create from "zustand";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

type HomeState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  listPost: Post[];
  genres: string[];
  title: string;
  content: string;
  imgLink: string;
  setListPost: (listPost: Post[]) => void;
  setGenres: (genres: string[]) => void;
  setContent: (content: string) => void;
  setImgLink: (imgLink: string) => void;
  setTitle: (title: string) => void;
  handleAddPost: (onClose: () => void) => void;
  handleGetAllPost: () => void;
  clearPostForm: () => void;
};

export const useHomeStore = create<HomeState>((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  listPost: [],
  listSearch: [],
  genres: [],
  title: "",
  content: "",
  imgLink: "",
  setListPost: (listPost) => set({ listPost }),
  setGenres: (genres) => set({ genres }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImgLink: (imgLink) => set({ imgLink }),
  handleAddPost: async (onClose) => {
    set({ isLoading: true });
    let newPost: Post = {
      genres: get().genres.length > 0 ? get().genres : ["other"],
      imgLink: get().imgLink,
      title: get().title,
      content: get().content,
    };
    try {
      const response = await Posts.addPost(newPost);
      if (response) {
        set({ isLoading: false });
        set((state) => ({ listPost: [...state.listPost, response.data] }));
        //empty form
        set({
          content: "",
          title: "",
          imgLink: "",
          genres: ["other"],
        });
        onClose();
        alert("Add post success");
      }
    } catch (error) {
      set({ isLoading: false });
      alert("Add post fail: " + error);
    }
  },
  handleGetAllPost: async () => {
    const response = await Posts.getAllPosts();
    set({ listPost: response.data });
  },
  clearPostForm: () => {
    set({
      isLoading: false,
      title: "",
      content: "",
      imgLink: "",
      genres: ["other"],
    });
  },
}));
