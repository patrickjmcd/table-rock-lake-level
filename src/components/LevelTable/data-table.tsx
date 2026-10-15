"use client";

import {
	type ColumnDef,
	flexRender,
	type RowData,
	useTable,
} from "@tanstack/react-table";
import {
	type LevelTableFeatures,
	levelTableFeatures,
} from "@/components/LevelTable/features";
import { DataTablePagination } from "@/components/LevelTable/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<LevelTableFeatures, TData>[];
	data: TData[];
}

export function LevelDataTable<TData extends RowData>({
	columns,
	data,
}: DataTableProps<TData>) {
	const table = useTable({
		features: levelTableFeatures,
		data,
		columns,
		initialState: { pagination: { pageIndex: 0, pageSize: 25 } },
	});

	return (
		<div>
			<div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/55 to-slate-900/40 shadow-inner shadow-sky-900/30 backdrop-blur">
				<Table className="text-sm text-slate-100">
					<TableHeader className="bg-slate-900/70 text-slate-200">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="border-white/10">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-200/80"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="border-white/5 odd:bg-white/5 even:bg-slate-900/40 hover:bg-sky-900/30/80"
								>
									{row.getAllCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="px-4 py-3 text-slate-100/90"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className={"my-4"}>
				<DataTablePagination table={table} />
			</div>
		</div>
	);
}
