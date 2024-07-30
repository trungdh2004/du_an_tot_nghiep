import { Router } from "express";
import CategoryActiveController from "../../controllers/product/categoryActive"

const routerCategoryActive = Router();

routerCategoryActive.get("/find", CategoryActiveController.getCategoryActive);
routerCategoryActive.post("/add", CategoryActiveController.addCategoryActive);
routerCategoryActive.put("/update/:id", CategoryActiveController.updateCategoryActiveById);
routerCategoryActive.delete("/delete/:id", CategoryActiveController.deleteCategoryActive);

export default routerCategoryActive;
