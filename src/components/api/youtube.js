export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#searchPopular();
    }

    async #searchByKeyword(keyword) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                q: keyword
            }
        })
            .then(res => res.data.items)
            .then(items => items.map(item => ({...item, id: item.id.videoId})));
    }

    async #searchPopular() {
        return this.apiClient.videos({
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: 'mostPopular'
            }
        })
            .then(res => res.data.items)
            .then(items => items.map(item => ({...item, id: item.id})));
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
