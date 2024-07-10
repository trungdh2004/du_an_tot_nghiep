import instance from "@/config/instance";


export const banUser = async (openBanId : string) =>{
  const data = await instance.put(
		`auth/blocked/${openBanId}`,
		{ type: 1 },
  );
  return data
  
}

export const unBanUser = async (openUnbanId: string) => {
	const data = await instance.put(
		`auth/unblocked/${openUnbanId}`,
		{ type: 1 },
	);
	return data;
};


export const unBanManyUser = async (listId: any) => {
  const data = await instance.put(`auth/unBlockedMany`, {
		listId: listId,
		type: 1,
	});
	return data;
};

export const BanManyUser = async (listId: any) => {
  const data = await instance.put(`auth/blockedMany`, {
    listId:listId,
		type: 1,
	});
	return data;
};