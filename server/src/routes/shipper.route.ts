import { Router } from "express";
import TagsController from "../controllers/Tags";
import shipperController from "../controllers/shipper/shipper.controller";
import authentication from "../middlewares/authentication";
import authenticationShipper from "../middlewares/authenticationShipper";
const routerShipper = Router();

routerShipper.post("/registerShipper",authentication, shipperController.registerShipper);
routerShipper.get("/getCurrentShipper",authentication, shipperController.getByCurrentShipper);
routerShipper.get("/getListOrderMap/:status",authenticationShipper, shipperController.getListOrderShipperMap);
routerShipper.get("/getOrderByCode/:code",authenticationShipper, shipperController.getOrderByCode);
routerShipper.post("/getListOrderSuccessShipper",authenticationShipper, shipperController.getListOrderSuccessShipper);
export default routerShipper;
