import create from "zustand";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { useStorage } from "./zustandStorage";

type ProfileState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  listUserPost: Post[];
  setListUserPost: (listUserPost: Post[]) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  handleGetPostByAuthorId: () => void;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  listUserPost: [],
  setListUserPost: (listUserPost) => set({ listUserPost }),
  currentUser: {} as User,
  setCurrentUser: (currentUser) => set({ currentUser }),
  comment: "",
  handleGetPostByAuthorId: async () => {
    const {userId} = useStorage();
    console.log(userId);
    const response = await Posts.getPostByAuthorId(userId);
    set({ listUserPost: response.data });
  },
}));
