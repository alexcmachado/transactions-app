import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import { join, dirname } from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(join(__dirname, "client/build")));

app.use("/api/transaction", routes);

const { DB_CONNECTION } = process.env;

console.log("Starting MongoDB connection...");
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(`Error on MongoDB connection - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once("open", () => {
  console.log("Connected to MongoDB");

  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
  });
});
