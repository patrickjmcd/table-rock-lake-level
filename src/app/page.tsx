import {getLevelData, LevelMeasurement} from "@/lib/level";
import Graph from "@/components/Graph";
import CurrentLevel from "@/components/CurrentLevel";
import DataDisplay from "@/components/DataDisplay";
import Link from "next/link";
import React from "react";
import ErrorPage from "@/components/ErrorPage";

export const dynamic = 'force-dynamic';

const getLatest = (data: LevelMeasurement[]): LevelMeasurement | undefined => {
    if (data.length > 0) {
        return data[data.length - 1];
    }
    return undefined;
}


const Home = async () => {
    console.log("fetching level data")
    try {
        let levelData: LevelMeasurement[] = await getLevelData();
        const latest = getLatest(levelData)
        const darkModeEnabled = false;


        return (
            <div>

                <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ">
                    <div className="w-full sm:w-1/2 my-4">
                        <CurrentLevel latest={latest}/>
                    </div>
                    <div className="w-full my-4">
                        <Graph levelData={levelData} darkModeEnabled={darkModeEnabled}/>
                    </div>
                    <div className="w-full my-4">
                        <DataDisplay data={levelData}/>
                    </div>

                    <div className="w-full my-4">
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            <p>© Patrick McDonagh, {new Date().getFullYear()}</p>
                            <Link href="/about"
                                  className="underline block mt-2 py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Credits
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    } catch (e) {
        return <ErrorPage err={e as Error}/>
    }
};

export default Home;
