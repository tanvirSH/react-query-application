import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./Home/Home";
import Post from "./Post/Post";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => {
  // Create a client
 const queryClient = new QueryClient();
  return(
    <ChakraProvider>
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/:id" element={<Home />} />
                </Routes>
            </Router>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;