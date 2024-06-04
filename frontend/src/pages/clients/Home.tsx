import { Button } from "@/components/ui/button";
import instance from "@/config/instance";
import { toast } from "sonner";

const Home = () => {
	const handleTesst = async () => {
		toast.success("hihi");
	};

	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<Button onClick={handleTesst}>click</Button>
			<div className="w-[150px] h-[150px] bg-red-500"></div>
		</div>
	);
};

export default Home;
