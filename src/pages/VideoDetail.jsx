import React from 'react';
import {useLocation} from 'react-router-dom';
import ChannelInfo from "../components/ChannelInfo";
import MostPopularVideo from "../components/MostPopularVideo";

export default function VideoDetail() {
    const {state: {video}} = useLocation();

    const {title, channelId, channelTitle, description} = video.snippet;

    return (<section className="flex flex-col lg:flex-row">
            <article className="basis-4/6">
                <iframe id='player'
                        className="rounded-lg"
                        type='text/html'
                        width='100%'
                        height='640'
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder='0'></iframe>
                <div className="mt-3 ml-2">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <ChannelInfo id={channelId} name={channelTitle}/>
                </div>
                <div className="p-5 rounded-lg bg-description dark:bg-darkDescription">
                    <pre className="whitespace-pre-wrap">{description}</pre>
                </div>
            </article>
            <section className="basis-2/6">
                <MostPopularVideo id={channelId}/>
            </section>
        </section>
    );
}
