import {
  Heading,
  Divider,
  Wrap,
  Container,
  Flex,
  Select,
} from "@chakra-ui/react";

import { PostCard } from "../components/PostCard";
import { useEffect } from "react";
import { useFilterStore } from "../zustand/FilterStore";

function Filter() {
  const { listFilter, handleFilter } = useFilterStore();

  useEffect(() => {
    handleFilter("");
  }, []);

  return (
    <>
      <Container maxW={"7xl"} p="12" mt={"40px"}>
        <Flex>
          <Heading w={"100%"} as="h2">
            Select genre
          </Heading>
          <Select
            placeholder="All"
            onChange={(e) => {
              handleFilter(e.target.value);
            }}
          >
            <option value="education">Education</option>
            <option value="technology">Technology</option>
            <option value="sport">Sport</option>
            <option value="other">Other</option>
          </Select>
        </Flex>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          {listFilter.slice(0).reverse().map((post) => (
            <PostCard
              showDetail={true}
              postId={post._id || ""}
              key={post._id}
              imgLink={post.imgLink || ""}
              title={post.title || "No title"}
              content={post.content || ""}
              genres={post.genres.length > 0 ? [...post.genres] : ["unknown"]}
              author={post.author?.name || ""}
              date={new Date(post.createdAt || "")}
              avatarLink={post.author?.avatarLink || ""}
            />
          ))}
        </Wrap>
      </Container>
    </>
  );
}

export default Filter;
