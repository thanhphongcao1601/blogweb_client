import { Avatar, HStack, Image, Text } from "@chakra-ui/react";

interface PostAuthorProps {
  date: Date;
  name: string;
  avatarLink: string;
}

export const PostAuthor: React.FC<PostAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Avatar borderRadius="full" boxSize="40px" src={props.avatarLink || ""} />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};
