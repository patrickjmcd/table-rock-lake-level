"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<button type="button" onClick={toggleTheme}>
			{theme === "dark" ? (
				<SunIcon className="w-6 h-6 text-yellow-500" />
			) : (
				<MoonIcon className="w-6 h-6 text-gray-700" />
			)}
		</button>
	);
};

export default ThemeToggle;
