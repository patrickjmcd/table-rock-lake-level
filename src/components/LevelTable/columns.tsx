"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { LevelMeasurement } from "@/lib/level";

export const levelColumns: ColumnDef<LevelMeasurement>[] = [
	{
		accessorKey: "measuredAt",
		header: "Measured At",
		cell: ({ getValue }) => {
			const date: Date = getValue<Date>();
			return date.toLocaleString();
		},
		sortingFn: "datetime",
	},
	{
		accessorKey: "level",
		header: "Water Level (ft.)",
		cell: ({ getValue }) => getValue<number>().toFixed(2),
	},
	{
		accessorKey: "turbineReleaseRate",
		header: "Turbine Release Rate (cfs)",
		cell: ({ getValue }) => getValue<number>().toFixed(2),
	},
	{
		accessorKey: "spillwayReleaseRate",
		header: "Spillway Release Rate (cfs)",
		cell: ({ getValue }) => getValue<number>().toFixed(2),
	},
	{
		accessorKey: "totalReleaseRate",
		header: "Total Release Rate (cfs)",
		cell: ({ getValue }) => getValue<number>().toFixed(2),
	},
];
