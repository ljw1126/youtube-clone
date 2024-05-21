import axios from "axios";
import {VideoStatus} from "../../pages/Videos";

export default class YoutubeClient {
    constructor() {
        this.httpClient = axios.create({
            baseURL: 'https://www.googleapis.com/youtube/v3/',
            params: {
                key: process.env.REACT_APP_YOUTUBE_API_KEY
            }
        })
    }

    async search({params, status}) {
        if (status === VideoStatus.END) return;

        return this.httpClient.get('search', {params});
    }

    async videos({params, status}) {
        if (status === VideoStatus.END) return;

        return this.httpClient.get('videos', {params});
    }

    async channels(params) {
        return this.httpClient.get('channels', params);
    }
}
