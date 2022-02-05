import { useMutation, useQuery, useQueryClient } from "react-query";
import React from "react";
import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddNewPost from "./Component/AddNewPost";
import { deletePost, fetchPosts } from "../api";

const Home = () => {

    const cache = useQueryClient();
    const { id } = useParams();
    console.log(id);
    const pageId = parseInt(id);

    const navigate = useNavigate();

    const toast = useToast();

    const { data, isLoading} = useQuery(
        ["posts", pageId],
        () => fetchPosts(pageId),
        {

            onError : (error) => {
                toast({status: "error",title:error.message});
            },
        }
    );

    const { isLoading: isMutating, mutateAsync } = useMutation(
        "deletePost", 
        deletePost,
        {

            onError : (error) => {
                toast({status: "error",title:error.message});
            },
            onSuccess: () => {
                cache.invalidateQueries("posts")
            }
        }
    );
    return (
        <Container maxW="1300px" mt="4">
            
            { isLoading ? (<Grid placeItems="center" height="100vh"><Spinner /></Grid>) :
                (<>
                    <AddNewPost />
                    <Flex justify="space-between" mb="4">
                        <Button 
                            colorScheme="red" 
                            onClick={() => {
                                if(data.meta.pagination.links.previous !== null) {
                                    navigate(`/${pageId - 1}`)
                                }
                            }}
                            disabled={data.meta.pagination.links.previous === null}
                        >Prev</Button>
                        <Text>Current page: {pageId}</Text>
                        <Button 
                            colorScheme="green"
                            onClick={() => {
                                navigate(`/${pageId + 1}`)
                            }}
                            disabled={data.meta.pagination.pages === data.meta.pagination.page}
                        >Next</Button>
                    </Flex>
                    {data.data.map((post) => (
                        <Stack 
                            key={post.id} 
                            p="4" 
                            mb="4" 
                            boxShadow="md" 
                            borderRadius="xl" 
                            border="1px solid #ccc"
                        >
                            <Flex justify="flex-end">
                                <Button 
                                    size="sm"
                                    isLoading={isMutating}
                                    onClick={ async() => {
                                        await mutateAsync({id:post.id});
                                    }}
                                >Delete</Button>
                            </Flex>
                            <Link  to={`/post/${post.id}`}>
                                <Stack>
                                    <Flex justify="space-between">
                                        <Text>User ID: {post.user_id}</Text>
                                        <Text>Post ID: {post.id}</Text>
                                    </Flex>
                                    <Heading fontSize="2xl">{post.title}</Heading>
                                    <Text>{post.body}</Text>
                                </Stack>
                            </Link>
                        </Stack>
                    ))} 
                </>)
            }       
        </Container>
    );
};

export default Home;