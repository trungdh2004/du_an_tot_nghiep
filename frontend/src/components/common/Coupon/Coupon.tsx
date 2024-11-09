import { ModalCodition } from './ModalCodition';
import  styles from './style.module.css'
type Props = {
  title: string,
  desc: string,
  expiry:string,

}
const Coupon = () => {
  return (
    <div  className={styles.voucherItem}>
      <div className={styles.voucherItemInfo}>
        <div className={styles.voucherItemDetail}>
          <div className={styles.voucherItemTitle}>Voucher 80K</div>
          <div className={styles.voucherItemDes}>
            Giảm 80k cho đơn Online đầu tiên từ 399k
          </div>
          <div className={styles.voucherItemDate}>
            <span className={styles.date}>HSD: 2024-11-30</span>
            <div className={styles.voucherItemCondition}><ModalCodition/></div>
          </div>
        </div>
        <div className={styles.voucherItemAction}>
          <div className="action"><span>Lưu Mã</span></div>
        </div>
      </div>
    </div>
  );
}

export default Coupon