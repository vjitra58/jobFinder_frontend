import React from 'react'
import {Box, Text, HStack, Stack, VStack, Button, Image} from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/user.js';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }


  return (
    <Box
      zIndex={20}
      position={"fixed"}
      top={0}
      minW={"100vw"}
      h="12vh"
      maxH={"100px"}
      backgroundColor={"red.400"}
      py={4}
      px={16}
      borderBottomEndRadius={30}
      borderBottomStartRadius={30}
    >
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/">
          <Text
            color={"white"}
            fontSize="xl"
            fontWeight="700"
            letterSpacing={"0.5px"}
          >
            JobFinder
          </Text>
        </Link>
        {isAuthenticated ? (
          <HStack>
            <Button
              onClick={handleLogout}
              px={4}
              color="white"
              variant={"link"}
              size={"sm"}
            >
              Logout
            </Button>
            <Text color="white">Hello! {"vikas"}</Text>

            <Image
              fit={"cover"}
              borderRadius="full"
              boxSize="40px"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
            />
          </HStack>
        ) : (
          <HStack gap={8}>
            <Link to="/login">
              <Button
                w={"100px"}
                px={4}
                colorScheme="whiteAlpha"
                // background={"transparent"}
                size={"sm"}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button w={"100px"} px={4} colorScheme="whiteAlpha" size="sm">
                Register
              </Button>
            </Link>
          </HStack>
        )}
      </Stack>
    </Box>
  );
}

export default Header