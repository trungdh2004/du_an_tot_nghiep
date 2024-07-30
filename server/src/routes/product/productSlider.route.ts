import { Router } from "express";
import productSliderController from "../../controllers/product/productSliderController";

const routerProductSlider = Router();

routerProductSlider.get("/find", productSliderController.getProductSlider);
routerProductSlider.post("/add", productSliderController.addProductSlider);
routerProductSlider.put("/update/:id", productSliderController.updateProductSliderById);
routerProductSlider.put("/updateIndex", productSliderController.updateIndexProductSlider);
routerProductSlider.delete("/delete/:id", productSliderController.deleteProductSlider);

export default routerProductSlider;
