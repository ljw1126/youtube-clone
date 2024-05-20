import React, {useState} from "react";
import {CiSearch} from "react-icons/ci";
import {Link, useNavigate} from "react-router-dom";
import {BsYoutube} from "react-icons/bs";

export default function NotFound() {
    const [text, setText] = useState("");
    const navigator = useNavigate();

    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            return;
        }

        navigator(`/videos/${text}`);
    }
    return (
        <div
            className="w-screen h-screen flex flex-col justify-center items-center bg-notFound"
            id="error-page">
            <div
                className="flex flex-col items-center"
                id="error-page-content">
                <img
                    className="my-4"
                    id="error-page-hh-illustration"
                    src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt=""/>
                <p>죄송합니다. 이 페이지를 사용할 수 없습니다.</p>
                <p>다른 검색어로 검색해 보세요.</p>
                <Link to='/' className="flex items-center my-4">
                    <BsYoutube className="text-4xl text-brand"/>
                    <h1 className="font-bold ml-2 text-3l">Youtube</h1>
                </Link>
                <form className="w-full flex justify-center items-center my-2" onSubmit={handleSubmit}>
                    <label htmlFor="searchInput" className="hidden">검색</label>
                    <input type="text"
                           className="w-full h-full rounded-tl-2xl rounded-bl-2xl border indent-4"
                           id="searchInput"
                           placeholder="Search..."
                           value={text}
                           onChange={handleChange}
                           required
                    />
                    <button type="submit"
                            className="bg-zinc-200 p-4 rounded-tr-2xl rounded-br-2xl">
                        <CiSearch/>
                    </button>
                </form>

            </div>
        </div>
    );
}
