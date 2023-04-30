import React from 'react'
import styles from "./RegistrationForm.module.css"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup";
import axios from "axios";
// import { Button } from '@chakra-ui/react';
import {Link} from "react-router-dom";

const RegistrationForm = () => {

  const handleSubmit = async (values) => {
    const {name, email, mobile, password} = values;
    await axios.post("http://localhost:4000/api/v1/user/register", {
      name, email, password, mobile
    }).then((res)=>{
      console.log("registration successfull");
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  };


  return (
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
        email: Yup.string().email("Invalid email address").required("Required"),
        mobile: Yup.string()
          .required("Required")
          .length(10, "not a valid mobile number")
          .matches(/^[0-9]+$/, "not a valid mobile number"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum."),
        toggle: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleSubmit(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className={styles.form}>
        <h1>Create an Account</h1>
        <p>Your personal job finder is here</p>
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
              By creating an account, I agree to our terms of use and privacy
              policy
            </span>
          </div>
          <ErrorMessage name="toggle" />
        </div>

        <button type="submit">
          Create Account
        </button>

        <p className={styles.text}>
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </p>
      </Form>
    </Formik>
  );
}

export default RegistrationForm