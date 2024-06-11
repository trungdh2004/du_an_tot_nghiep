import { Router } from "express";
import productController from "../../controllers/product/product.controller";

const routerProduct = Router();

routerProduct.post("/create", productController.addProduct);


export default routerProduct;
