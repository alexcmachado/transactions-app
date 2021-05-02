import {
  createTransaction,
  retrieveTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService.js";
import { Router } from "express";
const transactionRouter = Router();

transactionRouter.post("/", createTransaction);

transactionRouter.get("/", retrieveTransaction);

transactionRouter.patch("/:id", updateTransaction);

transactionRouter.delete("/:id", deleteTransaction);

export default transactionRouter;
