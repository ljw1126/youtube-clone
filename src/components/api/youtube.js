import axios from "axios";

export async function search() {
    return axios.get(`data/lofi-list.json`)
        .then(res => res.data.items);
}
