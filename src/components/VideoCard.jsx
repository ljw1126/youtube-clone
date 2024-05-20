import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {formatAgo} from "../util/date";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton";

export default function VideoCard({video, type}) {
    const {title, channelTitle, thumbnails, publishedAt} = video.snippet;
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const image = new Image();
        image.src = thumbnails.medium.url;
        image.onload = () => setLoaded(true);
        image.onerror = () => console.error("fail to load image", thumbnails.medium.url);

        return () => {
            image.onload = null;
            image.onerror = null;
        }
    }, [thumbnails.medium.url]);

    const handleDetail = () => {
        navigate(`/videos/watch/${video.id}`, {state: {video}});
    };

    const isList = type === 'list';
    return (
        <li key={video.id}
            className={isList ? 'flex flex-row my-2 gap-1 m-2' : ''}
            onClick={handleDetail}>
            {
                loaded ? (
                    <>
                        <img className={isList ? 'w-60 mr-2 rounded-lg' : 'w-full rounded-lg'}
                             src={thumbnails.medium.url} alt={title} width={thumbnails.medium.width} height={thumbnails.medium.height}/>
                        <div className={isList ? 'ml-4 my-2' : 'my-2'}>
                            <p className="font-semibold line-clamp-2">{title}</p>
                            <p className="text-sm opacity-80">{channelTitle}</p>
                            <p className="text-sm opacity-80">{formatAgo(publishedAt, 'ko')}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <Skeleton
                            className={isList ? 'basis-2/5 mx-4 rounded-lg' : 'w-full rounded-lg'}
                            variant="rectangular"
                            width={thumbnails.medium.width}
                            height={thumbnails.medium.height}
                            style={{maxWidth: '100%'}}
                        />
                        <div className={isList ? 'basis-3/5 flex flex-col' : 'flex flex-col my-2'}>
                            <Skeleton variant="rectangular"/>
                            <Skeleton variant="rectangular" width="40%"/>
                        </div>
                    </>
                )
            }
        </li>
    );
}
