'use client';
import {useTheme} from "next-themes";
import {MoonIcon, SunIcon} from "@heroicons/react/24/outline";

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button onClick={toggleTheme}>
            {theme === "dark" ? (
                <SunIcon className="w-6 h-6 text-yellow-500"/>
            ) : (
                <MoonIcon className="w-6 h-6 text-gray-700"/>
            )}
        </button>
    );



};

export default ThemeToggle;