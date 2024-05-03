import React from "react";
import Link from "next/link";

const About = () => {
    return (
        <div>
            <div className="w-full">
                <div
                    className="flex flex-col items-center justify-center h-64 lg:h-80 w-full text-blue-900 dark:text-blue-300">
                    <h1 className="text-3xl my-4">Table Rock Lake Level</h1>
                    <p>
                        Developed by{" "}
                        <Link
                            className="text-blue-400 underline hover:text-blue-200"
                            href="https://github.com/patrickjmcd"
                        >
                            Patrick McDonagh
                        </Link>
                    </p>
                    <p>© Patrick McDonagh, {new Date().getFullYear()}</p>
                    <p>
                        Data Source:{" "}
                        <Link
                            className="text-blue-400 underline hover:text-blue-200"
                            href="https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/tabrock.htm"
                        >
                            US Army Corps of Engineers
                        </Link>
                    </p>
                </div>
                <div
                    className="flex flex-col items-center justify-center h-64 lg:h-80 w-full text-blue-900 dark:text-blue-300">
                    <h1 className="text-2xl my-4">Want help building your own site?</h1>
                    <p>
                        Check out{" "}
                        <Link
                            className="text-blue-400 underline hover:text-blue-200"
                            href="https://pmcd.dev"
                        >pmcd.dev
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
