import { create } from "zustand";
interface ICartStore {
	totalCart: number;
	updateTotalCart: (value: number) => void;
	setTotalCart: (value: number) => void;
}
const useCart = create<ICartStore>((set) => ({
	totalCart: 0,
	setTotalCart: (value: number) => set(() => ({ totalCart: value })),
	updateTotalCart: (value: number) =>
		set((state) => ({ totalCart: state.totalCart + value })),
}));
export default useCart;
