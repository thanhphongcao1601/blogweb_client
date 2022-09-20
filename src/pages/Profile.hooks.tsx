import { useState, useEffect } from "react";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

export function useProfile() {
  const email = localStorage.getItem("email");
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId") ?? "";
  const [listUserPost, setListUserPost] = useState([] as Post[]);

  function getPostByAuthorId() {
    Posts.getPostByAuthorId(userId)
      .then((response) => {
        setListUserPost([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPostByAuthorId();
  }, []);

  return {
    email,
    userName,
    userId,
    listUserPost,
  };
}
