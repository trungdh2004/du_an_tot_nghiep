import { Router } from "express";
import authController from "../controllers/auth.controller";
import addressController from "../controllers/address.controller";
import authorization from "../middlewares/authentication";

const routerAddress = Router();

routerAddress.post("/paddingAddress", addressController.paddingAddress);
routerAddress.post("/addAddress", addressController.postAddress);
routerAddress.delete("/deleteAddress/:id", addressController.deleteAddress);

export default routerAddress;
