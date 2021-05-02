import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import transactionModel from "../models/transactionModel.js";

const createTransaction = async (req, res) => {
  try {
    res.send("Hello, World!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const retrieveTransaction = async (req, res) => {
  try {
    const { period } = req.query;

    if (!period) {
      throw new Error(
        "Please inform a period for your request. Format: yyyy-mm"
      );
    }

    const transactions = await transactionModel.find({ yearMonth: period });
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTransaction = async (req, res) => {
  try {
    res.send("Hello, World!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    res.send("Hello, World!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {
  createTransaction,
  retrieveTransaction,
  updateTransaction,
  deleteTransaction,
};
