import React from 'react'
import styles from "./Registration.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx"
import {Box, VStack, HStack, Stack} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react';


const Registration = () => {
  return (
    <Box minh="100vh" w="100vw" overflow={"hidden"}>
      <Stack direction={["column-reverse", "row"]} overflow={"hidden"}>
        <Box className={styles.left_part} overflow={"scroll"}>
          <RegistrationForm />
        </Box>
        <Box h="100vh" className={styles.right_part}>
          <p>Your Personal Job Finder</p>
        </Box>
      </Stack>
    </Box>
  );
}

export default Registration