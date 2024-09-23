export interface INotification {
	thumbnail: string | null;
	_id: string;
	message: string;
	receiver: [];
	directType: string;
	directId: string;
	recipientType: string;
	type: string;
	isRead: boolean;
	createdAt: Date;
	updatedAt: Date;
	__v: 0;
}


export interface ISearchObjectNotifications {
	pageIndex: number;
	totalAllOptions: number;
	totalOptionPage: number;
	totalPage: number;
	content: INotification[];
}