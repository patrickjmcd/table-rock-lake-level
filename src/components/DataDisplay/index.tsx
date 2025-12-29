'use client';

import {LevelMeasurement} from "@/lib/level";
import {useState} from "react";

interface DataDisplayProps {
    data: LevelMeasurement[];
}

const DataDisplay = ({data}: DataDisplayProps) => {
    const [showData, setShowData] = useState(false);
    return (
        <div>
            <div className="w-full my-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                        onClick={() => setShowData(!showData)}
                >
                    Toggle Raw Data
                </button>
            </div>
            {showData && (<div className="w-full my-4 text-gray-700 bg-gray-100 font-mono">
                <p className="p-5">{JSON.stringify(data, null, 2)}</p>
            </div>)}
        </div>
    )
}
export default DataDisplay;