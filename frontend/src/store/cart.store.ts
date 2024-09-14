import { ICart, ICartItem } from "@/types/cart";
import { create } from "zustand";
interface ICartStore {
	carts:ICart[] | [];
	totalCart: number;
	itemCart: ICartItem | null;
	setCarts:(payload:ICart[])=>void;
	updateTotalCart: (value: number) => void;
	setTotalCart: (value: number) => void;
	setItemCart: (payload: ICartItem | null) => void;
}
const useCart = create<ICartStore>((set) => ({
	carts:[],
	totalCart: 0,
	itemCart: null,
	setCarts: (payload: ICart[]) => set({ carts: payload }),
	setTotalCart: (value: number) => set(() => ({ totalCart: value })),
	updateTotalCart: (value: number) =>
		set((state) => ({ totalCart: state.totalCart + value })),
	setItemCart: (payload: ICartItem | null) =>
		set(() => ({ itemCart: payload })),
}));
export default useCart;
