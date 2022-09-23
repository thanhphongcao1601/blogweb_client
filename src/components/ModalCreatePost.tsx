import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  ModalFooter,
  Button,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useStore } from "../zustand/store";

interface UserDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalCreatePost: React.FC<UserDisclosureProps> = (props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {
    title,
    content,
    imgLink,
    setGenres,
    setContent,
    setImgLink,
    setTitle,
    handleAddPost,
    isLoading,
  } = useStore();

  const [errMessage, setErrMessage] = useState("");

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <Flex
          zIndex={3}
          display={isLoading ? "flex" : "none"}
          height={"100%"}
          width="100%"
          bg="whiteAlpha.400"
          position={"absolute"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </Flex>
        <ModalHeader>Create your post</ModalHeader>
        <ModalCloseButton />
        {errMessage ? (
          <Text textAlign={"center"} color={"red"}>
            {errMessage}
          </Text>
        ) : null}
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Genres</FormLabel>
            <Select
              placeholder="Other"
              onChange={(e) => {
                setGenres([e.target.value]);
                console.log(e.target.value);
              }}
            >
              <option value="education">Education</option>
              <option value="technology">Technology</option>
              <option value="sport">Sport</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              ref={initialRef}
              isInvalid={content ? false : true}
              value={content}
              onChange={(e) => {
                setErrMessage("");
                setContent(e.target.value);
              }}
              isRequired
              placeholder="Content"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image link</FormLabel>
            <Input
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
              placeholder="Image link"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              if (!content) {
                return setErrMessage("Content not be null");
              } else {
                handleAddPost(props.onClose);
              }
            }}
            colorScheme="blue"
            mr={3}
          >
            Create
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
