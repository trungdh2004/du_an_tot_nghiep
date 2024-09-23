import instance from "@/config/instance";

export const getPagingNotification = (page: number) =>
	instance.get(`/notification/paging?page=${page}`);

export const watchedNotification = (id: string, isRead: boolean) =>
	instance.put(`/notification/watched/${id}`, {
		isRead,
	});

export const watchedAllNotification = () =>
	instance.get(`/notification/watchedAll`);

export const deleteNotification = (id: string) =>
	instance.delete(`/notification/delete/${id}`);
