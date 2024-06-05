import express from "express";
const router = express.Router();
import {
  GET_ALL_PRESCRIPTIONS_BY_ID,
  ADD_PRESCRIPTION_BY_ID,
} from "../controller/prescriptions.js";

router.get("/v1/prescriptions/:id", GET_ALL_PRESCRIPTIONS_BY_ID);

router.post("/v1/prescriptions/:id", ADD_PRESCRIPTION_BY_ID);

export default router;
