export default class YoutubeApiResponse {
    constructor(nextPageToken, items) {
        this.nextPageToken = nextPageToken;
        this.items = items;
    }

}
