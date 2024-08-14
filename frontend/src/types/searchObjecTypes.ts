export interface SearchObjectType {
	pageIndex: number;
	pageSize: number;
	keyword: string | null;
	fieldSort: string | null;
	sort: 1 | -1;
	tab?: number;
}

export interface SearchObjectTypeSize extends SearchObjectType {
	height: number | null;
	weight: number | null;
}


export interface SearchObjectTypeProduct extends SearchObjectType {
	min: number | null;
	max: number | null;
	category: string | null;
	color: string[];
	size: string[]
}
export interface SearchObjectBlog extends SearchObjectType {
	tab?: number
	tags: string
}