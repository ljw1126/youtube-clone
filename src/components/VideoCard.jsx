import React from "react";

import {useNavigate} from "react-router-dom";
import {formatAgo} from "../util/date";

export default function VideoCard({video}) {
    const {title, channelTitle, thumbnails, publishedAt} = video.snippet;
    const navigate = useNavigate();

    return (
        <li onClick={() => {
            navigate(`/videos/watch/${video.id}`, {state: {video}});
        }}>
            <img className="rounded-lg w-full" src={thumbnails.high.url} alt={title}/>
            <div>
                <p className="font-semibold line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{formatAgo(publishedAt, 'ko')}</p>
            </div>
        </li>
    );
}
