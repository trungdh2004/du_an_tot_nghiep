interface IBlogs {
	_id: string;
	title: string;
	thumbnail_url: string;
	meta_title: string;
	meta_description: string;
	views_count: number;
	isPublish: boolean;
	published_at: string;
	comments_count: number;
	countLike: number;
	selected_tags: ITag[];
	createdAt: string;
	updatedAt: string;
	user: {
		_id?: string;
		full_name?: string;
		email?: string;
		avatarUrl?: string;
	};
}
