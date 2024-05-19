import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";

export default function Videos() {
    const {keyword} = useParams();
    const {isLoading, error, data: videos} = useQuery({
            queryKey: ['videos', keyword],
            queryFn: async () => {
                return fetch(`data/lofi-list.json`)
                    .then(data => data.json())
                    .then(data => data.items);
            }
        }
    );

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong...</p>}
            {videos && (
                <div>
                    {
                        videos.map((video) => (<VideoCard key={video.id.videoId} video={video}/>))
                    }
                </div>
            )}
        </>
    );
}

