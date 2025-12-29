import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";
import Navbar from "@/components/NavbarSimple";

export const metadata: Metadata = {
	title: "Table Rock Lake Level",
	description: "Table Rock Lake Level data from the US Army Corp of Engineers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-blue-500 dark:bg-slate-800 dark:text-white">
				<Navbar />
				<div className="w-full min-h-full">
					<main className="pt-0 lg:mt-6 mt-2 lg:mx-6 mx-2 lg:p-8 lg:mb-8  min-h-full bg-blue-50 dark:bg-cyan-900 rounded-xl">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
