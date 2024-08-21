import { FiMapPin } from "react-icons/fi";
const AddressOrder = () => {
	return (
		<div className="lg:py-4 py-2 ">
			<div className="flex flex-col gap-3 bg-white py-4 border border-gray-200">
				<div className="flex gap-3 pl-3">
					<FiMapPin size={25} className="text-[#f78138]" />
					<p className="lg:text-lg md:text-base text-sm text-[#f78138]">
						Địa chỉ nhận hàng
					</p>
				</div>
				<div className="flex lg:flex-row md:flex-row flex-col pl-4 justify-between lg:items-center md:items-center items-start gap-3">
					<div className="flex lg:flex-row md:flex-row flex-col gap-3">
						<span className="lg:text-base text-sm font-bold tracking-normal">
							Nguyễn Văn Tuyên 0326892004
						</span>
						<p className="lg:text-base text-sm font-medium tracking-normal">
							Xóm Bàn, Thôn 3b, Canh Nậu, Thạch Thất, Hà Nội, Xã Canh Nậu, Huyện
							Thạch Thất, Hà Nội
						</p>
						<div className="border border-[#ff6200] flex items-center justify-center lg:w-[70px] md:w-[70px] w-[50px]">
							<span className="text-[#ff6200] lg:text-xs text-[9px] p-1 py-0 font-medium">
								Mặc định
							</span>
						</div>
					</div>
					<button className="lg:text-sm text-xs text-blue-400 font-medium mr-4">
						Thay đổi
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddressOrder;
