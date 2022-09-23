import create from "zustand";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { PostComment } from "../models/PostComment";
import { User } from "../models/User";

type State = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
  handleDeletePost: (navigate: () => void) => void;
  handleCommentPost: () => void;
  handleEditPost: (onClose: () => void) => void;
  handleGetPostByAuthorId: () => void;
  clearPostForm: () => void;
};

export const useStore = create<State>((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  listUserPost: [],
  setListUserPost: (listUserPost) => set({ listUserPost }),
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
    set({ isLoading: true });
    const userName = localStorage.getItem("userName") ?? "";
    console.log(userName);
    let newPost: Post = {
      genres: get().genres.length > 0 ? get().genres : ["other"],
      imgLink: get().imgLink,
      title: get().title,
      content: get().content,
    };
    try {
      const response = await Posts.addPost(newPost);
      //api request delay "chay bang com"
      setTimeout(function () {
        if (response) {
          set({ isLoading: false });
          console.log(response);
          set((state) => ({ listPost: [...state.listPost, response.data] }));
          //empty form
          set({
            content: "",
            title: "",
            imgLink: "",
            genres: ["other"],
          });
          onClose();
          setTimeout(() => {
            alert("Add post success");
          }, 200);
        }
      }, 1000);
    } catch (error) {
      set({ isLoading: false });
      setTimeout(() => {
        alert("Add post fail: " + error);
      }, 200);
    }
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
  handleDeletePost: async (navigateFunction) => {
    set({ isLoading: true });
    try {
      setTimeout(async () => {
        await Posts.deletePost(get().currentPost._id!);
        set({ isLoading: false });
        setTimeout(() => {
          alert("Delete success!");
          navigateFunction();
        }, 200);
      }, 1000);
    } catch (error) {
      set({ isLoading: false });
      setTimeout(() => {
        alert("Delete fail: " + error);
      }, 200);
    }
  },
  handleCommentPost: async () => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      return;
    }

    //check empty comment
    if (get().comment.trim() === "") return set({ comment: "" });

    set({ isLoading: true });


    try {
      setTimeout(async () => {
        const response = await Posts.commentPost(get().currentPost._id!, {
          content: get().comment,
        });
        set({
          comment: "",
          isLoading: false,
          listComment: response.data.comments,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
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
      setTimeout(() => {
        if (response) {
          set({ currentPost: response.data });
          onClose();
          console.log(response.data);
          set({ isLoading: false });
          setTimeout(() => {
            alert("Edit post success");
          }, 200);
        }
      }, 1000);
    } catch (error) {
      set({ isLoading: false });
      setTimeout(() => {
        alert("Edit post fail: " + error);
      }, 200);
    }
  },
  handleGetPostByAuthorId: async () => {
    const userId = localStorage.getItem("userId") ?? "";
    console.log(userId);
    const response = await Posts.getPostByAuthorId(userId);
    set({ listUserPost: response.data });
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
