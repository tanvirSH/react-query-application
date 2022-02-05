import React from "react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { Heading, Stack, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { addNewPost, updatePost } from "../../api";

const AddNewPost = ({ isUpdate, id }) => {

    const toast = useToast();
    const cache = useQueryClient();
    const { data, mutateAsync} = useMutation(
        isUpdate ? "updatePost" : "addNewPost",
        isUpdate ? updatePost : addNewPost,
        {
            onSuccess: () => {
                isUpdate 
                ? cache.invalidateQueries(["post", id]) 
                : cache.invalidateQueries("posts");
            },
            onMutate: async (newPost) => {
                if(isUpdate) {
                     // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                    await cache.cancelQueries("post");

                    // Snapshot the previous 
                    const previousPost = cache.getQueryData(["post", id]);

                    // Optimistically update to the new value
                    cache.setQueryData(["post", id], (old) => {
                        // Return a context with the previous and new todo
                        return { data: newPost }
                    })
                
                    // Return a context with the previous and new todo
                    return { previousPost }

                }
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (error, newPost, context) => {
                cache.setQueryData(['post', id], context.previousPost);
                toast({status: "error",title:error.message});
            },
            // Always refetch after error or success:
            onSettled: () => {
                //queryClient.invalidateQueries('todos')
            },
        }
        );

    return (
        <div>
            <Formik 
                initialValues={{title: "", body: ""}} 
                onSubmit={async (values) => {
                     isUpdate 
                     ? await mutateAsync({title: values.title, body: values.body, id }) 
                     : await mutateAsync({title: values.title, body: values.body});
                }}
            >
                <Form>
                    <Stack my="4">
                        <Heading textAlign="center" fontSize="2xl">{isUpdate ? "Update" : "Add new"}  post</Heading>
                        <InputControl name="title" label="Title" />
                        <TextareaControl name="body" label="Content" />
                        <SubmitButton>{isUpdate ? "Update" : "Add"} Post</SubmitButton>
                    </Stack>
                </Form>
            </Formik>
        </div>
    );

}

export default AddNewPost