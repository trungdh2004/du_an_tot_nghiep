import { Router } from "express";
import routerAuth from "./auth.route";
import routerAddress from "./adress.route";
import authorization from "../middlewares/authentication";

const router = Router();

router.use("/auth", routerAuth);
router.use("/address", authorization, routerAddress);
router.use("/", (req, res) => {
  res.json("hihi");
});

export default router;
