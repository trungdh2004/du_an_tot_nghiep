import { Router } from "express";
import TagsController from "../controllers/Tags";
const routerTags = Router();

routerTags.post("/add", TagsController.addTags);
routerTags.post("/paging", TagsController.pagingTags);
routerTags.get("/tag/:id", TagsController.getTagsById);
routerTags.put("/update/:id", TagsController.updateTags);
routerTags.delete("/delete/:id", TagsController.deleteById);

export default routerTags;
