import YoutubeApiResponse from "./youtubeApiResponse";
import {VideoStatus} from "../../pages/Videos";

export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword, pageParam) {
        return keyword ? this.#searchByKeyword(keyword, pageParam) : this.#searchPopular(pageParam);
    }

    async #searchByKeyword(keyword, pageParam) {
        const {status, token} = pageParam;

        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: status === VideoStatus.INIT ? 25 : 10,
                type: 'video',
                q: keyword,
                ...(token && {pageToken: token})
            },
            status
        })
            .then(res => res.data)
            .then(data => new YoutubeApiResponse(data.nextPageToken ?? undefined, data.items.map(item => ({...item, id: item.id.videoId}))))
    }

    async #searchPopular(pageParam) {
        const {status, token} = pageParam;

        return this.apiClient.videos({
            params: {
                part: 'snippet',
                maxResults: status === VideoStatus.INIT ? 25 : 10,
                chart: 'mostPopular',
                ...(token && {pageToken: token})
            },
            status
        })
            .then(res => res.data)
            .then(data => new YoutubeApiResponse(data.nextPageToken ?? undefined, data.items.map(item => ({...item, id: item.id}))))
    }

    async channelImageUrl(channelId) {
        return this.apiClient.channels({
            params: {
                part: 'snippet',
                id: channelId
            }
        }).then(res => res.data.items[0].snippet.thumbnails.default.url);
    }

}
