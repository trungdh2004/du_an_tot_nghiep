import { cn } from "@/lib/utils";
import { IProductDetail } from "@/types/product";
import { useState } from "react";
import Comments from "./Comments/page";
import DescProduct from "./DescProduct";
type Props = {
	product?: IProductDetail;
	isLoading?: boolean;
};
const ProductDetailsAndReviews = ({ product, isLoading }: Props) => {
	const [step, setStep] = useState(1);
	const steps = ["Mô tả", "Bình luận", "Đánh giá"];
	return (
		<div>
			<ul className="flex items-center justify-center text-xl font-medium py-3 *:cursor-pointer *:px-5 [&>li+li]:border-l [&>li]:border-gray-200 last:border-none">
				{steps?.map((item, index) => (
					<li	
						key={index + new Date().toISOString()}
						onClick={() => setStep(index + 1)}
						className={cn(step == index + 1 && "text-blue-500")}
					>
						{item}
					</li>
				))}
			</ul>
			{step == 1 && (
				<DescProduct
					description={product?.description as string}
					isLoading={isLoading}
				/>
			)}
			{step == 2 && <Comments product={product} />}
		</div>
	);
};

export default ProductDetailsAndReviews;
