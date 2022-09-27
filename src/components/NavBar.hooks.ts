import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { useProfileStore } from "../zustand/ProfileStore";
import { useStorage } from "../zustand/zustandStorage";

export function useNavBar() {
  const {
    userName,
    userId,
    avatarLink,
    email,
    setUserName,
    setUserId,
    setAvatarLink,
    setEmail,
    setToken,
  } = useStorage();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const [searchValue, setSearchValue] = useState("");
  const [listSearch, setListSearch] = useState([] as Post[]);

  const { setCurrentUser, currentUser } = useProfileStore();

  useEffect(() => {
    setCurrentUser({
      userName: userName ?? "",
      avatarLink: avatarLink ?? "",
      email: email ?? "",
      userId: userId ?? "",
    } as User);
  }, []);

  function handleLogout() {
    setCurrentUser({} as User);
    setToken("");
    setUserId("");
    setUserName("");
    setAvatarLink("");
    setEmail("");
    navigate("/login", { replace: true });
  }

  function handleSearch() {
    if (searchValue.trim() === "") {
      setListSearch([]);
      return;
    }
    Posts.searchPost(searchValue)
      .then((response) => {
        setListSearch(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return {
    colorMode,
    toggleColorMode,
    searchValue,
    setSearchValue,
    listSearch,
    setListSearch,
    handleLogout,
    handleSearch,
    setCurrentUser,
    currentUser,
  };
}
