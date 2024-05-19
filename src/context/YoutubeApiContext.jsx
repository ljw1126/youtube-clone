import {createContext, useContext} from "react";
import FakeYoutube from "../components/api/FakeYoutube";
import Youtube from "../components/api/Youtube";

export const YoutubeApiContext = createContext();

const youtube = process.env.REACT_APP_PROFILE === 'dev'
    ? new FakeYoutube() : new Youtube();

export function YoutubeApiProvider({children}) {
    return <YoutubeApiContext.Provider value={{youtube}}>
        {children}
    </YoutubeApiContext.Provider>
}

export function useYoutubeApi() {
    return useContext(YoutubeApiContext);
}
