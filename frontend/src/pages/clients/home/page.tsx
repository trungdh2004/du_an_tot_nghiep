import Carousel from "./Carousel";
import DealOfTheDays from "./DealOfTheDays";
import LatestNewsBlog from "./LatestNewsBlog";
import ProductByCategory from "./ProductByCategory";
import Sliderv2 from "./Sliderv2";

const HomePage = () => {
	return (
		<div className="">
			<Sliderv2 />
			<Carousel />
			<ProductByCategory />
			<DealOfTheDays />
			<LatestNewsBlog />
		</div>
	);
};

export default HomePage;
