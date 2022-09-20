import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

export function useNavBar() {
  const userName = localStorage.getItem("userName");
  const { colorMode, toggleColorMode } = useColorMode();
  
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [listSearch, setListSearch] = useState([] as Post[]);

  function handleLogout() {
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
        const data = response.data;
        setListSearch((listSearch) => []);
        data.map((post) =>
          setListSearch((listSearch) => [...listSearch, post])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return {
    userName,
    colorMode,
    toggleColorMode,
    searchValue,
    setSearchValue,
    listSearch,
    setListSearch,
    handleLogout,
    handleSearch,
    navigate
  };
}
