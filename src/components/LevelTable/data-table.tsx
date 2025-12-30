"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/components/LevelTable/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function LevelDataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: { pagination: { pageSize: 25 } },
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
									data-state={row.getIsSelected() && "selected"}
									className="border-white/5 odd:bg-white/5 even:bg-slate-900/40 hover:bg-sky-900/30/80"
								>
									{row.getVisibleCells().map((cell) => (
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
