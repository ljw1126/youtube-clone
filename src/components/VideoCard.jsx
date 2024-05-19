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
        <div className="max-w-sm" onClick={() => handleDetail(video.id)}>
            <img className="rounded-lg" src={thumbnails.high.url} alt={title}/>
            <div className="flex flex-col">
                <p className="font-semibold my-2 text-ellipsis whitespace-nowrap overflow-hidden">{title}</p>
                <p className="text-sm opacity-80 text-ellipsis whitespace-nowrap overflow-hidden">{channelTitle}</p>
                <p className="text-sm opacity-80">{formatAgo(publishedAt, 'ko')}</p>
            </div>
        </div>
    );
}
