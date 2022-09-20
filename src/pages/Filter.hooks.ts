import { useState } from "react";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

export function useFilter(){
    const [listSearch, setListSearch] = useState([] as Post[]);

    function handleFilter(filterValue: string) {
      Posts.filterPost(filterValue)
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
    return {listSearch, setListSearch, handleFilter}
}