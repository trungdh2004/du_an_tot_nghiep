import instance from "@/config/instance";


export const banUser = async (openBanId : string) =>{
  const data = await instance.put(
		`http://localhost:5000/api/v1/auth/blocked/${openBanId}`,
		{ type: 1 },
  );
  return data
  
}