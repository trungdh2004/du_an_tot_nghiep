import { Router } from "express";
import BlogController from "../controllers/Blog.controller";
import authentication from "../middlewares/authentication";
const routerBlogs = Router();

routerBlogs.post("/new-blogs",authentication, BlogController.postBlogs);
routerBlogs.put("/put-blogs/:id",authentication, BlogController.putBlogs);
routerBlogs.get("/show-blog-edit/:id",authentication, BlogController.showForEdit);
routerBlogs.put("/publish/:id",authentication, BlogController.publish);


export default routerBlogs;
