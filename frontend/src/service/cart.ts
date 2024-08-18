import instance from "@/config/instance";
const endpoint = "/cart";
type addToCartType = {
	productId: string;
	quantity: number;
	attribute: string;
};
export const addProductToCart = (data: addToCartType) => {
	const uri = `${endpoint}/addProductCart`;
	return instance.post(uri, data);
};
