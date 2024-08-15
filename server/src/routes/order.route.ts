import { Router } from "express";
import authentication from "../middlewares/authentication";
import orderController from "../controllers/order/order.controller";
const routerOrder = Router();

routerOrder.post("/createOrderPayUponReceipt",authentication, orderController.createOrderPayUponReceipt);
routerOrder.get("/pagingCartOrder",authentication, orderController.pagingCartOrder);
routerOrder.post("/createStateUrlCart",authentication, orderController.createStateUrlCart);
routerOrder.get("/returnVnPay",authentication, orderController.returnOrderVnPay);
routerOrder.post("/createOrderVNPayPayment",authentication, orderController.createOrderVNPayPayment);
routerOrder.post("/pagingOrderServer",authentication, orderController.pagingOrderAdmin);
routerOrder.get("/getByIdServer/:id",authentication, orderController.getByIdOrderAdmin);
routerOrder.post("/pagingOrderClient",authentication, orderController.pagingOrderClient);

export default routerOrder;
