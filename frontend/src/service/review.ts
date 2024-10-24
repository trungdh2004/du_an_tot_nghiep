import instance from "@/config/instance";

export const getReviewProduct = (id: string, rating: number | null) =>
	instance.post(`/evaluate/paging/${id}`, rating);
