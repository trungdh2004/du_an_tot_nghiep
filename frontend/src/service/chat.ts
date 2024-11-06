import instance from "@/config/instance";

export const findOrUpdateConversation = async () =>
	instance.get(`/chat/findOrCreateConversation`);

export const pagingMessage = async (
	conversationId: string,
	pageIndex: number,
) =>
	instance.post(`/chat/message/${conversationId}`, {
		pageIndex,
	});

export const createMessage = async (
	content: string,
	sender: "USER" | "ADMIN",
	conversationId: string,
) =>
	instance.post(`/chat/createMessage/${conversationId}`, {
		content,
		sender,
	});

export const pagingConversation = (pageIndex: number) =>
	instance.post("/chat/pagingConversation", {
		pageIndex,
	});
export const findConversation = (id: string) =>
	instance.get("/chat/findConversation/" + id);
