import { Router } from "express";
import addressController from "../controllers/address.controller";

const routerAddress = Router();

routerAddress.post("/paddingAddress", addressController.paddingAddress);
routerAddress.post("/addAddress", addressController.postAddress);
routerAddress.delete("/deleteAddress/:id", addressController.deleteAddress);
routerAddress.put("/updateAddress/:id", addressController.updateAddress);
routerAddress.put("/updateMain/:id", addressController.updateMainAddress);

export default routerAddress;
