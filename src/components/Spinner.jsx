import {React, useState} from "react";
import {ClipLoader} from "react-spinners";

export default function Spinner() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#606060");

    return (
        <div className="absolute w-full sweet-loading left-1/2">
            <ClipLoader
                color={color}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}
