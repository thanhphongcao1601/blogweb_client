import { Box, Link, WrapItem, Image, Heading, Text } from "@chakra-ui/react";
import { PostAuthor } from "./PostAuthor";
import PostTags from "./PostTags";
import { Link as ReachLink } from "react-router-dom";

interface PostCardProps {
  postId: string;
  imgLink: string;
  title: string;
  content: string;
  genres: Array<string>;
  author: string;
  date: Date;
  avatarLink: string;
}

export const PostCard: React.FC<PostCardProps> = (props) => {
  return (
    <WrapItem width={{ base: "100%", sm: "100%", md: "45%", lg: "30%" }}>
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <Link
            as={ReachLink}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            to={`/postdetail/${props.postId}`}
          >
            <Image
              height={250}
              fallbackSrc="https://via.placeholder.com/150x100?text=No+Image"
              transform="scale(1.0)"
              src={props.imgLink}
              alt="some text"
              objectFit="cover"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Link>
        </Box>
        <PostTags tags={props.genres} marginTop="3" />
        <Heading fontSize="xl" marginTop="2">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Text noOfLines={[1, 2]}>{props.title}</Text>
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2" noOfLines={[1, 5]}>
          {props.content}
        </Text>
        <PostAuthor name={props.author} date={props.date} avatarLink={props.avatarLink} />
      </Box>
    </WrapItem>
  );
};
