import DialogConfirm from "@/components/common/DialogConfirm";
import { Button } from "@/components/ui/button";
import instance from "@/config/instance";
import { useState } from "react";
import { toast } from "sonner";

const Home = () => {
	const handleTesst =async () => {
		try {
			const { data } = await instance.post("/address/paddingAddress", {})
		} catch (error) {
			
		}
	}

	return (
		<div className="flex w-full h-screen flex items-center justify-center">
			<div className="w-[200px] h-[200px] bg-red-500 border">
				<Button onClick={handleTesst}>
					CLick
				</Button>
			</div>
		</div>
	);
};

export default Home;
