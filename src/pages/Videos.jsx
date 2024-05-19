import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";
import FakeYoutube from "../components/api/FakeYoutube";

export default function Videos() {
    const {keyword} = useParams();
    const {isLoading, error, data: videos} = useQuery({
            queryKey: ['videos', keyword],
            queryFn: () => {
                const youtube = new FakeYoutube();
                return youtube.search(keyword);
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

