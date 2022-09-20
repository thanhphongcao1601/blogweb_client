import { useEffect } from "react";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { useStore } from "../zustand/store";

export function useHome() {
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const listPost = useStore((state) => state.listPost);
  const genres = useStore((state) => state.genres);
  const title = useStore((state) => state.title);
  const content = useStore((state) => state.content);
  const imgLink = useStore((state) => state.imgLink);

  const setListPost = useStore((state) => state.setListPost);
  const setGenres = useStore((state) => state.setGenres);
  const setTitle = useStore((state) => state.setTitle);
  const setContent = useStore((state) => state.setContent);
  const setImgLink = useStore((state) => state.setImgLink);

  useEffect(() => {
    setGenres([])
    setTitle("");
    setContent("")
    setImgLink("");
    handleGetAllPosts();
  }, []);

  function handleGetAllPosts() {
    console.log("fetch all");
    Posts.getAllPosts()
      .then(async (response) => {
        setListPost([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(onClose: () => void) {
    let newPost: Post = {
      genres: genres.length > 0 ? genres : ["other"],
      imgLink: imgLink,
      title: title,
      content: content,
    };

    Posts.addPost(newPost, { authorization: `Bearer ${token}` })
      .then((response) => {
        setListPost([...listPost, response.data]);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    handleGetAllPosts,
    handleSubmit,
    userName,
    token,
    listPost,
    title,
    content,
    imgLink,
    genres,
    setGenres,
    setTitle,
    setContent,
    setImgLink,
  };
}
