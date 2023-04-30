import React from "react";
import { Box, Stack, VStack, Text, Heading } from "@chakra-ui/react";
import logo from "../../assets/images/background_image.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../RegistrationForm/RegistrationForm.module.css";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/user.js";
import { useDispatch } from "react-redux";



const Login = () => {

  const dispatch = useDispatch();

   const handleSubmit = async (values) => {
      // console.log("registering with : ", values);

      // const formdata = new FormData();
      // formdata.append("name", values.name);
      // formdata.append("email", values.email);
      // formdata.append("mobile", values.mobile);
      // formdata.append("password", values.password);
      // console.log("registering with ", formdata);

      dispatch(register(values));
   };

  return (
    <Stack direction={["column-reverse", "row"]} gap={0}>
      <VStack
        minW={"60vw"}
        // bg={"blue.300"}
        justifyContent={"center"}
        alignItems={"start"}
        px={20}
        py={10}
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
              name: "",
              email: "",
              mobile: "",
              password: "",
              toggle: false,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              mobile: Yup.string()
                .required("Required")
                .length(10, "not a valid mobile number")
                .matches(/^[0-9]+$/, "not a valid mobile number"),
              password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum."),
              toggle: Yup.boolean().oneOf(
                [true],
                "Must Accept Terms and Conditions"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSubmit(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form style={{ width: "100%" }}>
              <div className={styles.formGroup}>
                <Field
                  className={styles.input_field}
                  name="name"
                  type="text"
                  placeholder="name"
                />
                <ErrorMessage name="name" />
              </div>
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
                  name="mobile"
                  type="text"
                  placeholder="Mobile"
                />
                <ErrorMessage name="mobile" />
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

              <div className={styles.formGroup}>
                <div>
                  <Field type="checkbox" name="toggle" />
                  <span>
                    By creating an account, I agree to our terms of use and
                    privacy policy
                  </span>
                </div>
                <ErrorMessage name="toggle" />
              </div>

              <button type="submit">Create Account</button>

              <p className={styles.text}>
                Already have an account?{" "}
                <Link to="/login">
                  <span>Sign In</span>
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
};

export default Login;
