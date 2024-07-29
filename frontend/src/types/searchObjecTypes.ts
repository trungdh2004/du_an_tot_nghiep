export interface SearchObjectType {
	pageIndex: number;
	pageSize: number;
	keyword?: string | null;
	fieldSort?: string | null;
	sort?: 1 | -1;
	tab?: number;
}

export interface SearchObjectTypeSize extends SearchObjectType {
	height: number | null;
	weight: number | null;
}
export interface SearchObjectBlog extends SearchObjectType {
	tab?: number
	tags?: string
}
export interface SearchObjectTag extends SearchObjectType {
	totalElement?: number;
	totalOptionPage?: number;
	tab?: number
	provider?: string;
}
