import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Avatar,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Auths, UserUpdate } from "../api/authRequest";
import { User } from "../models/User";
import { useProfileStore } from "../zustand/ProfileStore";
import { useStorage } from "../zustand/zustandStorage";


interface UserDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalEditProfile: React.FC<UserDisclosureProps> = (props) => {
  const {userName, avatarLink, setUserName, setAvatarLink, userId} = useStorage();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { currentUser, setCurrentUser, isLoading, setIsLoading } =
    useProfileStore();
  const [newUserName, setNewUsername] = useState(
    userName ?? ""
  );
  const [newAvatarLink, setNewAvatarLink] = useState(
    avatarLink ?? ""
  );

  function handleUpdateUser(onClose: () => void) {
    setIsLoading(true);
    Auths.updateUser(userId, {
      name: newUserName,
      avatarLink: newAvatarLink,
    } as UserUpdate)
      .then((response) => {
        setIsLoading(false);
        const data = response.data;
        var newCurrentUser: User = {
          userId: data.userId,
          userName: data.userName,
          token: currentUser.token,
          email: data.email,
          avatarLink: data.avatarLink,
        };
        setCurrentUser(newCurrentUser);
        setUserName( response.data.userName);
        setAvatarLink(response.data.avatarLink);
        onClose();
        alert("Update user success!");
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Update user fail: " + error);
      });
  }

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
        <ModalHeader>Edit your profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Center>
            <Avatar
              size={"xl"}
              src={newAvatarLink}
              css={{
                border: "2px solid white",
              }}
            />
          </Center>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              variant="filled"
              isDisabled
              value={currentUser.email || ""}
              placeholder="Email"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={newUserName || ""}
              onChange={(e) => setNewUsername(e.target.value)}
              ref={initialRef}
              placeholder="Name"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image link</FormLabel>
            <Input
              value={newAvatarLink || ""}
              onChange={(e) => setNewAvatarLink(e.target.value)}
              placeholder="Image link"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              handleUpdateUser(props.onClose);
            }}
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
