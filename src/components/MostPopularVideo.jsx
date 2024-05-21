import {useYoutubeApi} from "../context/YoutubeApiContext";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {VideoStatus} from "../pages/Videos";
import VideoCard from "./VideoCard";

export default function MostPopularVideo({id}) {
    const {youtube} = useYoutubeApi();

    const {isLoading, error, data: videos} = useQuery({
        queryKey: ['playlists', id],
        queryFn: () => youtube.search("", {status: VideoStatus.INIT, token: undefined}),
        staleTime: 1000 * 60 * 5
    });

    return (<>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong...</p>}
            {videos && (
                <ul key={id}>
                    {
                        videos.items.map(video => (<VideoCard key={video.id} video={video} type={'list'}/>))
                    }
                </ul>
            )}
        </>
    );
}
