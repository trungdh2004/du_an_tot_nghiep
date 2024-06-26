import { Router } from "express";
import routerAuth from "./auth.route";
import routerAddress from "./adress.route";
import routerCategory from "./product/category.route";
import routerProduct from "./product/product.route";
import authentication from "../middlewares/authentication";
import routerAdmin from "./analytics.route";
import routerUpload from "./upload.route";
import routerTags from "./tags.route";
import routerBlogs from "./blog.route";

const router = Router();

router.use("/auth", routerAuth);
router.use("/address", authentication, routerAddress);
router.use("/category", routerCategory);
router.use("/product", routerProduct);
router.use("/admin", routerAdmin);
router.use("/upload", routerUpload);
router.use("/tags", routerTags);
router.use("/blogs", routerBlogs);

export default router;
