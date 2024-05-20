import './App.css';
import React from "react";
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {YoutubeApiProvider} from "./context/YoutubeApiContext";

const queryClient = new QueryClient();
export default function App() {
    return (
        <>
            <Header/>
            <YoutubeApiProvider>
                <QueryClientProvider client={queryClient}>
                    <Outlet/>
                </QueryClientProvider>
            </YoutubeApiProvider>
        </>
    );
}

