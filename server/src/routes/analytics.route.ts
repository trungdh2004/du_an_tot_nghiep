import { Router } from "express";
import UserAdmin from "../controllers/admin/user.admin";
import uploadCloud from "../utils/helper";
const routerAdmin = Router();

routerAdmin.post("/list-user", uploadCloud.array("images"),UserAdmin.listCurrentUsers);

export default routerAdmin;
