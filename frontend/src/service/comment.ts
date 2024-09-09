import instance from "@/config/instance";

export const createComment = (
	content: string,
	commentId: string,
	commentType: string,
) => {
	const data = instance.post(`/comment/createComment`, {
		content: content,
		commentId: commentId,
		commentType: commentType,
	});
	return data;
};
