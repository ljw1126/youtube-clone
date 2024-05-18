import React from "react";
import Header from "../components/Header/header";
import {useParams} from "react-router-dom";

export default function Videos() {
    const {keyword} = useParams();

    return (<>
        <Header/>
        {keyword}
    </>);
}
