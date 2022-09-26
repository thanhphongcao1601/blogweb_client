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
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePostDetailStore } from "../zustand/PostDetailStore";

interface UserDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalEditPost: React.FC<UserDisclosureProps> = (props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const navigate = useNavigate();

  const {
    handleDeletePost,
    handleEditPost,
    genres,
    title,
    content,
    imgLink,
    setGenres,
    setContent,
    setImgLink,
    setTitle,
    isLoading,
  } = usePostDetailStore();

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
        <ModalHeader>Edit post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Genres</FormLabel>
            <Select
              value={genres?.at(0) ?? "other"}
              placeholder="Other"
              onChange={(e) => {
                setGenres([e.target.value]);
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
              ref={initialRef}
              placeholder="Title"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
            bg="tomato"
            onClick={() => {
              handleDeletePost(() => navigate("/"));
            }}
            colorScheme="red"
            mr={3}
          >
            Delete
          </Button>
          <Button
            onClick={() => handleEditPost(props.onClose)}
            colorScheme="blue"
            mr={3}
          >
            Save
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
