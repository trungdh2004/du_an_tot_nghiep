import Coupon from "@/components/common/Coupon/Coupon";
import Carousel from "./Carousel";
import DealProductSection from "./DealProductSection";
import LatestNewsBlog from "./LatestNewsBlog";
import ProductByCategory from "./ProductByCategory";
import Sliderv2 from "./Sliderv2";
const HomePage = () => {
	return (
		<div className="">
			<Sliderv2 />
			<Carousel />
      <Coupon/>
      
			<ProductByCategory />
			<DealProductSection />
			<LatestNewsBlog />
		</div>
	);
};

export default HomePage;
