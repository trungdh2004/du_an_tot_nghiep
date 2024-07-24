import Carousel from "./Carousel";
import DealOfTheDays from "./DealOfTheDays";
import ProductByCategory from "./ProductByCategory";
import Slider from "./Slider";

const HomePage = () => {
	return (
		<div className="bg-[#f9fafb]">
			<Slider />
			<Carousel />
			<ProductByCategory />
			<DealOfTheDays />
		</div>
	);
};

export default HomePage;
