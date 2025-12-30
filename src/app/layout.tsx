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
			<body className="min-h-screen bg-slate-950 text-slate-50 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.2),transparent_30%),linear-gradient(135deg,#0f172a_0%,#020617_50%,#0b1224_100%)]">
				<Navbar />
				<div className="w-full">
					<main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
