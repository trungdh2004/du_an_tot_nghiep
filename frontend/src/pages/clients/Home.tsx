import DialogConfirm from "@/components/common/DialogConfirm";
import { Button } from "@/components/ui/button";
import instance from "@/config/instance";
import { useState } from "react";
import { toast } from "sonner";

const Home = () => {
	const [open, setOpen] = useState(false);

	const handleSubmit = () => {};
	const handleTesst = async () => {
		toast.success("hihi");
	};

	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<DialogConfirm
				open={open}
				handleClose={() => setOpen(false)}
				handleSubmit={handleTesst}
				content="Tôi muốn xóa"
			/>
			<button onClick={() => setOpen(true)}>click</button>
		</div>
	);
};

export default Home;
