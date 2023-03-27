import Wave from "@/components/Wave";
import Layout from "@/components/Layout";
import React from "react";

export default function About() {
	return (
		<div>
			<Layout>
				<div className="w-full">
					<div className="flex flex-col items-center justify-center h-64 lg:h-80 w-full text-blue-900 dark:text-blue-300">
						<h1 className="text-3xl my-4">Table Rock Lake Level</h1>
						<p>Developed by <a className="text-blue-400 underline hover:text-blue-200"
															 href="https://github.com/patrickjmcd">Patrick McDonagh</a></p>
						<p>© Patrick McDonagh, {new Date().getFullYear()}</p>
						<p>Data Source: <a className="text-blue-400 underline hover:text-blue-200"
															 href="https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm">US Army Corps
							of Engineers</a></p>
					</div>
				</div>
			</Layout>

		</div>
	);
}
