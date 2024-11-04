import { Router } from "express";
import UserAdmin from "../controllers/admin/user.admin";
import authorization from "../middlewares/authorization";
import authentication from "../middlewares/authentication";
const routerAdmin = Router();

routerAdmin.post("/list-user", UserAdmin.listCurrentUsers);
routerAdmin.post("/updateRole",authorization, UserAdmin.updateRole);
routerAdmin.post("/list-user",authentication, UserAdmin.listCurrentUsers);

export default routerAdmin;
