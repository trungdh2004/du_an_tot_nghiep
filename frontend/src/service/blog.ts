import instance from "@/config/instance";
export const newBlogs = (data: any) => {
	const uri = "/blogs/new-blogs";
	return instance.post(uri, data);
};
export const showBlogsEdit = (id: string) => {
	const uri = `/blogs/show-blog-edit/${id}`;
	return instance.get(uri);
};
export const updateBlogs = (id: string, data: any) => {
	const uri = `/blogs/put-blogs/${id}`;
	return instance.put(uri, data);
};

export const publishBlog = (id: string, data: any) => {
	const uri = `/blogs/publish/${id}`;
	return instance.put(uri, data);
};
