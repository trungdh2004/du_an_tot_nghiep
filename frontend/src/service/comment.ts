import instance from "@/config/instance";
import { IObjectComment } from "@/types/TypeObjectComment";

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

export const getListComments = (listObject: IObjectComment) => {
  const data = instance.post(`/comment/getListComment`, listObject);
  return data
};
