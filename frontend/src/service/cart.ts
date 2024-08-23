import instance from "@/config/instance";
const endpoint = "/cart";
type addToCartType = {
	productId: string;
	quantity: number;
	attribute: string;
};
export const pagingCart = () => {
	const uri = `${endpoint}/pagingCart`;
	return instance.get(uri);
};
export const addProductToCart = (data: addToCartType) => {
	const uri = `${endpoint}/addProductCart`;
	return instance.post(uri, data);
};
export const getCountMyShoppingCart = () => {
	const uri = `${endpoint}/countCart`;
	return instance.get(uri);
};
