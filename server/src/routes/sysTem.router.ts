import { Router } from "express";
import searchController from "../controllers/search.controller";
const routerSystem = Router();

routerSystem.get("/searchClient", searchController.searchClient);
routerSystem.get("/searchClientDetail", searchController.searchClientDetail);
export default routerSystem;
