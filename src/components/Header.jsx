import React, {useEffect, useState} from "react";
import {CiSearch} from "react-icons/ci";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BsYoutube} from "react-icons/bs";
import {HiMoon, HiSun} from "react-icons/hi"
import {useDarkMode} from "../context/DarkModeContext";

export default function Header() {
    const {darkMode, toggleDarkMode} = useDarkMode();
    const {keyword} = useParams();
    const [text, setText] = useState('');
    const navigator = useNavigate();

    useEffect(() => setText(keyword || ''), [keyword]);

    const handleChange = (e) => setText(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            return;
        }

        navigator(`/videos/${text}`);
    }

    return (
        <header className="w-full flex justify-between p-4 text-2xl mb-4 dark:border-b dark:border-zinc-600">
            <Link to='/' className="flex items-center">
                <BsYoutube className="text-4xl text-brand"/>
                <h1 className="font-bold ml-2 text-3l">Youtube</h1>
            </Link>
            <form className="w-full flex justify-center items-center" onSubmit={handleSubmit}>
                <label htmlFor="searchInput" className="hidden">검색</label>
                <input type="text"
                       className="w-7/12 h-full indent-4 rounded-tl-2xl rounded-bl-2xl border dark:bg-darkSearchBar dark:text-gray-500 dark:border-dark"
                       id="searchInput"
                       placeholder="Search..."
                       value={text}
                       onChange={handleChange}
                       required
                />
                <button type="submit"
                        className="bg-zinc-200 p-4 rounded-tr-2xl rounded-br-2xl dark:bg-darkBtn dark:border-dark">
                    <CiSearch/>
                </button>

            </form>
            <div className="flex justify-center items-center">
                <button onClick={toggleDarkMode}>
                    {!darkMode && <HiMoon/>}
                    {darkMode && <HiSun/>}
                </button>
            </div>
        </header>
    );
}


