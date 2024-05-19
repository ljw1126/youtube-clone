import axios from "axios";

export default class FakeYoutubeClient {
    async search(params) {
        return axios.get(`/data/lofi-list.json`);
    }

    async videos(params) {
        return axios.get(`/data/popular.json`);
    }
}
