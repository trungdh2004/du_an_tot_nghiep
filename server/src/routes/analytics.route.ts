import { Router } from "express";
import UserAdmin from "../controllers/admin/user.admin";
const routerAdmin = Router();

routerAdmin.post("/list-user",UserAdmin.listCurrentUsers);

export default routerAdmin;
