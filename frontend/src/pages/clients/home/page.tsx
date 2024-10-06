import Carousel from "./Carousel";
import DealOfTheDays from "./DealOfTheDays";
import LatestNewsBlog from "./LatestNewsBlog";
import ProductByCategory from "./ProductByCategory";

const HomePage = () => {
	return (
		<div className="">
			<Carousel />
			<ProductByCategory />
			<DealOfTheDays />
			<LatestNewsBlog />
		</div>
	);
};

export default HomePage;
