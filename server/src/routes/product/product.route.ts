import { Router } from "express";
import productController from "../../controllers/product/product.controller";

const routerProduct = Router();

routerProduct.post("/create", productController.addProduct);
routerProduct.get("/findById/:id", productController.getProductById);
routerProduct.put("/updateById/:id", productController.updateById);
routerProduct.put("/deletedById/:id", productController.deletedProductById);
routerProduct.put("/unDeletedById/:id", productController.unDeletedProductById);
routerProduct.post("/paging", productController.pagingProduct);


export default routerProduct;
