import { FiMapPin } from "react-icons/fi";
const AddressOrder = () => {
	return (
		<div className="py-4 ">
			<div className="flex flex-col gap-3 bg-white py-4 border border-gray-200">
				<div className="flex gap-3 pl-3">
					<FiMapPin size={25} className="text-[#f78138]" />
					<p className="lg:text-lg md:text-base text-sm text-[#f78138]">
						Địa chỉ nhận hàng
					</p>
				</div>
				<div className="flex pl-4 justify-between">
					<div className="flex gap-3">
						<span className="font-bold tracking-normal">
							Nguyễn Văn Tuyên 0326892004
						</span>
						<p className="font-medium tracking-normal">
							Xóm Bàn, Thôn 3b, Canh Nậu, Thạch Thất, Hà Nội, Xã Canh Nậu, Huyện
							Thạch Thất, Hà Nội
						</p>
						<div className="border border-[#ff6200]">
							<span className="text-[#ff6200] text-xs p-1 py-0 font-medium">
								Mặc định
							</span>
						</div>
					</div>
					<button className="px-2 text-sm ml-9 text-blue-400 font-medium pr-7">
						Thay đổi
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddressOrder;
