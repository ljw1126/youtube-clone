import axios from "axios";
import {VideoStatus} from "../../pages/Videos";
import YoutubeApiResponse from "./youtubeApiResponse";

export default class FakeYoutubeClient {
    async search({status}) {
        if (status === VideoStatus.INIT) {
            return axios.get(`/data/lofi-list1.json`);
        }

        if (status === VideoStatus.NEXT) {
            return axios.get(`/data/lofi-list2.json`);
        }

        return Promise.resolve(new YoutubeApiResponse(undefined, undefined));
    }

    async videos({status}) {
        if (status === VideoStatus.INIT) {
            return axios.get(`/data/popular1.json`);
        }

        if (status === VideoStatus.NEXT) {
            return axios.get(`/data/popular2.json`);
        }

        return Promise.resolve(new YoutubeApiResponse(undefined, undefined));
    }

    async channels() {
        return axios.get(`/data/channels.json`);
    }


}
