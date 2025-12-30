import { LifebuoyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NavbarSimple = () => {
	return (
		<header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="group flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10"
				>
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/30">
						<LifebuoyIcon className="h-5 w-5" />
					</div>
					<div className="leading-tight">
						<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
							Table Rock
						</p>
						<p className="text-lg font-semibold">Lake Level</p>
					</div>
				</Link>

				<nav className="flex items-center gap-3 text-sm font-medium text-slate-200">
					<Link
						href="/"
						className="rounded-full px-3 py-2 transition hover:bg-white/10"
					>
						Dashboard
					</Link>
					<Link
						href="/about"
						className="rounded-full px-3 py-2 transition hover:bg-white/10"
					>
						About
					</Link>
					<Link
						href="https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm"
						className="hidden rounded-full border border-white/15 px-3 py-2 text-sky-200 transition hover:-translate-y-0.5 hover:border-sky-400/60 hover:text-white hover:shadow-lg hover:shadow-sky-400/20 sm:inline-flex"
					>
						Data Source
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default NavbarSimple;
