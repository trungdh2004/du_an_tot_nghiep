import { Router } from "express";
import shipperController from "../controllers/shipper/shipper.controller";
import authentication from "../middlewares/authentication";
import authenticationShipper from "../middlewares/authenticationShipper";
const routerShipper = Router();

routerShipper.post("/registerShipper",authentication, shipperController.registerShipper);
routerShipper.post("/paging",authentication, shipperController.pagingShipper);
routerShipper.post("/getShipperById/:id",authentication, shipperController.getShipperById);
routerShipper.get("/getCurrentShipper",authentication, shipperController.getByCurrentShipper);
routerShipper.get("/getListOrderMap",authenticationShipper, shipperController.getListOrderShipperMap);
routerShipper.get("/getOrderByCode/:code",authenticationShipper, shipperController.getOrderByCode);
routerShipper.put("/updateStatusShippingOrder/:id",authenticationShipper, shipperController.updateStatusShippingOrder);
routerShipper.put("/updateStatusShippedOrder/:id",authenticationShipper, shipperController.updateStatusShippedOrder);

routerShipper.post("/getListOrderSuccessShipper",authenticationShipper, shipperController.getListOrderSuccessShipper);
routerShipper.post("/pagingOrderShipper",authenticationShipper, shipperController.pagingOrderShipper);

export default routerShipper;
