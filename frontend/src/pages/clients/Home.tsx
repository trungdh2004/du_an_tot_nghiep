import { Button } from "@/components/ui/button";
import instance from "@/config/instance";

const Home = () => {
	const handleTesst = async () => {
		try {
			const { data } = await instance.get("/category/getAllCate");

			console.log(data);
		} catch (error) {}
	};

	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<Button onClick={handleTesst}>click</Button>
		</div>
	);
};

export default Home;
