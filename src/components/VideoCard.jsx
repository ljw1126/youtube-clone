import React from "react";

export default function VideoCard({video}) {
    return <>
        <p key={video.id}>{video.snippet.title}</p>
    </>;
}
