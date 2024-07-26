export interface SearchObjectType {
	pageIndex: number;
	pageSize: number;
	keyword?: string;
	fieldSort?: string;
	sort?: 1 | -1;

}
export interface SearchObjectBlog extends SearchObjectType {
	totalElement?: number;
	totalOptionPage?: number;
	tab?: number
	provider?: string;
}