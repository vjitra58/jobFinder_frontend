import React, {useEffect} from 'react'
import { Container, Box, Text, VStack, HStack, Stack, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getjobDetails, deleteJob } from "../../redux/actions/jobs.js";
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader.js';
import { toast } from "react-hot-toast";

const Showjob = () => {
  
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobDetail, loading, error, message } = useSelector((state) => state.jobs);
  const {isAuthenticated, user} = useSelector((state) => state.user);

  const handleEditJob = () =>{
    console.log("edit job");
    navigate(`/editjob/${param.id}`);
  }

  const handleDeleteJob = async () =>{
    console.log("delete job");
    await dispatch(deleteJob(param.id));
    navigate("/");
  }

  useEffect(() => {
    dispatch(getjobDetails(param.id));
    
  }, [dispatch, param.id]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [message, error]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            py={4}
            px={12}
            bg={"orange.200"}
            zIndex={40}
            position="fixed"
            top={"50px"}
            left={"50%"}
            ml={"-475px"}
            w={"950px"}
            borderRadius={5}
          >
            <Text fontSize={"xl"} fontWeight="600" textAlign={"center"}>
              {jobDetail?.position}
              {" / "}
              {jobDetail?.companyName}
              {" / "}
              {jobDetail?.workFrom}
              {" / "}
              {jobDetail?.location}
            </Text>
          </Box>
          <Container
            minH={"100vh"}
            h={"fit-content"}
            maxW="container.lg"
            bg={"white"}
            my={32}
            px={8}
            shadow={"md"}
          >
            <Box py={8} px={1}>
              <VStack alignItems={"start"}>
                <Text color={"#999999"}>
                  1w ago {" ."}
                  {job.type}
                </Text>

                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Heading>{jobDetail?.position}</Heading>
                  {isAuthenticated && (
                    <Button
                      onClick={handleEditJob}
                      size={"sm"}
                      px={8}
                      colorScheme="red"
                    >
                      Edit job
                    </Button>
                  )}
                </HStack>
                <Text color="red"> {jobDetail?.location}</Text>

                <Box py={8}>
                  <HStack
                    justifyContent={"start"}
                    alignItems={"center"}
                    gap={16}
                  >
                    <VStack alignItems={"start"}>
                      <Text fontWeight={"600"}>Stipend</Text>
                      <Text>Rs {jobDetail?.salary}/month</Text>
                    </VStack>
                    <VStack alignItems={"start"}>
                      <Text fontWeight={"600"}>Duration</Text>
                      <Text>6 Months</Text>
                    </VStack>
                  </HStack>
                </Box>
                <Text fontSize={"lg"} fontWeight="700" pb={4}>
                  About Company
                </Text>
                <Text fontSize={"md"}>
                  We provide technology-based services to help businesses and
                  organizations achieve their goals. We offer a wide range of
                  services, including software development, system integration,
                  network and security services, cloud computing, and data
                  analytics. Our primary focus is on leveraging technology to
                  streamline business processes, improve productivity, and
                  enhance overall efficiency.
                </Text>
                <Text py={4} fontSize={"lg"} fontWeight="700">
                  About the job/internship
                </Text>
                <Text fontSize={"md"}>
                  We are looking for a responsible PHP/WordPress/Laravel/Shopify
                  Developer. He/She will be liable for managing services and
                  therefore the interchange of knowledge between the server and
                  the users. The candidate's primary focus is going to be the
                  event of all server-side logic, definition, and maintenance of
                  the central database and ensuring high performance and
                  responsiveness to requests from the front end. Selected
                  intern's day-to-day responsibilities include: 1. Work on the
                  development of theme customization, liquid programming
                  language, and corresponding apps 2. Implement system
                  integrations that are crucial to our success 3. Contribute to
                  the development of HTML5/CSS/JavaScript and standard web
                  technologies integral to building seamless multi-channel
                  experiences 4. Work on speed optimization and making a
                  mobile-friendly website
                </Text>
                <Text py={4} fontSize={"lg"} fontWeight="700">
                  Skill(s) required
                </Text>
                <HStack>
                  {jobDetail?.skills.map((skill, index) => (
                    <Button
                      key={index}
                      size={"sm"}
                      px={8}
                      disabled={true}
                      colorScheme="red"
                    >
                      {skill}
                    </Button>
                  ))}
                </HStack>
                <Text py={4} fontSize={"lg"} fontWeight="700">
                  Additional Information
                </Text>

                <Text fontSize={"md"}>
                  Stipend structure: This is a performance-based internship. In
                  addition to the minimum-assured stipend, you will also be paid
                  a performance-linked incentive (₹ 2500 per design).
                </Text>
                <HStack
                  w={"100%"}
                  justifyContent={"end"}
                  alignItems="center"
                  mt="10"
                >
                  {isAuthenticated && (
                    <Button
                      size={"md"}
                      px={8}
                      onClick={handleDeleteJob}
                      colorScheme="red"
                    >
                      Delete jobPost
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default Showjob

const job = {
  logo: "https://logowik.com/content/uploads/images/adobe-experience-cloud-cc3954.jpg",
  company: "Adobe",
  position: "Frontend Developer",
  location: "Delhi",
  workfrom: "Remote",
  salary: "100k",
  type: "Full Time",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam mauris, vitae ultricies nunc nunc vel mauris. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam mauris, vitae ultricies nunc nunc vel mauris.",
  vacancy: 2,
  skills: ["HTML", "CSS", "JavaScript", "React"],
};