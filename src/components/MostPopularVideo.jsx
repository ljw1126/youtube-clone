import {useYoutubeApi} from "../context/YoutubeApiContext";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import VideoCard from "./VideoCard";

export default function MostPopularVideo({id}) {
    const {youtube} = useYoutubeApi();

    const {isLoading, error, data: videos} = useQuery({
        queryKey: ['playlists', id],
        queryFn: () => {
            return youtube.search();
        }
    })

    return (<>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong...</p>}
            {videos && (
                <ul className="">
                    {
                        videos.map((video) => (<VideoCard key={video.id} video={video}/>))
                    }
                </ul>
            )}
        </>
    );
}
