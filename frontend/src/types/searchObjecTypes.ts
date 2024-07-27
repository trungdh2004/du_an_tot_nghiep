export interface SearchObjectType {
	pageIndex: number;
	pageSize: number;
	keyword?: string | null;
	fieldSort?: string | null;
	sort?: 1 | -1;
	tab?: number;
}

export interface SearchObjectTypeSize extends SearchObjectType {
	height:number | null;
	weight:number | null;
}
