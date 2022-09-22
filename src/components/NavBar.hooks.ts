import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { useStore } from "../zustand/store";

export function useNavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [listSearch, setListSearch] = useState([] as Post[]);
  const { setCurrentUser } = useStore();

  function handleLogout() {
    setCurrentUser({} as User);
    localStorage.clear();
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
    navigate,
  };
}
