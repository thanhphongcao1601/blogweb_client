import { HStack, Image, Text } from "@chakra-ui/react";

interface PostAuthorProps {
  date: Date;
  name: string;
}

export const PostAuthor: React.FC<PostAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://avatars.dicebear.com/api/male/username.svg"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};
