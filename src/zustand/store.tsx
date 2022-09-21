import create from "zustand";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { PostComment } from "../models/PostComment";
import { User } from "../models/User";

const userName = localStorage.getItem("userName") ?? "";
const token = localStorage.getItem("token") ?? "";
const userId = localStorage.getItem("UserId") ?? "";
const avatarLink = localStorage.getItem("avatarLink") ?? "";
const email = localStorage.getItem("email") ?? "";

type State = {
  listUserPost: Post[];
  setListUserPost: (listUserPost: Post[]) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  comment: string;
  setComment: (comment: string) => void;
  listComment: PostComment[];
  setListComment: (listComment: PostComment[]) => void;
  currentPost: Post;
  listPost: Post[];
  listSearch: Post[];
  genres: string[];
  title: string;
  content: string;
  imgLink: string;
  setCurrentPost: (currentPost: Post) => void;
  setListPost: (listPost: Post[]) => void;
  setListSearch: (listSearch: Post[]) => void;
  setGenres: (genres: string[]) => void;
  setContent: (content: string) => void;
  setImgLink: (imgLink: string) => void;
  setTitle: (title: string) => void;
  handleFilter: (filterString: string) => void;
  handleAddPost: (onClose: () => void) => void;
  handleGetAllPost: () => void;
  handleGetPost: (postId: string) => void;
  handleDeletePost: () => void;
  handleCommentPost: () => void;
  handleEditPost: (onClose: () => void) => void;
  handleGetPostByAuthorId: () => void;
};

export const useStore = create<State>((set, get) => ({
  listUserPost: [],
  setListUserPost: (listUserPost) => set({ listUserPost }),
  currentUser: {
    userName: userName,
    userId: userId,
    token: token,
    email: email,
    avatarLink: avatarLink,
  },
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
  setListSearch: (listSearch) => set({ listSearch }),
  setGenres: (genres) => set({ genres }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImgLink: (imgLink) => set({ imgLink }),
  handleFilter: async (filterString) => {
    const response = await Posts.filterPost(filterString);
    set({ listSearch: await response.data });
  },
  handleAddPost: async (onClose) => {
    let newPost: Post = {
      genres: get().genres.length > 0 ? get().genres : ["other"],
      imgLink: get().imgLink,
      title: get().title,
      content: get().content,
    };

    const response = await Posts.addPost(newPost, {
      authorization: `Bearer ${token}`,
    });
    set((state) => ({ listPost: [...state.listPost, response.data] }));
    //empty form
    set({
      content: "",
      title: "",
      imgLink: "",
      genres: ["other"],
    });
    onClose();
  },
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
  handleDeletePost: async () => {
    await Posts.deletePost(get().currentPost._id!, {
      Authorization: `Bearer ${token}`,
    });
  },
  handleCommentPost: async () => {
    if (!userName) {
      return;
    }

    //check empty comment
    if (get().comment.trim() === "") return set({ comment: "" });

    const response = await Posts.commentPost(
      get().currentPost._id!,
      { content: get().comment },
      { Authorization: `Bearer ${token}` }
    );
    set({ comment: "", listComment: response.data.comments });
  },
  handleEditPost: async (onClose: () => void) => {
    console.log(get().currentPost);
    let newPost: Post = {
      genres: get().genres,
      imgLink: get().imgLink,
      title: get().title,
      content: get().content,
    };

    const response = await Posts.updatePost(
      get().currentPost._id!,
      { ...newPost },
      { Authorization: `Bearer ${token}` }
    );
    set({ currentPost: response.data });
    onClose();
    console.log(response.data);
  },
  handleGetPostByAuthorId: async () => {
    const response = await Posts.getPostByAuthorId(userId);
    set({ listUserPost: response.data });
  },
}));
