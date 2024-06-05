import express from "express";
const router = express.Router();
import {
  GET_ALL_MEDICATIONS,
  ADD_MEDICATION,
} from "../controller/medications.js";

router.get("/v1/medications", GET_ALL_MEDICATIONS);

router.post("/v1/medications", ADD_MEDICATION);

export default router;
