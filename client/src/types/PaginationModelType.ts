interface SortType {
	field: string;
	sort: string | null | undefined;
}

interface PaginationModelType {
	page: number;
	pageSize: number;
	sort?: SortType;
	slugNotFilter?: string;
	filterActives?: 'y' | 'n';
}

export default PaginationModelType;