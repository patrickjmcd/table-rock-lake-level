import React from "react";
import Link from "next/link";

interface ErrorPageProps {
    err?: Error;
}


const ErrorPage = ({err}: ErrorPageProps) => {
    return (
        <div>
            <div className="w-full">
                <div
                    className="flex flex-col items-center justify-center h-64 lg:h-80 w-full text-blue-900 dark:text-blue-300">
                    <h1 className="text-3xl my-4">Oh no!</h1>
                    <p className="text-lg">Something has gone seriously wrong.</p>
                    {err && <p className="text-lg">Error: {err.message}</p>}

                    <Link className="mt-10 underline" href="/">Go back to the main page?</Link>

                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
