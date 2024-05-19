import axios from "axios";

export default class FakeYoutube {
    constructor() {
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#searchPopular(); // private method
    }

    async #searchByKeyword(keyword) {
        return axios.get(`/data/lofi-list.json`)
            .then(res => res.data.items)
            .then(items =>
                items.map(item => ({...item, id: item.id.videoId}))
            );
    }

    async #searchPopular() {
        return axios.get(`/data/popular.json`)
            .then(res => res.data.items)
            .then(items => items.map(item => ({...item, id: item.id})));
    }
}
