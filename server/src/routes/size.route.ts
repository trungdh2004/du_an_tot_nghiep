import { Router } from "express";
import SizeController from "../controllers/product/size.controller";

const routerSize = Router();

routerSize.post("/paging", SizeController.pagingSize);
routerSize.post("/addSize", SizeController.addSize);
routerSize.delete("/deleteSize/:id", SizeController.deleteById);
routerSize.put("/updateSize/:id", SizeController.updateSize);
routerSize.get("/size/:id", SizeController.getSizeById);


export default routerSize;
