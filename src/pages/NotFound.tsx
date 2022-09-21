import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box mt={"100px"} p="50px">
      <Text fontSize="3xl">
        404 <br />
        Page Not Found
      </Text>
      <p>Sorry, the page you were looking for does not exist.</p>
      <p>Go To Homepage by Button Below</p>
      <Button mt={"20px"}>
        <Link to="/" className="btn btn-outline-primary">
          Home Page
        </Link>
      </Button>
    </Box>
  );
};

export default NotFound;
