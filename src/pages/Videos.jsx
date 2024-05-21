import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useYoutubeApi} from "../context/YoutubeApiContext";
import {useInView} from "react-intersection-observer";
import VideoCard from "../components/VideoCard";

export const VideoStatus = {
    INIT: 'INIT',
    NEXT: 'NEXT',
    END: 'END'
}

export default function Videos() {
    const {keyword} = useParams();
    const {youtube} = useYoutubeApi();
    const [fetchCount, setFetchCount] = useState(0);
    const MAX_FETCH_COUNT = 10;

    const {data: videos, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['videos', keyword || 'mostPopular'],
        queryFn: ({pageParam}) => youtube.search(keyword, pageParam),
        initialPageParam: {status: VideoStatus.INIT, token: undefined},
        getNextPageParam: (lastPage) => {
            if (lastPage.nextPageToken) {
                return {status: VideoStatus.NEXT, token: lastPage.nextPageToken};
            }

            return {status: VideoStatus.END, token: undefined};
        },
        staleTime: 1000 * 60 * 5
    });

    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView && !isFetchingNextPage && fetchCount < MAX_FETCH_COUNT && hasNextPage) {
            const timeoutId = setTimeout(() => {
                fetchNextPage();
                setFetchCount(prev => prev + 1);
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>something wrong...</p>}
            {videos && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
                    {
                        videos.pages.map(page => page.items.map(video => (<VideoCard key={video.id} video={video}/>)))
                    }

                    <li ref={ref}></li>
                    {isFetchingNextPage && <p>로딩중......</p>}
                </ul>
            )}
        </>
    );
}

