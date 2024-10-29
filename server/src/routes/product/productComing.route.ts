import { Router } from "express";
import productComingController from "../../controllers/product/productComing.controller";

const routerProductComing = Router();

routerProductComing.post("/create", productComingController.createProduct);
routerProductComing.post("/paging", productComingController.pagingProductComing);
routerProductComing.get("/findById/:id", productComingController.findById);
routerProductComing.get("/update/:id", productComingController.updateComing);
routerProductComing.get("/active/:id", productComingController.activeProductComing);
routerProductComing.get("/findByActive/:id", productComingController.findByActive);
routerProductComing.delete("/delete/:id", productComingController.deleteProductComing);

export default routerProductComing;
