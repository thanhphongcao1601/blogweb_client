import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Container,
  HStack,
  Textarea,
  Button,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ModalEditPost } from "../components/ModalEditPost";
import { PostAuthor } from "../components/PostAuthor";
import { PostComment } from "../components/PostComment";
import PostTags from "../components/PostTags";
import { useStore } from "../zustand/store";

export default function PostDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const {
    currentPost,
    comment,
    handleCommentPost,
    listComment,
    setComment,
    handleGetPost,
  } = useStore();

  const params = useParams();

  useEffect(() => {
    handleGetPost(String(params.postId));
  }, []);

  return (
    <>
      <ModalEditPost isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Container maxW={"7xl"} p="12" mt={"40px"}>
        <Box w="100%">
          <Box marginX={"50px"} borderRadius="lg" overflow="hidden">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                maxH={"50vh"}
                width={"100%"}
                fallbackSrc="https://via.placeholder.com/1200x300?text=No+Image"
                transform="scale(1.0)"
                src={currentPost.imgLink || ""}
                alt="no image"
                objectFit="cover"
                transition="0.3s ease-in-out"
              />
            </Link>
          </Box>
          <Flex justifyContent={"space-between"}>
            <PostAuthor
              name={currentPost.author?.name || ""}
              date={new Date(currentPost.createdAt || "")}
            />
            {currentPost.author?._id === userId ? (
              <Button mt={4} onClick={onOpen}>
                Edit
              </Button>
            ) : null}
          </Flex>
          <PostTags
            tags={
              currentPost.genres?.length > 0
                ? [...currentPost.genres]
                : ["unknown"]
            }
            marginTop="3"
          />
          <Heading fontSize="xl" marginTop="2">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {currentPost.title || "No title"}
            </Link>
          </Heading>
          <Text as="p" fontSize="md" marginTop="2">
            {currentPost.content || "ddddd"}
          </Text>
          <HStack alignItems={"flex-start"} mt="30px">
            <Image
              borderRadius="full"
              boxSize="50px"
              src="https://avatars.dicebear.com/api/male/username.svg"
              alt={`Avatar`}
            />
            <Box w="100%">
              <Textarea
                readOnly={userName ? false : true}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  userName
                    ? "Enter your comment"
                    : "You have to login to comment"
                }
              ></Textarea>
              <Flex>
                <Spacer />
                <Button
                  onClick={handleCommentPost}
                  alignSelf={"end"}
                  mt={"5px"}
                  justifyContent="right"
                >
                  {userName ? "Comment" : "Login now"}
                </Button>
              </Flex>
            </Box>
          </HStack>
          {listComment
            ?.slice(0)
            .reverse()
            .map((comment) => (
              <PostComment
                key={comment._id}
                name={comment.author.name}
                date={new Date(comment.createdAt ?? "")}
                comment={comment.content}
              />
            ))}
        </Box>
      </Container>
    </>
  );
}
