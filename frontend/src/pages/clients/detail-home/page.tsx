import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IProductDetail } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../../service/product";
import Ablum from "./Ablum";
import InfoProduct from "./InfoProduct";
import ProductDetailsAndReviews from "./ProductDetailsAndReviews";

const DetailProduct = () => {
	const { slug } = useParams();
	const { data, isLoading } = useQuery<IProductDetail>({
		queryKey: ["GET_PRODUCT_BY_SLUG"],
		queryFn: async () => {
			const { data } = await getProductBySlug(
				encodeURIComponent(slug as string),
			);
			return data?.data;
		},
	});
	return (
		<div className="bg-[#f9fafb]">
			<div className="padding">
				<Breadcrumb className="py-3">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/components">Sản phẩm</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/components">Áo phông</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Áo Boy Phố</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="flex max-md:flex-col items-start bg-white">
					<div className="max-md:w-full w-2/5">
						<Ablum images={data?.images} isLoading={isLoading} />
					</div>
					<div className="w-full md:flex-1">
						<InfoProduct product={data} />
					</div>
				</div>
				<div className="">
					<ProductDetailsAndReviews product={data} />
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;
