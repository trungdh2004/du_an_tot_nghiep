import { cn } from "@/lib/utils";
import { useState } from "react";
import DescProduct from "./DescProduct";
import Comments from "./Comments/page";

const ProductDetailsAndReviews = () => {
	const [step, setStep] = useState(1);
	const steps = ["Mô tả", "Bình luận", "Đánh giá"];
	return (
		<div>
			<ul className="flex items-center justify-center text-xl font-medium py-3 *:cursor-pointer *:px-5 [&>li+li]:border-l [&>li]:border-gray-200 last:border-none">
				{steps?.map((item, index) => (
					<li
						onClick={() => setStep(index + 1)}
						className={cn(step == index + 1 && "text-blue-500")}
					>
						{item}
					</li>
				))}
			</ul>
			{step == 1 && <DescProduct />}
			{step == 2 && <Comments />}
		</div>
	);
};

export default ProductDetailsAndReviews;
