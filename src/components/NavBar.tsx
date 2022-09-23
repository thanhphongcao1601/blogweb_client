import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { ModalChangePassword } from "./ModalChangePassword";
import { useNavBar } from "./NavBar.hooks";
import { SearchItem } from "./SearchItem";

export default function NavBar() {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    colorMode,
    toggleColorMode,
    searchValue,
    setSearchValue,
    listSearch,
    setListSearch,
    handleLogout,
    handleSearch,
    currentUser,
  } = useNavBar();

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      position="fixed"
      zIndex={"1000"}
      top="0px"
      w={"100%"}
    >
      <ModalChangePassword isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Link as={ReachLink} to="/">
            <Image
              height={"50px"}
              w="100%"
              src="https://upload.wikimedia.org/wikipedia/vi/0/02/DotBlog_domain_logo.png?20220816010636"
            />
          </Link>
        </Box>
        <Center>
          <InputGroup position={"absolute"} size="md" w={"50%"}>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={handleSearch}
              borderRadius="lg"
              border={"2px"}
              placeholder="search post"
            />
            <InputRightElement width="4.5rem">
              <Button onClick={() => navigate("/filter")} h="1.75rem" size="sm">
                Filter
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box top="60px" position="absolute" width={"50%"}>
            {listSearch
              .slice(0, 5)
              .reverse()
              .map((post) => (
                <Box
                  key={post._id}
                  onClick={() => {
                    setSearchValue("");
                    setListSearch([]);
                    navigate(`/postdetail/${post._id}`);
                  }}
                >
                  <SearchItem
                    postId={post._id || ""}
                    imgLink={post.imgLink || ""}
                    title={post.title || ""}
                    content={post.content || ""}
                  />
                </Box>
              ))}
          </Box>
        </Center>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={2}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {userName ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={currentUser.avatarLink} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={currentUser.avatarLink} />
                  </Center>
                  <br />
                  <Center>
                    <p>{userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => navigate("/profile")}>
                    Your Profile
                  </MenuItem>
                  <MenuItem onClick={onOpen}>Change Password</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Box paddingTop="10px">
                <Link as={ReachLink} to="/login">
                  Login
                </Link>
              </Box>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
