import Link from "next/link";

const About = () => {
	return (
		<div className="space-y-8">
			<div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-sky-900/40">
				<p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">
					Behind the data
				</p>
				<h1 className="mt-3 text-4xl font-semibold text-white">
					Table Rock Lake Level
				</h1>
				<p className="mt-4 text-base text-slate-200 sm:text-lg">
					A streamlined snapshot of lake health and release activity, crafted to
					feel modern, calm, and informative.
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-blue-900/20 to-slate-900/40 p-6 shadow-xl shadow-sky-900/30">
					<h2 className="text-xl font-semibold text-white">Credits</h2>
					<p className="mt-3 text-slate-200">
						Designed and built by{" "}
						<Link
							className="text-sky-200 underline decoration-sky-400 underline-offset-4 transition hover:text-white"
							href="https://github.com/patrickjmcd"
						>
							Patrick McDonagh
						</Link>
						.
					</p>
					<p className="mt-2 text-slate-300">
						© Patrick McDonagh, {new Date().getFullYear()}
					</p>
					<p className="mt-4 text-slate-200">
						Data sourced from the{" "}
						<Link
							className="text-sky-200 underline decoration-sky-400 underline-offset-4 transition hover:text-white"
							href="https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm"
						>
							US Army Corps of Engineers
						</Link>
						, refreshed frequently.
					</p>
				</div>
				<div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-sky-900/30">
					<h2 className="text-xl font-semibold text-white">
						Need a similar experience?
					</h2>
					<p className="mt-3 text-slate-200">
						If you want a data-rich site with the same crisp, focused feel,
						reach out for help shipping your own dashboard.
					</p>
					<Link
						className="mt-5 inline-flex w-fit items-center justify-center rounded-full border border-sky-400/50 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-50 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20"
						href="https://pmcd.dev"
					>
						Visit pmcd.dev
					</Link>
				</div>
			</div>
		</div>
	);
};

export default About;
