import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { PostComment } from "../models/PostComment";
import { useStore } from "../zustand/store";

export function usePostDetail() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const currentPost = useStore((state) => state.currentPost);
  const setCurrentPost = useStore((state) => state.setCurrentPost);

  const genres = useStore((state) => state.genres);
  const title = useStore((state) => state.title);
  const content = useStore((state) => state.content);
  const imgLink = useStore((state) => state.imgLink);

  const setGenres = useStore((state) => state.setGenres);
  const setTitle = useStore((state) => state.setTitle);
  const setContent = useStore((state) => state.setContent);
  const setImgLink = useStore((state) => state.setImgLink);

  const [newComment, setNewComment] = useState("");
  const [listComment, setListComment] = useState([] as PostComment[]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetPost();
  }, []);

  function handleDeletePost() {
    Posts.deletePost(currentPost._id ?? "", {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditPost(onClose: () => void) {
    let newPost: Post = {
      genres: genres,
      imgLink: imgLink,
      title: title,
      content: content,
    };

    Posts.updatePost(
      currentPost._id!,
      { ...newPost },
      { Authorization: `Bearer ${token}` }
    )
      .then((response) => {
        setCurrentPost(response.data);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGetPost() {
    Posts.getPost(String(params.postId))
      .then((response) => {
        const data = response.data;
        setCurrentPost(data);
        setGenres(data.genres)
        setTitle(data.title);
        setContent(data.content)
        setImgLink(data.imgLink ?? "");
        setListComment([...(response.data.comments ?? [])]);
        console.log(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleComment() {
    if (!userName) {
      navigate("/login");
      return;
    }

    //check empty comment
    if (newComment.trim() === "") return setNewComment("");

    Posts.commentPost(
      currentPost._id || "",
      { content: newComment },
      { Authorization: `Bearer ${token}` }
    )
      .then((response) => {
        setNewComment("");
        setListComment([...(response.data.comments ?? [])]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    token,
    userName,
    currentPost,
    setCurrentPost,
    handleComment,
    handleGetPost,
    newComment,
    setNewComment,
    listComment,
    setListComment,
    title,
    content,
    imgLink,
    genres,
    setGenres,
    setTitle,
    setContent,
    setImgLink,
    handleDeletePost,
    handleEditPost
  };
}
