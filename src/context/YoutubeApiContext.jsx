import {createContext, useContext} from "react";
import FakeYoutubeClient from "../components/api/fakeYoutubeClient";
import YoutubeClient from "../components/api/youtubeClient";
import Youtube from "../components/api/youtube";

export const YoutubeApiContext = createContext();

const client = process.env.REACT_APP_PROFILE === 'dev'
    ? new FakeYoutubeClient() : new YoutubeClient();
const youtube = new Youtube(client);

export function YoutubeApiProvider({children}) {
    return <YoutubeApiContext.Provider value={{youtube}}>
        {children}
    </YoutubeApiContext.Provider>
}

export function useYoutubeApi() {
    return useContext(YoutubeApiContext);
}
