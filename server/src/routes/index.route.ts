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
import routerSize from "./product/size.route";
import routerColor from "./product/color.route";
import routerCategoryActive from "./product/categoryActive.route";
import routerProductSlider from "./product/productSlider.route";
import routerCart from "./cart.route";
import routerOrder from "./order.route";
import routerVoucher from "./voucher.route";
import routerShipper from "./shipper.route";
import routerDashboard from "./dashboard.route";
import { TestSocket } from "../controllers/test";
import routerTest from "./test.route";
import routerNotification from "./notification.route";
import routerComment from "./comment.route";

const router = Router();

router.use("/auth", routerAuth);
router.use("/address", authentication, routerAddress);
router.use("/category", routerCategory);
router.use("/categoryActive", routerCategoryActive);
router.use("/color", routerColor);
router.use("/product", routerProduct);
router.use("/productSlider", routerProductSlider);
router.use("/admin", routerAdmin);
router.use("/upload", routerUpload);
router.use("/tags", routerTags);
router.use("/blogs", routerBlogs);
router.use("/size", routerSize);
router.use("/cart", routerCart);
router.use("/order", routerOrder);
router.use("/voucher", routerVoucher);
router.use("/shipper", routerShipper);
router.use("/dashboard", routerDashboard);
router.use("/notification", routerNotification);
router.use("/comment", routerComment);



router.use("/test", routerTest);


export default router;
