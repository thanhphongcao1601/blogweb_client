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
import { useHome } from "./Home.hooks";
import { ModalCreatePost } from "../components/ModalCreatePost";

function Home() {
  const { userName, listPost } = useHome();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalCreatePost isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Container maxW={"7xl"} p="12" mt={"40px"}>
        <Flex justifyContent={"space-between"}>
          <Heading as="h2">Latest</Heading>
          {userName ? (
            <Button border={"2px"} borderColor={"green.100"} onClick={onOpen}>
              Add Post
            </Button>
          ) : null}
        </Flex>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          {listPost
            .slice(0)
            .reverse()
            .map((post) => (
              <PostCard
                postId={post._id || ""}
                key={post._id}
                imgLink={post.imgLink || ""}
                title={post.title || "No title"}
                content={post.content || ""}
                genres={[...post.genres] ?? ["unknown"]}
                author={post.author?.name || ""}
                date={new Date(post.createdAt || "")}
              />
            ))}
        </Wrap>
      </Container>
    </>
  );
}

export default Home;
