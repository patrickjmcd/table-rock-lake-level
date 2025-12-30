"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LevelMeasurement } from "@/lib/level";

interface DataDisplayProps {
	data: LevelMeasurement[];
}

const DataDisplay = ({ data }: DataDisplayProps) => {
	const [showData, setShowData] = useState(false);
	return (
		<div>
			<div className="w-full my-4">
				<Button
					variant={"default"}
					type={"button"}
					onClick={() => setShowData(!showData)}
				>
					Toggle Raw Data
				</Button>
			</div>
			{showData && (
				<div className="w-full my-4 text-gray-700 bg-gray-100 font-mono">
					<p className="p-5">{JSON.stringify(data, null, 2)}</p>
				</div>
			)}
		</div>
	);
};
export default DataDisplay;
