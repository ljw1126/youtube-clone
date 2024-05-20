import './App.css';
import React from "react";
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {YoutubeApiProvider} from "./context/YoutubeApiContext";
import {DarkModeProvider} from "./context/DarkModeContext";

const queryClient = new QueryClient();
export default function App() {
    return (
        <div className="w-screen h-full max-w-screen-2xl relative">
            <DarkModeProvider>
                <Header/>
            </DarkModeProvider>
            <YoutubeApiProvider>
                <QueryClientProvider client={queryClient}>
                    <Outlet/>
                </QueryClientProvider>
            </YoutubeApiProvider>
        </div>
    );
}

