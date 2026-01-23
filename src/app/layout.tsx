import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/NavbarSimple";

export const metadata: Metadata = {
	title: "Table Rock Lake Level - Current Water Level & Release Rates",
	description:
		"Live Table Rock Lake water level, elevation, and dam release rates from the US Army Corps of Engineers. Updated hourly with historical data and charts.",
	keywords: [
		"Table Rock Lake",
		"lake level",
		"water level",
		"dam release",
		"Branson",
		"Missouri",
		"fishing",
		"boating",
	],
	openGraph: {
		title: "Table Rock Lake Level - Current Water Level & Release Rates",
		description:
			"Live Table Rock Lake water level, elevation, and dam release rates. Updated hourly.",
		url: "https://tablerocklakelevel.com",
		siteName: "Table Rock Lake Level",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Table Rock Lake Level",
		description:
			"Live Table Rock Lake water level, elevation, and dam release rates.",
	},
	metadataBase: new URL("https://tablerocklakelevel.com"),
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
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
