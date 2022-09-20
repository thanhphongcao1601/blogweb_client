import {
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface SearchItemProps {
  postId: string;
  imgLink: string;
  title: string;
  content: string;
}

export const SearchItem: React.FC<SearchItemProps> = (props) => {
  return (
    <Flex bg={useColorModeValue("gray.100", "gray.900")}>
      <Image
        margin={"10px"}
        borderRadius={"lg"}
        fallbackSrc="https://via.placeholder.com/150x100?text=No+Image"
        transform="scale(1.0)"
        src={props.imgLink}
        alt="some text"
        objectFit="cover"
        height={"80px"}
        minWidth="120px"
        maxWidth={"120px"}
      />
      <Flex direction={"column"} margin={"10px"}>
        <Heading textAlign={"left"} fontSize="lg">
          <Text noOfLines={[1]}>{props.title}</Text>
        </Heading>
        <Text noOfLines={[1, 2]}>{props.content}</Text>
      </Flex>
    </Flex>
  );
};
