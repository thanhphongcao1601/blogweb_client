import create from "zustand";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

type FilterState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  listFilter: Post[];
  setListSearch: (listFilter: Post[]) => void;
  handleFilter: (filterString: string) => void;
};

export const useFilterStore = create<FilterState>((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  listFilter: [],
  setListSearch: (listFilter) => set({ listFilter }),
  handleFilter: async (filterString) => {
    const response = await Posts.filterPost(filterString);
    set({ listFilter: await response.data });
  },
}));
