import React, {useEffect} from 'react'
import {Box, Stack, VStack, Text, Heading, HStack, Select} from "@chakra-ui/react"
import logo from "../../assets/images/jobWallpaper.png"
import styles from "../RegistrationForm/RegistrationForm.module.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createJobpost,
  updateJobpost,
  getjobDetails,
  getAlljobs,
} from "../../redux/actions/jobs";
import {toast} from 'react-hot-toast'



const inputStyle = {
    color:"#525252",
    fontSize: "0.8rem",
    width: "100%",
    border:" 1px solid black",
    borderRadius: "5px",
    padding: "5px",
    border: "1px solid #C2C2C2",
}

// add two more fields description and vacancy;

const Createjob = ({edit}) => {

  const dispatch = useDispatch();
  const {jobDetail, error, message, loading} = useSelector(state => state.jobs);
  const navigate = useNavigate();
    // console.log(jobDetails);
    const handleSubmit = async (form) =>{
        // console.log(e.target.form.companyName.value);
        const formvalues = {
          companyName: form.companyName.value,
          position: form.jobPosition.value,
          salary: form.salary.value,
          location: form.location.value,
          skills: form.skills.value.split(","),
          jobType: "Internship",
          vacancy: form.vacancy.value,
          description: form.description.value,
        };
        console.log(formvalues);
        if(edit){
          await dispatch(updateJobpost(formvalues, jobDetail?._id));
          dispatch(getjobDetails(jobDetail?._id));
          navigate(`/job/${jobDetail?._id}`);
        }else{
          await dispatch(createJobpost(formvalues));
          dispatch(getAlljobs());
          navigate("/");
        }
        
    }

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({type: "clearMessage"})
        }
        if(error){
            toast.error(error);
            dispatch({type: "clearError"})
        }
    }, [dispatch, message, error]);

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
         <Box w={"100%"}>
           <Formik
             initialValues={{
               companyName: edit ? jobDetail?.companyName: "",
               jobPosition: edit ? jobDetail?.position : "",
               salary: edit ? jobDetail?.salary : "",
               location: edit ? jobDetail?.location : "" ,
               skills: edit ? jobDetail?.skills.join(",") : "",
               jobType: "office",
               vacancy: edit ? jobDetail?.vacancy : "",
               description: edit ? jobDetail?.description : "" ,
             }}
             validationSchema={Yup.object({
               companyName: Yup.string()
                 .max(15, "Must be 15 characters or less")
                 .required("Required"),
               jobPosition: Yup.string().required("Required"),
               salary: Yup.string().required("Required"),
               location: Yup.string().required("Required"),
               vacancy: Yup.string().required("Required"),
               description: Yup.string().required("Required"),
               skills: Yup.string().required("Required"),
               jobType: Yup.string().required("Required"),
             })}
             onSubmit={(values)=>{
                console.log("submitted",values );
             }}
           >
             <Form
               style={{
                 width: "100%",
                 display: "flex",
                 flexDirection: "column",
                 gap: "20px",
               }}
             >
               <_TextField _name="companyName" _label="Company Name" />
               <_TextField _name="jobPosition" _label="Job Position" />
               <_TextField _name="salary" _label="Monthly Salary" />
               <_TextField _name="location" _label="Job location" />
               <_TextField _name="skills" _label="skills Required" />
               <_TextField _name="vacancy" _label="vacancy" />
               <_TextField _name="description" _label="description" />
               

               <button onClick={(e)=>handleSubmit(e.target.form)} type="submit">
                {edit? "Update Job" : "+Add Job"}
               </button>

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

export default Createjob

// <_SelectField _name="jobType" _label="job Type" />
const CustomSelectComponent = ({ field, form, props, _label }) => {
    return (
        <Select {...field} {...props} placeholder={_label}>
            <option value="red">Red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="yellow">blue</option>
        </Select>
    )
}

const _SelectField = ({_name, _label})=>{
    return (
      <HStack justifyContent="start" alignItems={"start"}>
        <Text fontSize={"md"} fontWeight="600" minW={"150px"} textAlign="left">
          {_label}
        </Text>
        <VStack
          flex={1}
          gap={0}
          alignItems="left"
          justifyContent={"start"}
          columnGap={0}
        >
          <Field
            name={_name}
            as={()=>CustomSelectComponent(_label)}
            placeholder={_label}
          />
          <Text mt="0" textAlign={"left"} color="red" fontSize={"xs"}>
            <ErrorMessage name={_name} />
          </Text>
        </VStack>
      </HStack>
    );
}


const _TextField = ({_label, _name})=>{
    return (
      <HStack justifyContent="start" alignItems={"start"}>
        <Text fontSize={"md"} fontWeight="600" minW={"150px"} textAlign="left">
          {_label}
        </Text>
        <VStack
          flex={1}
          gap={0}
          alignItems="left"
          justifyContent={"start"}
          columnGap={0}
        >
          <Field
            style={inputStyle}
            name={_name}
            type="text"
            placeholder={_label}
          />
          <Text mt="0" textAlign={"left"} color="red" fontSize={"xs"}>
            <ErrorMessage name={_name} />
          </Text>
        </VStack>
      </HStack>
    );
}
