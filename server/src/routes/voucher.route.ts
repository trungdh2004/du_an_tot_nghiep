import { Router } from "express";
import VoucherController from "../controllers/voucher"
import authentication from "../middlewares/authentication";
const routerVoucher = Router();

routerVoucher.post("/add", authentication,VoucherController.addVoucher);
routerVoucher.post("/getCheck", authentication,VoucherController.getVoucherCode);
routerVoucher.put("/update", authentication,VoucherController.updateVoucher);
routerVoucher.get("/findOneVoucher/:id", authentication,VoucherController.findOneVoucher);
routerVoucher.post("/paging", authentication,VoucherController.pagingVoucher);
routerVoucher.put("/stopAction/:id", authentication,VoucherController.stopAction);
routerVoucher.put("/startAction/:id", authentication,VoucherController.startAction);
routerVoucher.post("/deleteList", authentication,VoucherController.deleteList);
export default routerVoucher;
