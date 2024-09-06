import { Router } from "express";
import CommentController from "../controllers/comment/Comment.controller";

const routerComment = Router();
routerComment.post("/createComment", CommentController.createComment);
routerComment.post("/getListComment", CommentController.getListComments);
routerComment.put("/reactionsComment/:id", CommentController.reactionsComment);
routerComment.delete("/deleteComment/:id", CommentController.deleteComment);
export default routerComment;
