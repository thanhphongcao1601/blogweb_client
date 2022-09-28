import create from "zustand";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { PostComment } from "../models/PostComment";
import { User } from "../models/User";

type PostDetailState = {
  isCommentLoading: boolean;
  setIsCommentLoading: (isCommentLoading: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  comment: string;
  setComment: (comment: string) => void;
  listComment: PostComment[];
  setListComment: (listComment: PostComment[]) => void;
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
  handleGetPost: (postId: string) => void;
  handleDeletePost: (navigate: () => void) => void;
  handleCommentPost: () => void;
  handleEditPost: (onClose: () => void) => void;
  clearPostForm: () => void;
};

export const usePostDetailStore = create<PostDetailState>((set, get) => ({
  isCommentLoading: false,
  setIsCommentLoading: (isCommentLoading) => set({ isCommentLoading }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  currentUser: {} as User,
  setCurrentUser: (currentUser) => set({ currentUser }),
  comment: "",
  setComment: (comment) => set({ comment }),
  listComment: [],
  setListComment: (listComment) => set({ listComment }),
  currentPost: {} as Post,
  listPost: [],
  listSearch: [],
  genres: [],
  title: "",
  content: "",
  imgLink: "",
  setCurrentPost: (currentPost) => set({ currentPost }),
  setListPost: (listPost) => set({ listPost }),
  setGenres: (genres) => set({ genres }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImgLink: (imgLink) => set({ imgLink }),
  handleGetAllPost: async () => {
    const response = await Posts.getAllPosts();
    set({ listPost: response.data });
  },
  handleGetPost: async (postId) => {
    const response = await Posts.getPost(postId);
    const data = response.data;
    set({ currentPost: data });
    set({
      content: data.content,
      title: data.title,
      imgLink: data.imgLink,
      genres: data.genres,
      listComment: data.comments,
    });
  },
  handleDeletePost: async (navigateFunction) => {
    set({ isLoading: true });
    try {
      await Posts.deletePost(get().currentPost._id!);
      set({ isLoading: false });
      alert("Delete success!");
      navigateFunction();
    } catch (error) {
      set({ isLoading: false });
      alert("Delete fail: " + error);
    }
  },
  handleCommentPost: async () => {
    const userStorage = localStorage.getItem("userStorage") ?? "";
    const userId = JSON.parse(userStorage).state.userId;
    if (!userId) {
      return;
    }
    //check empty comment
    if (get().comment.trim() === "") return set({ comment: "" });

    set({ isCommentLoading: true });
    try {
      const response = await Posts.commentPost(get().currentPost._id!, {
        content: get().comment,
      });
      set({
        comment: "",
        isCommentLoading: false,
        listComment: response.data.comments,
      });
    } catch (error) {
      console.log(error);
      set({ isCommentLoading: false });
    }
  },
  handleEditPost: async (onClose: () => void) => {
    set({ isLoading: true });
    let newPost: Post = {
      genres: get().genres,
      imgLink: get().imgLink,
      title: get().title,
      content: get().content,
    };

    try {
      const response = await Posts.updatePost(get().currentPost._id!, {
        ...newPost,
      });
      if (response) {
        set({ currentPost: response.data });
        onClose();
        set({ isLoading: false });
        alert("Edit post success");
      }
    } catch (error) {
      set({ isLoading: false });
      alert("Edit post fail: " + error);
    }
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
