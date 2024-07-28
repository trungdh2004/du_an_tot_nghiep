import Carousel from "./Carousel";
import DealOfTheDays from "./DealOfTheDays";
import LatestNewsBlog from "./LatestNewsBlog";
import ProductByCategory from "./ProductByCategory";
import Slider from "./Slider";

const HomePage = () => {
	return (
		<div className="bg-[#f9fafb]">
			<Slider />
			<Carousel />
			<ProductByCategory />
			<DealOfTheDays />
			<LatestNewsBlog />
		</div>
	);
};

export default HomePage;
