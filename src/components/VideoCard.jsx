import React from "react";

import {useNavigate} from "react-router-dom";
import {formatAgo} from "../util/date";

export default function VideoCard({video, type}) {
    const {title, channelTitle, thumbnails, publishedAt} = video.snippet;
    const navigate = useNavigate();

    const isList = type === 'list';
    return (
        <li
            key={video.id}
            className={isList ? 'flex gap-1 m-2' : ''}
            onClick={() => {
                navigate(`/videos/watch/${video.id}`, {state: {video}});
            }}>
            <img className={isList ? 'w-60 mr-2 rounded-lg' : 'w-full'}
                 src={isList ? thumbnails.medium.url : thumbnails.high.url} alt={title}/>
            <div className={isList ? 'ml-4 my-2' : ''}>
                <p className="font-semibold line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{formatAgo(publishedAt, 'ko')}</p>
            </div>
        </li>
    );
}
