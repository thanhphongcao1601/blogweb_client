import {
  Heading,
  Divider,
  Wrap,
  Container,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import { PostCard } from "../components/PostCard";
import { ModalCreatePost } from "../components/ModalCreatePost";
import { useEffect } from "react";
import { useHomeStore } from "../zustand/HomeStore";
import { useStorage } from "../zustand/zustandStorage";

function Home() {
  const {userName} = useStorage();
  const { listPost, handleGetAllPost, clearPostForm } = useHomeStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    handleGetAllPost();
  }, []);

  return (
    <>
      <ModalCreatePost isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Container maxW={"7xl"} p="12" mt={"40px"}>
        <Flex justifyContent={"space-between"}>
          <Heading as="h2">Latest post</Heading>
          {userName ? (
            <Button
              border={"2px"}
              borderColor={"blue.500"}
              onClick={() => {
                clearPostForm();
                onOpen();
              }}
            >
              Add Post
            </Button>
          ) : null}
        </Flex>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          {listPost
            .slice(0)
            .reverse()
            .slice(0, 15)
            .map((post) => (
              <PostCard
                showDetail={true}
                postId={post._id || ""}
                key={post._id}
                imgLink={post.imgLink || ""}
                title={post.title || "No title"}
                content={post.content || ""}
                genres={[...post.genres] ?? ["unknown"]}
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

export default Home;
