interface SortType {
	field: string;
	sort: string | null | undefined;
}

interface PaginationModelType {
	page: number;
	pageSize: number;
	sort?: SortType;
}

export default PaginationModelType;