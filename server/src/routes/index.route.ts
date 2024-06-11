import { Router } from "express";
import routerAuth from "./auth.route";
import routerAddress from "./adress.route";
import authorization from "../middlewares/authentication";
import routerCategory from "./product/category.route";
import routerProduct from "./product/product.route";

const router = Router();

router.use("/auth", routerAuth);
router.use("/address", authorization, routerAddress);
router.use("/category", routerCategory);
router.use("/product", routerProduct);

export default router;
