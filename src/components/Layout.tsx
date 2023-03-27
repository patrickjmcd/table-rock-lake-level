import Head from 'next/head';
import React, {useEffect, useState} from 'react';

import Navbar from './Navbar';
import Wave from "@/components/Wave";


interface LayoutProps {
	children: React.ReactNode;
	name?: string;
}

export default function Layout(props: LayoutProps) {
	const {children, name} = props;
	const [darkModeEnabled, setDarkModeEnabled] = useState(
		typeof localStorage !== 'undefined' &&
		'theme' in localStorage &&
		localStorage.theme === 'dark',
	);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (darkModeEnabled) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}, [darkModeEnabled]);

	const onDarkModeChange = (e: unknown) => {
		if (e) {
			// Whenever the user explicitly chooses dark mode
			localStorage.setItem('theme', 'dark');
		} else {
			// Whenever the user explicitly chooses light mode
			localStorage.setItem('theme', 'light');
		}
		setDarkModeEnabled(!!e);
	};

	return (
		<div>
			<Head>
				<title>Table Rock Lake Level</title>
				<meta name="description" content="Lake Level for Table Rock Lake"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<div className="w-full">
				<Navbar
					onDarkModeChange={(e) => onDarkModeChange(e)}
					darkModeEnabled={darkModeEnabled}
				/>

				<div className="flex h-screen bg-blue-500 dark:bg-slate-800 dark:text-white">
					<div className="w-full lg:p-6 p-2 overflow-y-auto">
						<main className="pt-0 lg:p-8 lg:mb-8 w-full min-h-full bg-blue-50 dark:bg-cyan-900 rounded-xl">
							{children}
						</main>
					</div>
				</div>

			</div>



			{/*<div className="relative pt-56 -z-10">*/}
			{/*	<Wave/>*/}
			{/*</div>*/}
		</div>
	);
}
