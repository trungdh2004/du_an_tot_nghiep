import { IVoucher } from "@/types/voucher";
import { ModalCodition } from "./ModalCodition";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";
type Props = {
	voucher: IVoucher;
	className?: string;
};
const Coupon = ({ voucher, className }: Props) => {
	return (
		<div className={cn('w-1/3 min-w-[33.33333333%] m-0',className,)}>
			<div className={styles.voucherItemInfo}>
				<div className={styles.voucherItemDetail}>
					<div className={styles.voucherItemTitle}>{voucher?.name}</div>
					<div className={styles.voucherItemDes}>{voucher?.description}</div>
					<div className={styles.voucherItemDate}>
						<span className={styles.date}>
							HSD: {new Date(voucher?.endDate)?.toLocaleDateString()}
						</span>
						<div className={styles.voucherItemCondition}>
							<ModalCodition {...voucher} />
						</div>
					</div>
				</div>
				<div className={styles.voucherItemAction}>
					<div className="action">
						<span>Lưu Mã</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Coupon;
