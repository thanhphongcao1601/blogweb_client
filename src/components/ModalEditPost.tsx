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
} from "@chakra-ui/react";
import React from "react";
import { usePostDetail } from "../pages/PostDetail.hooks";

interface UserDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalEditPost: React.FC<UserDisclosureProps> = (props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const {
    title,
    content,
    imgLink,
    genres,
    setGenres,
    setTitle,
    setContent,
    setImgLink,
    handleDeletePost,
    handleEditPost
  } = usePostDetail();

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your post</ModalHeader>
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
            onClick={() => handleDeletePost()}
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
