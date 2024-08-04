import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Ablum from "./Ablum";
import InfoProduct from "./InfoProduct";
import ProductDetailsAndReviews from "./ProductDetailsAndReviews";

const DetailProduct = () => {
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
				<div className="grid grid-cols-8 bg-white">
					<div className="col-span-3">
						<Ablum />
					</div>
					<div className="col-span-5">
						<InfoProduct />
					</div>
				</div>
				<div className="">
					<ProductDetailsAndReviews />
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;
