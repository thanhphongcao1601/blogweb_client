import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Container,
  Wrap,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { PostCard } from "../components/PostCard";
import { EditIcon } from "@chakra-ui/icons";
import { ModalEditProfile } from "../components/ModalEditProfile";
import { useEffect } from "react";
import { useProfileStore } from "../zustand/ProfileStore";
import { User } from "../models/User";
import { useStorage } from "../zustand/zustandStorage";

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, setCurrentUser, listUserPost, handleGetPostByAuthorId } =
    useProfileStore();
  const { userId, userName, avatarLink, email, token } = useStorage();

  useEffect(() => {
    setCurrentUser({
      userId: userId,
      userName: userName,
      avatarLink: avatarLink,
      token: token,
      email: email,
    } as User);
    handleGetPostByAuthorId();
  }, []);

  return (
    <>
      <ModalEditProfile isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Container maxW={"7xl"} p={0}>
        <Box
          mt="60px"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          position="relative"
        >
          <Box position={"absolute"} top="0" right="-1" zIndex="100">
            <Button onClick={onOpen}>
              Edit
              <EditIcon ml={"10px"} />
            </Button>
          </Box>
          <Image
            h={"240px"}
            w={"100%"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={currentUser.avatarLink}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>
          <Box pt={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {currentUser.userName}
              </Heading>
              <Text color={"gray.500"}>{currentUser.email}</Text>
            </Stack>
          </Box>
          {listUserPost.length > 0 ? (
            <Wrap px={6} py={6} spacing="30px" marginTop="5">
              {listUserPost
                .slice(0)
                .reverse()
                .map((post) => (
                  <PostCard
                    showDetail={false}
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
          ) : (
            <Center py={10}>
              <Text fontSize={"xl"}>You have no post</Text>
            </Center>
          )}
        </Box>
      </Container>
    </>
  );
}
