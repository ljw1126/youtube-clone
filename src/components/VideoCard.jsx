import React from "react";

import {useNavigate} from "react-router-dom";
import {formatAgo} from "../util/date";

export default function VideoCard({video}) {
    const {title, channelTitle, thumbnails, publishedAt} = video.snippet;
    const navigator = useNavigate();
    const handleDetail = (id) => {
        navigator(`/videos/watch/${id}`);
    }

    return (
        <li onClick={() => handleDetail(video.id)}>
            <img className="rounded-lg w-full" src={thumbnails.high.url} alt={title}/>
            <div>
                <p className="font-semibold line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{formatAgo(publishedAt, 'ko')}</p>
            </div>
        </li>
    );
}
