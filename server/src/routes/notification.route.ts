import { Router } from "express";
import notificationController from "../controllers/Notification.controller";
import authentication from "../middlewares/authentication";
const routerNotification = Router();

routerNotification.get("/paging",authentication,notificationController.pagingNotification);

routerNotification.put("/watched/:id",authentication,notificationController.handleWatched);

routerNotification.delete("/delete/:id",authentication,notificationController.handleDelete);

routerNotification.get("/watchedAll",authentication,notificationController.handleWatchedAll);

export default routerNotification;
