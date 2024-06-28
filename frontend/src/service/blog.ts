import instance from "@/config/instance";
export const newBlogs = ({
	title,
	content,
}: {
	title?: string;
	content?: string;
}) => {
	const uri = "/blogs/new-blogs";
	return instance.post(uri, { title, content });
};
