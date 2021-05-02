import retrieveTransaction from "../services/transactionService.js";
import { Router } from "express";
const transactionRouter = Router();

transactionRouter.get("/", retrieveTransaction);

export default transactionRouter;
