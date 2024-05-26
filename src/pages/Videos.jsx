import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useYoutubeApi} from "../context/YoutubeApiContext";
import {useInView} from "react-intersection-observer";
import VideoCard from "../components/VideoCard";
import Spinner from "../components/Spinner";

export const VideoStatus = {
    INIT: 'INIT',
    NEXT: 'NEXT',
    END: 'END'
}

export default function Videos() {
    const {keyword} = useParams();
    const {youtube} = useYoutubeApi();
    const [count, setCount] = useState(1);
    const LIMIT = 10;

    useEffect(() => setCount(1), [keyword]);

    const {data: videos, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['videos', keyword || 'mostPopular'],
        queryFn: (context) => {
            const {pageParam} = context;
            return youtube.search(keyword, pageParam);
        },
        initialPageParam: {status: VideoStatus.INIT, token: undefined},
        getNextPageParam: (lastPage) => {
            if (lastPage.nextPageToken) {
                return {status: VideoStatus.NEXT, token: lastPage.nextPageToken};
            }

            return {status: VideoStatus.END, token: undefined};
        },
        staleTime: 1000 * 60 * 5
    });

    const {ref, inView} = useInView({
        threshold: 0.5,
        rootMargin: '100px'
    });

    useEffect(() => {
        if (inView && hasNextPage && count <= LIMIT && !isFetchingNextPage) {
            fetchNextPage();
            setCount(prev => prev + 1);
        }
    }, [inView, hasNextPage, isFetchingNextPage]);

    return (
        <>
            {isLoading && <Spinner/>}
            {error && <p>something wrong...</p>}
            {videos && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
                    {
                        videos.pages.map(page => page.items.map(video => (<VideoCard key={video.id} video={video}/>)))
                    }

                    <li ref={ref} className="">{isFetchingNextPage && <Spinner/>}</li>
                </ul>
            )}
        </>
    );
}

