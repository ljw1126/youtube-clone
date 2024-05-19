import './App.css';
import React from "react";
import Header from "./components/header";
import {Outlet} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function App() {
    return (
        <>
            <Header/>
            <QueryClientProvider client={queryClient}>
                <Outlet/>
            </QueryClientProvider>
        </>
    );
}

