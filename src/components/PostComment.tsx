import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

interface PostCommentProps {
  date: Date;
  name: string;
  comment: string;
  avatarLink: string;
}

export const PostComment: React.FC<PostCommentProps> = (props) => {
  return (
    <HStack alignItems={"flex-start"} mt="10px">
      <Avatar borderRadius="full" boxSize="50px" src={props.avatarLink} />
      <Box w="100%">
        <Text fontWeight="medium">{props.name}</Text>
        <Text as="i" fontSize={"12px"}>
          {props.date.toLocaleTimeString().substring(0, 5) +
            " " +
            props.date.toLocaleDateString()}
        </Text>
        <Text>{props.comment}</Text>
      </Box>
    </HStack>
  );
};
