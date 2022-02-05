import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        Authorization: "Bearer d5d7a9e95ce74ae615dc7527e5119ecb92309386d3a148aa8c8ed20a5efe2b7b"
    }
});

export const fetchPosts = async (id) => {
    try {
        const { data } = await api.get(`users/24/posts?page=${id}`);
        return data;
    } catch (error) {
        throw Error("Unable to fetch");
    }

};

export const addNewPost = async ({title, body}) => {
    try {
        const {data} = await api.post(`users/24/posts`, {
            title,
            body
        },
        {
            headers: {
                Authorization: "Bearer d5d7a9e95ce74ae615dc7527e5119ecb92309386d3a148aa8c8ed20a5efe2b7b"
            }
        }
        );
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }

};

export const updatePost = async ({title, body, id}) => {
    try {
        const {data} = await api.patch(`posts/${id}`, {
            title,
            body
        },
        {
            headers: {
                Authorization: "Bearer d5d7a9e95ce74ae615dc7527e5119ecb92309386d3a148aa8c8ed20a5efe2b7b"
            }
        }
        );
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }

};

export const deletePost = async ({id}) => {
    try {
        const {data} = await api.delete(`posts/${id}`,
        {
            headers: {
                Authorization: "Bearer d5d7a9e95ce74ae615dc7527e5119ecb92309386d3a148aa8c8ed20a5efe2b7b"
            }
        }
        );
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }

};

export const fetchPost = async (id) => {
    try {
        const { data } = await api.get(`posts/${id}`);
        return data;
    } catch (error) {
        throw Error("Unable to fetch");
    }

};