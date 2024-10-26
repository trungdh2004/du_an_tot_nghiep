import { Router } from "express";
import CommentController from "../controllers/comment/Comment.controller";
import authentication from "../middlewares/authentication";
import ChatController from "../controllers/Chat.controller";

const routerChat = Router();
routerChat.get("/findOrCreateConversation",authentication, ChatController.findOrCreateConversations);
routerChat.post("/message/:id", authentication, ChatController.pagingMessageConversation);
routerChat.post("/createMessage/:id", authentication, ChatController.createMessage);
routerChat.post("/pagingConversation", authentication, ChatController.pagingConversation);
routerChat.get("/findConversation/:id", authentication, ChatController.findConversation);
export default routerChat;
