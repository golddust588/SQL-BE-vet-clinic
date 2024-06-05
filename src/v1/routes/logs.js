import express from "express";
const router = express.Router();
import { GET_ALL_LOGS_BY_ID, ADD_LOG_BY_ID } from "../controller/logs.js";

router.get("/v1/logs/:id", GET_ALL_LOGS_BY_ID);

router.post("/v1/logs/:id", ADD_LOG_BY_ID);

export default router;
