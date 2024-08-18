import { Router } from "express";
import cartController from "../controllers/cart/cart.controller";
import authentication from "../middlewares/authentication";
const routerCart = Router();

routerCart.post("/addProductCart", authentication, cartController.addProductToCart);
routerCart.put("/updateProductCart/:id", authentication, cartController.updateCartItem);
routerCart.get("/pagingCart", authentication, cartController.pagingCart);
routerCart.get("/deleteProductCart/:id", authentication, cartController.deleteCartItem);
routerCart.get("/countCart", authentication, cartController.getCountProductCart);

export default routerCart;
