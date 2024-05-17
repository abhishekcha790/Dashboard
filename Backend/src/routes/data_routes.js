import { Router } from "express";
import { AllData,SalesInMonth,BarChartData,PieData,Combine } from "../controllers/data_controller.js";
const router=Router();
router.route("/alldata").get(AllData)
router.route("/statistics").get(SalesInMonth)
router.route("/barchartData").get(BarChartData);
router.route("/piedata").get(PieData)
router.route("/combine").get(Combine)
export default router;