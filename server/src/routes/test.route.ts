import { Router } from "express";
import { pagingTest, TestSocket } from "../controllers/test";
const routerTest = Router();

routerTest.get("/socketAll",TestSocket);
routerTest.post("/pagingTest",pagingTest);
export default routerTest;
