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

const DetailProduct = () => {
	return (
		<div className="padding">
			<Breadcrumb>
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
			<div className="grid grid-cols-6 gap-5">
				<div className="col-span-2">
					<Ablum />
				</div>
				<div className="col-span-4">
					<InfoProduct />
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;
