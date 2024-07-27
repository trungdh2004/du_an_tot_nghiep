export interface SearchObjectType {
	pageIndex: number;
	pageSize: number;
  keyword?: string | null;
	fieldSort?: string | null;
  sort?: 1 | -1 ;
	totalElement?: number;
  totalOptionPage?: number;
  tab?: number
  provider?: string;
  height?: number | null;
  weight?: number | null;
}

