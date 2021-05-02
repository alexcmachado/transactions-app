import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import transactionModel from "../models/transactionModel.js";

const retrieveTransaction = async (req, res) => {
  res.send("Hello, World!");
};

export default retrieveTransaction;
