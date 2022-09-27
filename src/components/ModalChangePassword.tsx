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
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Auths, UserUpdate } from "../api/authRequest";
import { useStorage } from "../zustand/zustandStorage";

interface UserDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalChangePassword: React.FC<UserDisclosureProps> = (props) => {
  const { email } = useStorage();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function changePassword(onClose: () => void) {
    if (newPassword.length < 6) {
      setTimeout(() => {
        alert("Password must be at least 6 character");
      }, 200);
      return;
    }
    setIsLoading(true);
    try {
      const response = await Auths.changePassword({
        email: email,
        password: oldPassword,
        newPassword: newPassword,
      } as UserUpdate);
      setTimeout(async () => {
        if (response) {
          setOldPassword("");
          setNewPassword("");
          setIsLoading(false);
          setTimeout(() => {
            alert("Change password success!");
            onClose();
          }, 200);
        }
      }, 1000);
    } catch (error) {
      setOldPassword("");
      setNewPassword("");
      setIsLoading(false);
      alert("Password is not correct");
    }
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
        <ModalHeader>Change password</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Current Password</FormLabel>
            <Input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              ref={initialRef}
              type="password"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => changePassword(props.onClose)}
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
