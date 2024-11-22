import { IVoucher } from "@/types/voucher";
import { ModalCodition } from "./ModalCodition";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi"; // Icon check thành công
import { CiClock2 } from "react-icons/ci";

type Props = {
	voucher: IVoucher;
	className?: string;
};

const Coupon = ({ voucher, className }: Props) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(voucher.code).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		});
	};

	return (
		<div className={cn("w-full h-full m-2 rounded-md self-auto", className)}>
			<div className={styles.voucherItemInfo}>
				<div className={styles.voucherItemDetail}>
					<div className={styles.voucherItemTitle}>{voucher?.name} </div>
					<div className={cn(styles.voucherItemDes)}>
						{voucher?.description}
					</div>
					<div className={cn( "flex items-center justify-between")}>
						<div className={"text-xs flex items-center gap-0.5"}>
							HSD:{" "}
							<span>{new Date(voucher?.endDate)?.toLocaleDateString()}</span>
						</div>
						<div className={styles.voucherItemCondition}>
							<ModalCodition {...voucher} />
						</div>
					</div>
				</div>
				<div className={styles.voucherItemAction}>
					<motion.div
						className="flex items-center cursor-pointer action"
						onClick={handleCopy}
						whileTap={{ scale: 0.9 }}
					>
						{isCopied ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
								className="flex items-center text-green-500"
							>
								<FiCheck size={24} />
								<span className="ml-1">Đã Lưu</span>
							</motion.div>
						) : (
							<button className="px-3 py-2 text-white bg-blue-400 rounded-md">
								Lưu Mã
							</button>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Coupon;
