import { Router } from "express";
import categoryController from "../../controllers/product/category.controller";

const routerCategory = Router();

routerCategory.get("/getAllCate", categoryController.getAllCategory);
routerCategory.post("/paddingCate", categoryController.pagingCategory);
routerCategory.post("/addCate", categoryController.addCategory);
routerCategory.delete("/deleteCate/:id", categoryController.deleteById);
routerCategory.put("/updateCate/:id", categoryController.updateCategory);
routerCategory.get("/cate/:id", categoryController.getCategoryById);
routerCategory.get("/cateSlug/:slug", categoryController.getCategoryBySlug);

export default routerCategory;
