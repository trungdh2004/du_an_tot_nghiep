import Carousel from "./Carousel";
import DealProductSection from "./DealProductSection";
import LatestNewsBlog from "./LatestNewsBlog";
import ListCoupon from "./ListCoupon";
import ProductByCategory from "./ProductByCategory";
import Sliderv2 from "./Sliderv2";
const HomePage = () => {
	return (
		<div className="">
			<Sliderv2 />
			<Carousel />
      <ListCoupon/>
			<ProductByCategory />
			<DealProductSection />
			<LatestNewsBlog />
		</div>
	);
};

export default HomePage;
