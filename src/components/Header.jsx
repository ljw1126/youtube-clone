import React, {useEffect, useState} from "react";
import {CiSearch} from "react-icons/ci";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BsYoutube} from "react-icons/bs";
import {HiMoon} from "react-icons/hi"

export default function Header() {
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
        <header className="w-full flex justify-between p-4 text-2xl border-b border-zinc-600 mb-4">
            <Link to='/' className="flex items-center">
                <BsYoutube className="text-4xl text-brand"/>
                <h1 className="font-bold ml-2 text-3l">Youtube</h1>
            </Link>
            <form className="w-full flex justify-center items-center" onSubmit={handleSubmit}>
                <label htmlFor="searchInput" className="hidden">검색</label>
                <input type="text"
                       className="w-7/12 h-full bg-black text-gray-500 placeholder:pl-5 rounded-tl-2xl rounded-bl-2xl border border-gray-800 focus:border-blue-500 focus:ring-blue-500"
                       id="searchInput"
                       placeholder="Search..."
                       value={text}
                       onChange={handleChange}
                       required
                />
                <button type="submit"
                        className="bg-zinc-600 p-4 rounded-tr-2xl rounded-br-2xl">
                    <CiSearch/>
                </button>

            </form>
            <div className="flex justify-center items-center">
                <button><HiMoon/></button>
            </div>
        </header>
    );
}


