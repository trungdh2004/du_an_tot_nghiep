export interface SearchObjectType {
	pageIndex: number;
	pageSize: number;
	keyword?: string;
	sortField?: string;
	sort?: 1 | -1;
	totalElement?: number;
	totalOptionPage?: number;
}