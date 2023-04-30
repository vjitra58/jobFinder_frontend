import React, {useEffect} from 'react'
import {Box, Stack, VStack, Text, Heading} from "@chakra-ui/react"
import logo from "../../assets/images/background_image.png"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../RegistrationForm/RegistrationForm.module.css";
import { Link, useNavigate} from "react-router-dom";
import { login } from "../../redux/actions/user.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

     const dispatch = useDispatch();
      const navigate = useNavigate();
      const {isAuthenticated} = useSelector(state => state.user);
     const handleSubmit = async (values) => {
        // e.preventDefault();
        console.log("logiing with :" , values);
        dispatch(login(values.email, values.password));
     };

     useEffect(()=>{
        if(isAuthenticated){
          navigate("/");
        }
     }, [isAuthenticated]);
     
  return (
    <Stack direction={["column-reverse", "row"]} gap={0}>
      <VStack
        minW={"60vw"}
        // bg={"blue.300"}
        justifyContent={"center"}
        alignItems={"start"}
        px={20}
      >
        <Box mb={10}>
          <Heading>Already have an Account?</Heading>
          <Text fontSize="lg" fontWeight="400" color="#525252">
            Your personal job finder is here
          </Text>
        </Box>
        {/* here comes the form */}
        <Box w={"100%"} maxW={"1300px"}>
          <Formik
            initialValues={{
              
              email: "",
             
              password: "",
            }}
            validationSchema={Yup.object({
             
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
             
              password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum."),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSubmit(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form style={{width:"100%"}}>
              
              <div className={styles.formGroup}>
                <Field
                  className={styles.input_field}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" />
              </div>
              
              <div className={styles.formGroup}>
                <Field
                  className={styles.input_field}
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <ErrorMessage name="password" />
              </div>
            
              <button type="submit">Sign In</button>

              <p className={styles.text}>
                Don't have an account?{" "}
                <Link to="/register">
                  <span>Sign Up</span>
                </Link>
              </p>
            </Form>
          </Formik>
        </Box>
      </VStack>
      <Box
        flex={1}
        bgImage={logo}
        minH={"100vh"}
        backgroundSize="cover"
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        overflow={"hidden"}
      >
        <Text
          fontSize="3xl"
          fontWeight="500"
          textAlign={"center"}
          color="white"
          mt={10}
        >
          Your Personal Job Finder
        </Text>
      </Box>
    </Stack>
  );
}

export default Login