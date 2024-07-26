import instance from "@/config/instance";
import { SearchObjectType } from "@/types/searchObjecTypes";
export const getBlogPaging = (searchObject: SearchObjectType) => {
	const uri = "/blogs/pagingBlog";
	return instance.post(uri, searchObject);
}
export const newBlogs = (data: any) => {
	const uri = "/blogs/new-blogs";
	return instance.post(uri, data);
};
export const showBlogsEdit = (id: string) => {
	const uri = `/blogs/show-blog-edit/${id}`;
	return instance.get(uri);
};
export const getBlogDetail = (id: string) => {
	const uri = `/blogs/detail/${id}`;
	return instance.get(uri);
};
export const updateBlogs = (id: string, data: any) => {
	const uri = `/blogs/put-blogs/${id}`;
	return instance.put(uri, data);
};
export const publishBlog = (id: string | boolean) => {
	const url = `/blogs/publish/${id}`;
	return instance.put(url);
}
export const deleteBlogBYId = (id: string | boolean) => {
	const url = `/blogs/delete/${id}`;
	return instance.delete(url);
}