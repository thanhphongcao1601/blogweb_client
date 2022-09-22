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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Auths, UserUpdate } from "../api/authRequest";
import { User } from "../models/User";
import { useStore } from "../zustand/store";

interface UserDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalEditProfile: React.FC<UserDisclosureProps> = (props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [userName, setUsername] = useState(
    localStorage.getItem("userName") ?? ""
  );
  const [avatarLink, setAvatarLink] = useState(
    localStorage.getItem("avatarLink") ?? "zzzzz"
  );

  const { currentUser, setCurrentUser } = useStore();

  function handleUpdateUser(onClose: () => void) {
    const token = localStorage.getItem("token") ?? "";
    const userId = localStorage.getItem("userId") ?? "";
    Auths.updateUser(
      userId,
      {
        name: userName,
        avatarLink: avatarLink,
      } as UserUpdate,
      { Authorization: `Bearer ${token}` }
    ).then((response) => {
      const data = response.data;
      var newCurrentUser: User = {
        userId: data.userId,
        userName: data.userName,
        token: currentUser.token,
        email: data.email,
        avatarLink: data.avatarLink,
      };
      setCurrentUser(newCurrentUser);
      localStorage.setItem("userName", response.data.userName);
      localStorage.setItem("avatarLink", response.data.avatarLink);
      onClose();
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
        <ModalHeader>Edit your profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Center>
            <Avatar
              size={"xl"}
              src={avatarLink}
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
              value={userName || ""}
              onChange={(e) => setUsername(e.target.value)}
              ref={initialRef}
              placeholder="Name"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image link</FormLabel>
            <Input
              value={avatarLink || ""}
              onChange={(e) => setAvatarLink(e.target.value)}
              placeholder="Image link"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              console.log(userName, avatarLink);
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
