import {
	createPaginatedRowModel,
	rowPaginationFeature,
	tableFeatures,
} from "@tanstack/react-table";

export const levelTableFeatures = tableFeatures({
	rowPaginationFeature,
	paginatedRowModel: createPaginatedRowModel(),
});

export type LevelTableFeatures = typeof levelTableFeatures;
