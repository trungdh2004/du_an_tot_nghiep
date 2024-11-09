import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Barcode from "react-barcode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/common/func";
export function ModalCodition() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="border-none hover:bg-none">
					Điều kiện
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Chi tiết mã ưu đãi</DialogTitle>
				</DialogHeader>
				<div className="">
					<div className="flex flex-col items-center p-3 border border-gray-200 rounded-md">
						<h3 className="text-base font-bold text-center">
							Voucher {formatCurrency(50000000)}
						</h3>
						<Barcode value="038552121" format="CODE128" />,
					</div>
					<p>- Hạn sử dụng: 08 - 12/11/2024.</p>
					<p>- Địa điểm áp dụng: Web, App Canifa</p>
					<p>- Áp dụng cho toàn bộ sản phẩm</p>
					<p>
						- Áp dụng giảm 50k cho hóa đơn có giá trị thanh toán cuối cùng từ
						599k.
					</p>
					<p>
						- Không áp dụng đồng thời cùng các voucher %, voucher giảm toàn đơn
						và các thẻ mệnh giá có điều kiện khác.
					</p>
					<p>
						- Áp dụng đồng thời cùng chương trình giảm giá thẻ VIP, sinh nhật
						VIP và các CTKM. Tính ưu đãi chiết khấu, các CTKM trước, sau đó xét
						đến điều kiện giảm 50k cho hóa đơn từ 599k.
					</p>
					<p>
						- Áp dụng kèm cấp thẻ VIP, thẻ tích điểm và tích điểm cho các hạng
						thẻ dựa theo giá trị hóa đơn thanh toán cuối cùng.
					</p>
					<p>- Áp dụng 01 mã ưu đãi/ 01 hoá đơn thanh toán.</p>
				</div>
				<DialogFooter>
					<Button type="submit">Lưu mã</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
