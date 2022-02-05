import { useQuery } from "react-query";
import React from "react";
import { Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../api";
import AddNewPost from "../Home/Component/AddNewPost";

const Post = () => {
    const { id } = useParams();

    const toast = useToast();

    const { data, isLoading} = useQuery(
        ["post", parseInt(id)],
        () => fetchPost(id),
        {
            keepPreviousData: true,
            onError : (error) => {
                toast({status: "error",title:error.message});
            },
        }
    );
    return (
        <Container maxW="1300px" mt="4">
            
            { isLoading ? (<Grid placeItems="center" height="100vh"><Spinner /></Grid>) :
                (<>
                    <AddNewPost isUpdate={true} id={data.data.id} />
                    <Stack p="4" mb="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc">
                        <Flex justify="space-between">
                            <Text>User ID: {data.data.user_id}</Text>
                            <Text>Post ID: {data.data.id}</Text>
                        </Flex>
                        <Heading fontSize="2xl">{data.data.title}</Heading>
                        <Text>{data.data.body}</Text>
                    </Stack>
                </>)
            }        
        </Container>
    );
};

export default Post;