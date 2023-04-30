import { Box, Container, Button, Text, Input, Stack, HStack, VStack, Image } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { jobData } from '../../assets/data/jobdata.js';
import { getAlljobs } from '../../redux/actions/jobs.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {Link} from "react-router-dom"
import Loader from "../Layout/Loader.js"
import logo from "../../assets/images/company_logo.png"
import { BsPeopleFill, BsCurrencyRupee } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";



const Home = () => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState([]);
    const [position, setPosition] = useState("");
    const dispatch = useDispatch();
 
    const removeCategory = (selected) => {
        setCategory(category.filter((item) => item !== selected));
    }

     const { loading, jobs, error , message} = useSelector(
       (state) => state.jobs
     );

     useEffect(() => {
      console.log("getting all jobs");
      // let cat = category.join(",");
       dispatch(getAlljobs(category, position));
       console.log(jobs)
     }, [dispatch , category, position]);
     

  if(loading){
    return (
      <Loader />
    )
  }
  return (
    <Container
      minH={"88vh"}
      maxW="container.lg"
      //   backgroundColor={"yellow.100"}
      pt={8}
    >
      <VStack w={"100%"} shadow="2px 2px 10px #FFc2c2" rounded="sm" my={10}>
        <HStack w={"100%"} p={4} gap={5}>
          <Text fontSize={"md"} fontWeight="600" minW="fit-content">
            Search By Role
          </Text>
          <Input
            maxW={"100%"}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Search by position..."
            type={"text"}
            autoFocus
            focusBorderColor="red.400"
          />
          <Link to={"/createjob"}>
            <Button
              fontWeight={"600"}
              size="sm"
              colorScheme={"red.400"}
              bg={"red.400"}
            >
              +New JobPost
            </Button>
          </Link>
        </HStack>
        <Stack
          w={"100%"}
          direction={["column", "row"]}
          justifyContent={"start"}
          p={4}
        >
          <Input
            maxW={["100%", "200px"]}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search a course..."
            type={"text"}
            focusBorderColor="red.400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCategory((prev) => [...prev, e.target.value]);
                setKeyword("");
              }
            }}
          />

          <HStack
            backgroundColor={"white"}
            overflowX="scroll"
            flex={"1"}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {category.map((item, index) => (
              <Button
                backgroundColor={"red.100"}
                minW="fit-content"
                key={index}
                onClick={() => removeCategory(item)}
              >
                <Text color="black" children={item} />
              </Button>
            ))}
          </HStack>
          <Button
            color={"red.400"}
            variant={"ghost"}
            onClick={() => setCategory([])}
          >
            Clear
          </Button>
        </Stack>
      </VStack>

      {/*this is the job list */}
      <VStack justifyContent={"start"} alignItems="center" gap={4}>
        {jobs &&
          jobs.map((item, index) => (
            <HStack
              key={index}
              justifyContent={"space-between"}
              alignItems="center"
              w={"100%"}
              shadow="2px 2px 30px #FFc2c2"
              rounded="sm"
              pl={8}
              py={4}
            >
              {/*this is left part */}
              <HStack key={index} w={"100%"}>
                <Image
                  src={logo}
                  boxSize="50px"
                  objectFit="cover"
                  alt={"company logo"}
                />

                <VStack alignItems="start" px={8}>
                  <Text fontWeight={"600"}>{item.position}</Text>
                  <HStack gap={5}>
                    <Block icon={<BsPeopleFill />} content={item.vacancy} />
                    <Block icon={<BsCurrencyRupee />} content={item.salary} />
                    <Block
                      icon={<HiLocationMarker />}
                      content={item.location}
                    />
                  </HStack>
                  <HStack gap={10}>
                    <Text color="red.500" fontSize="sm">
                      {item.workfrom}
                    </Text>
                    <Text color="red.500" fontSize="sm">
                      {item.type}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              {/*this is right part */}
              <VStack justifyContent={"space-between"} alignItems="end" px={8}>
                <HStack>
                  {item.skills.map((skill, index) => (
                    <Text
                      key={index}
                      fontSize={"sm"}
                      bg={"#ffc2c2"}
                      p={1}
                      minW={"70px"}
                      textAlign="center"
                      w={"fit-content"}
                    >
                      {skill}
                    </Text>
                  ))}
                </HStack>
                <Link to={`/job/${item._id}`}>
                  <Button
                    fontWeight={"600"}
                    size="sm"
                    colorScheme={"red.400"}
                    bg={"red.400"}
                  >
                    view details
                  </Button>
                </Link>
              </VStack>
            </HStack>
          ))}
      </VStack>
    </Container>
  );
}

export default Home


const Block = ({content, icon}) => {
    return (
      <HStack justifyContent={"center"} alignItems="center">
        <Text color={"#919191"}>{icon}</Text>
        <Text color={"#919191"}>{content}</Text>
      </HStack>
    );
}