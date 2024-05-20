import React from "react";
import {useYoutubeApi} from "../context/YoutubeApiContext";
import {useQuery} from "@tanstack/react-query";

export default function ChannelInfo({id, name}) {
    const {youtube} = useYoutubeApi();

    const {isLoading, error, data: url} = useQuery({
        queryKey: ['channelInfo', id],
        queryFn: () => {
            return youtube.channelImageUrl(id);
        }
    })

    return (
        <div>
            {url && <img src={url} alt={name}/>}
            <p>{name}</p>
        </div>
    );
}
