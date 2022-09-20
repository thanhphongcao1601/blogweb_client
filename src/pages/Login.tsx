import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { useLogin } from "./Login.hooks";

export default function Login() {
  const {
    errMessage,
    email,
    setErrMessage,
    setEmail,
    password,
    setPassword,
    handleLogin,
  } = useLogin();
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          {errMessage ? (
            <Text textAlign={"center"} color={"red"}>
              {errMessage}
            </Text>
          ) : null}
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              type="email"
              onChange={(e) => {
                setErrMessage("");
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => {
                setErrMessage("");
                setPassword(e.target.value);
              }}
              type="password"
            />
          </FormControl>
          <Button colorScheme={"blue"} variant={"solid"} onClick={handleLogin}>
            Sign in
          </Button>
          <Text align={"center"}>
            Don't have an account?
            <Link as={ReachLink} to="/signup" color={"blue.400"}>
              {" "}
              Sign up now!
            </Link>
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
