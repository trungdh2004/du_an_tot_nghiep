export interface IObjectComment {
	commentId: string | undefined;
	commentType: string;
	pageIndex?: number;
	pageSize?: number;
	sort?: number;
}

interface User {
	avatarUrl: string;
	full_name: string;
	is_admin: boolean;
	is_staff: boolean;
	_id: string;
}

export interface Comment {
	commentType: string;
	comment_id: string;
	content: string;
	createdAt: string;
	is_removed: boolean;
	reactions: any[]; // Nếu muốn chi tiết hơn, bạn có thể xác định kiểu cho các phần tử của mảng này
	reactions_count: number;
	replies: any[]; // Tương tự, bạn có thể chi tiết hoá kiểu của phần tử
	replies_count: number;
	updatedAt: string;
	user: User;
	_id: string;
}